import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  for (const roleName of ["ARTIST", "FILMMAKER", "VENUE_OWNER", "ADMIN"] as const) {
    await prisma.role.upsert({ where: { name: roleName }, update: {}, create: { name: roleName } });
  }

  const passwordHash = await bcrypt.hash("Cinebridge!2026", 12);
  const artistRole = await prisma.role.findUniqueOrThrow({ where: { name: "ARTIST" } });
  const artist = await prisma.user.upsert({
    where: { email: "artist@cinebridge.demo" },
    update: {},
    create: { name: "Demo Artist", email: "artist@cinebridge.demo", passwordHash, roleId: artistRole.id, emailVerifiedAt: new Date() },
  });
  await prisma.artistProfile.upsert({
    where: { userId: artist.id },
    update: {},
    create: { userId: artist.id, slug: "demo-artist", city: "Chennai", category: "Actor", languages: ["Tamil", "English"], skills: ["Acting", "Dance"] },
  });

  const filmmakerRole = await prisma.role.findUniqueOrThrow({ where: { name: "FILMMAKER" } });
  await prisma.user.upsert({
    where: { email: "filmmaker@cinebridge.demo" },
    update: {},
    create: { name: "Demo Filmmaker", email: "filmmaker@cinebridge.demo", passwordHash, roleId: filmmakerRole.id, emailVerifiedAt: new Date() },
  });

  const ownerRole = await prisma.role.findUniqueOrThrow({ where: { name: "VENUE_OWNER" } });
  await prisma.user.upsert({
    where: { email: "venue@cinebridge.demo" },
    update: {},
    create: { name: "Demo Venue Partner", email: "venue@cinebridge.demo", passwordHash, roleId: ownerRole.id, emailVerifiedAt: new Date() },
  });

  console.log("Seeded CINEBRIDGE demo accounts. Password: Cinebridge!2026");
}

main().finally(() => prisma.$disconnect());
