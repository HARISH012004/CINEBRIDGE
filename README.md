# CINEBRIDGE

CINEBRIDGE is a monorepo for a cinema-industry networking, audition and venue-booking platform.

## Structure

- `frontend/`: Next.js App Router, TypeScript and Tailwind UI.
- `backend/`: Express, Prisma and PostgreSQL REST API.
- `render.yaml`: Render web service and PostgreSQL configuration.

## Local setup

### Frontend

```powershell
cd frontend
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

### Click-through demo

The frontend includes three demo portals. Open `/login`, choose a portal tab, and use its sample account:

| Portal | Email | Password |
| --- | --- | --- |
| Filmmaker / director | `director@cinebridge.demo` | `Cinema@2026` |
| Artist / participant | `artist@cinebridge.demo` | `Cinema@2026` |
| Venue / event partner | `venue@cinebridge.demo` | `Cinema@2026` |

Signup and demo actions such as audition applications and venue booking requests are stored in that browser's local storage. They are for demonstration only; they do not create server accounts, send applications, contact users, reserve venues, or process payments. Use the backend setup and deployment steps below for server-backed functionality.

### Backend

```powershell
cd backend
npm install
Copy-Item .env.example .env
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

The API is available at `http://localhost:4000`; health check: `/api/health`.

## Database

Set `DATABASE_URL` to a local PostgreSQL instance or Render PostgreSQL connection URL. The Prisma schema in `backend/prisma/schema.prisma` is the source of truth. Production migration command:

```powershell
npm run db:migrate
```

## Authentication

JWT sessions use secure HTTP-only cookies. Registration and login enforce role-specific accounts. Passwords are hashed with bcrypt; every protected route checks the server-side role.

## Deployment

### Render backend

1. Create a PostgreSQL database.
2. Import this repository and select `backend/` as the root directory.
3. Set `DATABASE_URL`, `JWT_SECRET`, `COOKIE_SECRET`, `FRONTEND_URL` and `NODE_ENV=production`.
4. Build with `npm install && npm run db:generate && npm run build`.
5. Start with `npm run db:migrate && npm start`.
6. Verify `/api/health`.

### Vercel frontend

1. Import the GitHub repository.
2. Set the root directory to `frontend`.
3. Set `NEXT_PUBLIC_API_URL` to the deployed Render HTTPS API URL.
4. Deploy with the Next.js framework preset.

## Payment integration

Razorpay test credentials should be stored in backend environment variables. Payment signature verification must happen server-side; this repository intentionally never treats client success callbacks as payment proof.

## Security status

The API includes HTTP headers, CORS allowlisting, rate limiting, Zod validation, bcrypt password hashing, HTTP-only session cookies, role authorization and transactional double-booking protection. Object-storage providers and live external services require deployment credentials.
