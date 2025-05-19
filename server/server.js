import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session"; // 👈 importa express-session

import productRoutes from "./routes/productRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import faqRouter from "./routes/faqRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//  CORS configurato per cookie cross-origin
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

//  Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || "supersegreto", // meglio usare una variabile d'ambiente
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // metti true solo se usi HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 giorno
  }
}));

//  Rotte
app.use("/api/product", productRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/faq", faqRouter);
app.use("/api/auth", authRoutes);
app.use("/api", cartRoutes);

//  Avvio server
app.listen(PORT, () => {
  console.log(`✅ Server Node.js avviato su porta ${PORT}`);
});