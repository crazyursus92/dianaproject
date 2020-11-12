import "reflect-metadata";
import { app } from "./app";
import {ConnectionOptions, createConnection} from "typeorm";

const port = process.env.PORT || 3006;

export const mysql_config : ConnectionOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "dianaproject",
    entities: [
        "./**/*.entity.js"
    ],
    synchronize: true,
    logging: "all"
};
app.listen(port, async () => {
    await createConnection(mysql_config).catch(e => {
        console.log(e);
    });
    console.log(__dirname + "/entity/*.js");

    console.log(`Example app listening at http://localhost:${port}`)
});
