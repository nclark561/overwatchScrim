import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { createCookieSessionStorage, redirect } from "@remix-run/node";

const prisma = new PrismaClient();

export async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  let userWithPassword;
  try {
    userWithPassword = await prisma.user.findUnique({
      where: { username },
      include: { password: true },
    });
    await prisma.$disconnect();
  } catch (err) {
    console.log(err);
    await prisma.$disconnect();
    process.exit(1);
  }
  if (!userWithPassword || !userWithPassword.password?.hash) {
    return null;
  }
  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash
  );
  if (!isValid) {
    return null;
  }
  const { password: _password, ...user } = userWithPassword;
  return user;
}

const { SESSION_SECRET } = process.env;
if (!SESSION_SECRET) throw new Error("SESSION_SECRET is not set");

const storage = createCookieSessionStorage({
  cookie: {
    name: "OW_SESSION",
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secrets: [SESSION_SECRET],
    secure: true,
    httpOnly: true,
    path: "/",
  },
});

export async function createUserSession(userId: string, redirectTo: string) {
  const session = await storage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await storage.getSession(request.headers.get("Cookie"))
  const userId = session.get('userId')
  if(!userId || typeof userId !== "string" ) return { userId: null, redirectTo}
  return { userId, redirectTo }
}
