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

export const getAllBooks = async (req, res) => {
  const books = await prisma.book.findMany();
  res.json(books);
};

export const rentBook = async (req, res) => {
  const { bookId } = req.body;

  try {
    const book = await prisma.book.findUnique({ where: { id: bookId } });
    if (book && book.available) {
      const rental = await prisma.rental.create({
        data: {
          bookId,
          userId: req.user.id,
        },
      });
      await prisma.book.update({
        where: { id: bookId },
        data: { available: false },
      });
      res.status(201).json(rental);
    } else {
      res.status(400).json({ error: "Book not available" });
    }
  } catch (error) {
    res.status(400).json({ error: "Failed to rent book" + error });
  }
};

export const returnBook = async (req, res) => {
  const { rentalId } = req.body;
  try {
    const rental = await prisma.rental.findUnique({ where: { id: rentalId } });
    if (rental && !rental.returnedAt) {
      await prisma.rental.update({
        where: { id: rentalId },
        data: { returnedAt: new Date() },
      });
      await prisma.book.update({
        where: { id: rental.bookId },
        data: { available: true },
      });
      res.status(200).json({ message: "Book returned successfully" });
    } else {
      res.status(400).json({ error: "Rental not found or already returned" });
    }
  } catch (error) {
    res.status(400).json({ error: "Failed to return book" });
  }
};
