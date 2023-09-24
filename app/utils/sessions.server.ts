import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

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
