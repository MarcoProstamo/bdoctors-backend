import express from "express";
import { specializationsController } from "../controllers/specializationsController.js";
const specializationsRouter = express.Router();

specializationsRouter.get("/", specializationsController.index);

export { specializationsRouter };
