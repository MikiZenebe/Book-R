import express from "express";
import { login, me, register } from "../controllers/userController.js";
import { authenticateJWT } from "../middleware/index.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticateJWT, me);

export default router;
