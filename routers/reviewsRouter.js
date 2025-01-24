import express from "express";
import { reviewsController } from "../controllers/reviewsController.js";
const reviewsRouter = express.Router();

reviewsRouter.post("/", reviewsController.store);

export { reviewsRouter };
