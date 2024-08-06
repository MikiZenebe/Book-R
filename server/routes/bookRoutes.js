import express from "express";
import { createBook } from "../controllers/bookController.js";
import { authenticateJWT, authorize } from "../middleware/index.js";

const router = express.Router();

router.post(
  "/createBook",
  authenticateJWT,
  authorize("create", "Book"),
  createBook
);
// router.post("/login", login);
// router.get("/me", authenticateJWT, me);

export default router;
