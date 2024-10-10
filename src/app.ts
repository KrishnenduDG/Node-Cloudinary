import cors from "cors";
import express, { Application, Request, Response } from "express";
import { appRouter } from "./routes";

const app: Application = express();

/**
 * Basic Middleware Setups
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Registering the App Router
 */
app.use("/api", appRouter);

export { app };
