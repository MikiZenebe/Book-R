import jwt from "jsonwebtoken";
import { abilities } from "../middleware/permissions.js";
import { PrismaClient } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET;
const prisma = new PrismaClient();

// Middleware to authenticate and authorize users
export const authenticateJWT = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No Token Provided" });
    }

    const decoded = jwt?.verify(token, JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Error in protectRoute middleware", err.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Middleware to authorize based on CASL abilities
export const authorize = (action, subject) => {
  return (req, res, next) => {
    const ability = abilities(req.user); // assuming req.user contains the authenticated user

    if (ability.can(action, subject)) {
      next();
    } else {
      res.status(403).json({ error: "Forbidden" });
    }
  };
};

// export const authorize = (ability) => (req, res, next) => {
//   const userAbility = abilities[req.user.role];
//   if (userAbility.can(ability.action, ability.resource)) {
//     next();
//   } else {
//     res.sendStatus(403);
//   }
// };
