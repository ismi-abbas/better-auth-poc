import "dotenv/config";
import { Hono } from "hono";
import { auth } from "./lib/auth";
import { usersTable } from "./db/schema";
import { db } from "./db";
import { cors } from "hono/cors";

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

app.use(
  "*",
  cors({
    origin: "http://localhost:3000",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);
app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});
app.on(["POST", "GET"], "/api/auth/*", (c) => {
  console.log("AUTH HITTED");
  return auth.handler(c.req.raw);
});

app.get("/", async (c) => {
  console.log(c.var);
  const data = await db.select().from(usersTable);

  console.log(data);
  return c.text("Hello Hono!");
});

export default app;
