import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import * as bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

const main = async () => {
  const travis = await prisma.user.upsert({
    where: { username: "travis" },
    update: {},
    create: {
      username: "travis",
      password: {
        create: {
          hash: bcrypt.hashSync("password182", salt),
        },
      },
    },
  });
  const pig = await prisma.user.upsert({
    where: { username: "pig" },
    update: {},
    create: {
      username: "pig",
      password: {
        create: {
          hash: bcrypt.hashSync("password1.", salt),
        },
      },
    },
  });
  const phantom = await prisma.user.upsert({
    where: { username: "phantom" },
    update: {},
    create: {
      username: "phantom",
      password: {
        create: {
          hash: bcrypt.hashSync("password44", salt),
        },
      },
    },
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
