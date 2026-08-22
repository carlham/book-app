import { Router } from "express";
import adminRoutes from "./adminRoutes.js";
import authRoutes from "./authRoutes.js";
import bookRoutes from "./bookRoutes.js";
import meRoutes from "./meRoutes.js";
import rentalRoutes from "./rentalRoutes.js";

const router = Router();

router.use("/admin", adminRoutes);
router.use("/auth", authRoutes);
router.use("/books", bookRoutes);
router.use("/me", meRoutes);
router.use("/rentals", rentalRoutes);

export default router;
