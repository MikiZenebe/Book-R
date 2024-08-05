import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Initialize
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
  const { email, password, role, location, phoneNo } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
        location,
        phoneNo,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      { email: user.email, role: user.role },
      JWT_SECRET
    );
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};
