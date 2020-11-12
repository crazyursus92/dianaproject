import express from "express";
import { RegisterRoutes } from "./routes/routes";
import cors from "cors";

export const app = express();


app.use(cors());

RegisterRoutes(app);
