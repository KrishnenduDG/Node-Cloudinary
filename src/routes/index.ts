import { Request, Response, Router } from "express";
import { failureLabel, successLabel } from "../constants";
import cloudinaryRouter from "./cloudinary";

const appRouter = Router();

/**
 * Default Health Route
 */
appRouter.get("/ping", (req: Request, res: Response) =>
  res.status(200).json({ status: successLabel, msg: "Server Up and running.." })
);

/**
 * Registering other routes
 */
appRouter.use("/cloudinary", cloudinaryRouter);

/**
 * 404 Route
 */
appRouter.use("*", (req: Request, res: Response) =>
  res.status(404).json({ status: failureLabel, msg: "Invalid Route!😔😔" })
);

export { appRouter };
