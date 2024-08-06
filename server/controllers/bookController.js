import { PrismaClient } from "@prisma/client";

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

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, category, quantity, available, rentalPrice } =
    req.body;

  try {
    const book = await prisma.book.update({
      where: { id: parseInt(id) },
      data: { title, author, category, quantity, available, rentalPrice },
    });
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: "Failed to update book" + error });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.book.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Failed to delete book" + error });
  }
};
