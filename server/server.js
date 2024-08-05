import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";

//Initial
const app = express();
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/user", userRoutes);
app.use("/api/book", bookRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
