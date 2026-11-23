import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { PrismaClient, RoleName } from "@prisma/client";
import { z } from "zod";

const app = express();
const prisma = new PrismaClient();
const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:3000";

app.use(helmet());
app.use(cors({ origin: allowedOrigin, credentials: true }));
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());
app.use("/api", rateLimit({ windowMs: 15 * 60 * 1000, limit: 200, standardHeaders: true }));

type AuthUser = { id: string; role: RoleName };
declare global {
  namespace Express { interface Request { auth?: AuthUser } }
}

function auth(requiredRoles?: RoleName[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.cinebridge_token;
    if (!token) return res.status(401).json({ error: "Authentication required" });
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || "development-secret") as AuthUser;
      if (requiredRoles && !requiredRoles.includes(payload.role)) return res.status(403).json({ error: "Forbidden" });
      req.auth = payload;
      next();
    } catch {
      res.status(401).json({ error: "Invalid or expired session" });
    }
  };
}

function setSession(res: Response, id: string, role: RoleName) {
  const token = jwt.sign({ id, role }, process.env.JWT_SECRET || "development-secret", { expiresIn: "7d" });
  res.cookie("cinebridge_token", token, {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

app.get("/api/health", (_req, res) => res.json({ status: "ok", service: "CINEBRIDGE API" }));

app.post("/api/auth/register", async (req, res) => {
  const schema = z.object({
    name: z.string().trim().min(2).max(100),
    email: z.string().email().transform(v => v.toLowerCase()),
    password: z.string().min(8).max(72),
    role: z.enum(["ARTIST", "FILMMAKER", "VENUE_OWNER"]),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid registration details", issues: parsed.error.flatten() });
  try {
    const role = await prisma.role.upsert({ where: { name: parsed.data.role }, update: {}, create: { name: parsed.data.role } });
    const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
    if (existing) return res.status(409).json({ error: "An account already exists for this email" });
    const passwordHash = await bcrypt.hash(parsed.data.password, 12);
    const user = await prisma.user.create({ data: { name: parsed.data.name, email: parsed.data.email, passwordHash, roleId: role.id } });
    if (parsed.data.role === "ARTIST") await prisma.artistProfile.create({ data: { userId: user.id, slug: crypto.randomUUID(), city: "Chennai", category: "Actor", languages: [], skills: [] } });
    if (parsed.data.role === "FILMMAKER") await prisma.filmmakerProfile.create({ data: { userId: user.id } });
    if (parsed.data.role === "VENUE_OWNER") await prisma.venueOwnerProfile.create({ data: { userId: user.id } });
    setSession(res, user.id, parsed.data.role);
    res.status(201).json({ id: user.id, name: user.name, role: parsed.data.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to create account" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const parsed = z.object({ email: z.string().email(), password: z.string().min(1) }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid login details" });
  const user = await prisma.user.findUnique({ where: { email: parsed.data.email.toLowerCase() }, include: { role: true } });
  if (!user || user.deletedAt || user.suspendedAt || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  setSession(res, user.id, user.role.name);
  res.json({ id: user.id, name: user.name, role: user.role.name });
});

app.post("/api/auth/logout", (_req, res) => {
  res.clearCookie("cinebridge_token");
  res.json({ ok: true });
});

app.get("/api/auth/me", auth(), async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.auth!.id }, include: { role: true, artistProfile: true, filmmakerProfile: true, venueOwnerProfile: true } });
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json({ id: user.id, name: user.name, email: user.email, role: user.role.name, profiles: { artist: user.artistProfile, filmmaker: user.filmmakerProfile, venueOwner: user.venueOwnerProfile } });
});

app.get("/api/auditions", async (req, res) => {
  const city = typeof req.query.city === "string" ? req.query.city : undefined;
  const page = Math.max(1, Number(req.query.page) || 1);
  const take = 12;
  const where: any = { status: "PUBLISHED" };
  if (city) where.location = { contains: city, mode: "insensitive" };
  const [items, total] = await Promise.all([
    prisma.audition.findMany({ where, include: { roles: true, company: true }, orderBy: { auditionDate: "asc" }, skip: (page - 1) * take, take }),
    prisma.audition.count({ where }),
  ]);
  res.json({ items, pagination: { page, take, total } });
});

app.post("/api/auditions", auth(["FILMMAKER", "ADMIN"]), async (req, res) => {
  const schema = z.object({
    projectName: z.string().trim().min(3),
    description: z.string().trim().min(40),
    category: z.string().min(2),
    language: z.string().min(2),
    genre: z.string().optional(),
    location: z.string().trim().min(3),
    auditionDate: z.string().datetime(),
    auditionTime: z.string().min(4),
    registrationDeadline: z.string().datetime(),
    paid: z.boolean(),
    entryFee: z.number().int().nonnegative(),
    contactName: z.string().trim().min(2),
    contactPhone: z.string().trim().min(8),
    contactEmail: z.string().email(),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Complete all required audition information", issues: parsed.error.flatten() });
  const filmmaker = await prisma.filmmakerProfile.findUnique({ where: { userId: req.auth!.id } });
  if (!filmmaker) return res.status(404).json({ error: "Filmmaker profile not found" });
  const audition = await prisma.audition.create({ data: {
    ...parsed.data, auditionDate: new Date(parsed.data.auditionDate), registrationDeadline: new Date(parsed.data.registrationDeadline),
    creatorId: filmmaker.id, status: "DRAFT",
  } });
  res.status(201).json(audition);
});

app.post("/api/auditions/:id/applications", auth(["ARTIST"]), async (req, res) => {
  const parsed = z.object({ coverNote: z.string().max(2000).optional(), videoUrl: z.string().url().optional() }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid application" });
  const artist = await prisma.artistProfile.findUnique({ where: { userId: req.auth!.id } });
  if (!artist) return res.status(404).json({ error: "Artist profile not found" });
  try {
    const auditionId = String(req.params.id);
    const application = await prisma.auditionApplication.create({ data: { auditionId, artistId: artist.id, ...parsed.data } });
    res.status(201).json(application);
  } catch { res.status(409).json({ error: "You have already applied for this audition" }); }
});

app.get("/api/artists", async (req, res) => {
  const city = typeof req.query.city === "string" ? req.query.city : undefined;
  const page = Math.max(1, Number(req.query.page) || 1);
  const take = 12;
  const where: any = {};
  if (city) where.city = { contains: city, mode: "insensitive" };
  const [items, total] = await Promise.all([
    prisma.artistProfile.findMany({ where, include: { user: { select: { name: true, verificationStatus: true } } }, skip: (page - 1) * take, take }),
    prisma.artistProfile.count({ where }),
  ]);
  res.json({ items, pagination: { page, take, total } });
});

app.get("/api/venues", async (req, res) => {
  const city = typeof req.query.city === "string" ? req.query.city : undefined;
  const page = Math.max(1, Number(req.query.page) || 1);
  const take = 12;
  const where: any = { active: true };
  if (city) where.city = { contains: city, mode: "insensitive" };
  const [items, total] = await Promise.all([
    prisma.venue.findMany({ where, skip: (page - 1) * take, take, include: { reviews: true } }),
    prisma.venue.count({ where }),
  ]);
  res.json({ items, pagination: { page, take, total } });
});

app.post("/api/venues", auth(["VENUE_OWNER", "ADMIN"]), async (req, res) => {
  const schema = z.object({
    name: z.string().trim().min(3), category: z.string().min(2), city: z.string().min(2),
    address: z.string().trim().min(8), capacity: z.number().int().positive(),
    hourlyPrice: z.number().int().nonnegative(), facilities: z.array(z.string()).default([]),
  });
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid venue details", issues: parsed.error.flatten() });
  const owner = await prisma.venueOwnerProfile.findUnique({ where: { userId: req.auth!.id } });
  if (!owner) return res.status(404).json({ error: "Venue owner profile not found" });
  const venue = await prisma.venue.create({ data: { ...parsed.data, ownerId: owner.id, photographs: [] } });
  res.status(201).json(venue);
});

app.post("/api/venues/:id/bookings", auth(["FILMMAKER"]), async (req, res) => {
  const parsed = z.object({ date: z.string().date(), startTime: z.string(), endTime: z.string(), amount: z.number().int().nonnegative().default(0) }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "Invalid booking details" });
  const venueId = String(req.params.id);
  try {
    const booking = await prisma.$transaction(async tx => {
      const conflict = await tx.venueBooking.findFirst({
        where: { venueId, date: new Date(parsed.data.date), startTime: parsed.data.startTime, endTime: parsed.data.endTime, status: { in: ["REQUESTED", "APPROVED", "CONFIRMED"] } },
      });
      const blocked = await tx.venueAvailability.findFirst({ where: { venueId, date: new Date(parsed.data.date), startTime: parsed.data.startTime, endTime: parsed.data.endTime, blocked: true } });
      if (conflict || blocked) throw new Error("CONFLICT");
      return tx.venueBooking.create({ data: { venueId, requesterId: req.auth!.id, date: new Date(parsed.data.date), startTime: parsed.data.startTime, endTime: parsed.data.endTime, amount: parsed.data.amount, paymentStatus: parsed.data.amount > 0 ? "PENDING" : "NOT_REQUIRED" } });
    });
    res.status(201).json(booking);
  } catch (error: any) {
    if (error.message === "CONFLICT") return res.status(409).json({ error: "This venue slot is unavailable" });
    res.status(500).json({ error: "Unable to create booking" });
  }
});

app.get("/api/admin/analytics", auth(["ADMIN"]), async (_req, res) => {
  const [users, auditions, venues, bookings] = await Promise.all([
    prisma.user.count(), prisma.audition.count(), prisma.venue.count(), prisma.venueBooking.count(),
  ]);
  res.json({ users, auditions, venues, bookings });
});

app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);
  res.status(500).json({ error: "Unexpected server error" });
});

const port = Number(process.env.PORT) || 4000;
app.listen(port, () => console.log(`CINEBRIDGE API listening on ${port}`));
