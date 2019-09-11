import e from "express";
import NextFunction = e.NextFunction;
import Request = e.Request;
import Response = e.Response;
import {checkJwtValidity, } from "../utils/jwt";
import UnauthorizedException from "../exceptions/UnauthorizedException";
import JwtExpiredException from "../exceptions/JwtExpiredException";

/**
 * Middleware that throws an Unauthorized exception if no jwt token has been provided through
 * the Authorization : Bearer ... header, or if the token is invalid
 * if the jwt is valid, this middleware will fill the request userId and userRole with the jwt's payload
 * @param req
 * @param res
 * @param next
 */
export default function (req: Request, res: Response, next: NextFunction) {
    let token = req.header("Authorization") ? req.header("Authorization").slice(7) : "";
    if (!token) {
        next(new UnauthorizedException());
    }
    try {
        let tokenPayload = (checkJwtValidity(token) as any).data;
        req.userId = tokenPayload.userId;
        req.userRole = tokenPayload.userRole;
    } catch (err) {
       switch (err.name) {
           case "TokenExpiredError" : next(new JwtExpiredException()); break;
           case "JsonWebTokenError" : next(new UnauthorizedException()); break;
           default : next(err);
       }
    }
    next();
}
