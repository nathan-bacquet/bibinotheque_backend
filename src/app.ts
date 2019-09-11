import express from "express";
import NextFunction = express.NextFunction;
import Request = express.Request;
import Response = express.Response;
import helmet from "helmet";
import routes from "./routes";
import {createConnection} from "typeorm";
import dotenv from "dotenv";
import {validationResult} from "express-validator";
import BaseException from "./exceptions/BaseException";

const app = express();

createConnection().then(
    () => {
        // load dotenv file
        dotenv.config();
        // middlewares
        app.use(helmet());
        app.use(express.json());
        // routes
        app.use("/", routes);
        // error handlers : must be registered in last
        app.use(handleStackErrors);
        app.listen(3000, () => {
            //noinspection TsLint
            console.log("App listening on port 3000");
        });
    }
);

//noinspection JSUnusedLocalSymbols
function handleStackErrors(err: Error, req: Request, res: Response, next: NextFunction) {
    let payload;
    let status = 500;
    if (err instanceof BaseException) {
        payload = {
            message: process.env.ENV !== "prod" ? err.message : "Something broke!",
            code: err.code ? err.code : ""
        };
        status = err.status ? err.status : 500;
    } else {
        console.error(err);
        payload = {
            message : process.env.ENV !== "prod" ? err.message : "Something broke!"
        };
    }
    res.status(status).json(payload);
}
