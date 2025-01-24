import express from "express";
import { doctorsController } from "../controllers/doctorsController.js";
const doctorsRouter = express.Router();

doctorsRouter.get("/", doctorsController.index);
doctorsRouter.get("/:id", doctorsController.show);
doctorsRouter.post("/", doctorsController.store);
doctorsRouter.put("/:id", doctorsController.update);
doctorsRouter.patch("/:id", doctorsController.modify);
doctorsRouter.delete("/:id", doctorsController.destroy);

export { doctorsRouter };
