import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  updateBook,
} from "../controllers/bookController.js";
import { authenticateJWT, authorize } from "../middleware/index.js";

const router = express.Router();

router.post(
  "/createBook",
  authenticateJWT,
  authorize("create", "Book"),
  createBook
);
router.put(
  "/updateBook/:id",
  authenticateJWT,
  authorize("update", "Book"),
  updateBook
);
router.delete(
  "/deleteBook/:id",
  authenticateJWT,
  authorize("delete", "Book"),
  deleteBook
);

router.get("/allBooks", getAllBooks);

export default router;
