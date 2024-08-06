import { PrismaClient } from "@prisma/client";
import { genTokenAndSetCookie } from "../helper/genToken.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Initialize
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
  const { fullName, email, password, role, location, phoneNo } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        role,
        location,
        phoneNo,
      },
    });

    genTokenAndSetCookie(user.id, res); // Using Prisma user id instead of _id
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (user && (await bcrypt.compare(password, user.password))) {
    genTokenAndSetCookie(user?.id, res);

    res.status(200).json({ user });
  } else {
    res.sendStatus(401);
  }
};

export const me = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { email: req.user.email },
  });
  res.json(user);
};
