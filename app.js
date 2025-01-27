import express from "express";
const app = express();

// # Middlewares Registration
import cors from "cors";
import errorsHandler from "./middlewares/ErrorsHandler.js";
import notFound from "./middlewares/NotFoundHandler.js";
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// # Router
import { doctorsRouter } from "./routers/doctorsRouter.js";
import { reviewsRouter } from "./routers/reviewsRouter.js";
import { specializationsRouter } from "./routers/specializationsRouter.js";
app.use("/doctors", doctorsRouter);
app.use("/doctors/reviews", reviewsRouter);
app.use("/doctors/specializations", specializationsRouter);

// # Error Handlers
app.use(errorsHandler);
app.use(notFound);

app.listen(3000, () => {
  console.log("Server listening...");
});
