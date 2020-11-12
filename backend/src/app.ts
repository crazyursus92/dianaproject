import express from "express";
import bodyParser from "body-parser";
import { RegisterRoutes } from "./routes/routes";

export const app = express();

// Use body parser to read sent json payloads
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(bodyParser.json());

RegisterRoutes(app);

app.use("*", function (params) {
   console.log(arguments);
});
