import {ValidationChain, validationResult} from "express-validator/src";
import NextFunction = e.NextFunction;
import Response = e.Response;
import Request = e.Request;
import e = require("express");

/**
 * run all validators, and throw a 402 if one of them fails
 * @param validators
 * @returns {(any|(req:Request, res:Response, next:NextFunction)=>(Response|NextFunction))[]}
 */
export function runValidation(validators: ValidationChain[]) {
    return [...validators, handleValidationErrors ];
}

function handleValidationErrors(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    return next();
}
