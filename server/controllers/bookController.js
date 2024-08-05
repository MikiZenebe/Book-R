import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Initialize
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

export const createBook = async (req, res) => {
  const { title, author, category, quantity, available, rentalPrice } =
    req.body;

  try {
    const book = await prisma.book.create({
      data: {
        title,
        author,
        category,
        quantity,
        available,
        rentalPrice,
        ownerId: req.user.id,
      },
    });

    res.status(201).json(book);
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

export const me = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { email: req.user.email },
  });
  res.json(user);
};
