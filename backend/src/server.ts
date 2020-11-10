import "reflect-metadata";
import { app } from "./app";
import {createConnection} from "typeorm";

const port = process.env.PORT || 3000;

app.listen(port, async () => {
    await createConnection();
    console.log(`Example app listening at http://localhost:${port}`)
});
