import { createServer } from "node:net";
import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import { join } from "node:path";

const routes = [
  "/",
  "/login",
  "/register",
  "/auditions",
  "/auditions/marudham",
  "/artists",
  "/venues",
  "/venues/meenakshi-stage",
  "/venues/vaigai-auditorium",
  "/venues/kongu-creative",
  "/venues/cauvery-convention",
  "/venues/thanjai-open-air",
  "/venues/yercaud-picture",
  "/venues/meenakshi-stage.jpg",
  "/venues/vaigai-auditorium.jpg",
  "/venues/kongu-creative.jpg",
  "/venues/cauvery-convention.jpg",
  "/venues/thanjai-open-air.jpg",
  "/venues/yercaud-picture.jpg",
  "/dashboard/artist/auditions",
  "/destination-from-a-stale-link",
];

const portServer = createServer();
await new Promise((resolve, reject) => {
  portServer.once("error", reject);
  portServer.listen(0, "127.0.0.1", resolve);
});
const address = portServer.address();
if (!address || typeof address === "string") {
  throw new Error("Could not reserve a local port for route smoke tests.");
}
const { port } = address;
await new Promise((resolve, reject) => {
  portServer.close(error => (error ? reject(error) : resolve()));
});

const nextCli = join(process.cwd(), "node_modules", "next", "dist", "bin", "next");
const server = spawn(
  process.execPath,
  [nextCli, "start", "-H", "127.0.0.1", "-p", String(port)],
  { stdio: "inherit" },
);

try {
  const origin = `http://127.0.0.1:${port}`;
  let ready = false;
  for (let attempt = 0; attempt < 60 && !ready; attempt += 1) {
    if (server.exitCode !== null) {
      throw new Error(`Next.js exited before becoming ready (code ${server.exitCode}).`);
    }
    try {
      await fetch(origin, { signal: AbortSignal.timeout(2000) });
      ready = true;
    } catch {
      await delay(500);
    }
  }
  if (!ready) {
    throw new Error("Next.js did not become ready within 30 seconds.");
  }

  for (const route of routes) {
    const response = await fetch(new URL(route, origin), {
      redirect: "manual",
      signal: AbortSignal.timeout(10000),
    });
    if (response.status !== 200) {
      throw new Error(`${route} returned HTTP ${response.status}; expected 200.`);
    }
    console.log(`PASS ${route} (HTTP ${response.status})`);
  }
} finally {
  if (server.exitCode === null) {
    server.kill();
    await Promise.race([
      new Promise(resolve => server.once("exit", resolve)),
      delay(3000),
    ]);
  }
}
