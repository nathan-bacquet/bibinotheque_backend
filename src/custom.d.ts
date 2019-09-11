import {UserRole} from "./models/user";
declare module "express-serve-static-core" {
    //noinspection JSUnusedLocalSymbols,TsLint
    export interface Request {
        userId?: number;
        userRole?: UserRole;
    }
}
