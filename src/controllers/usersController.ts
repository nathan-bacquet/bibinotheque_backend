import e from "express";
import NextFunction = e.NextFunction;
import Request = e.Request;
import Response = e.Response;
import userService from "../services/usersService";
import {check} from "express-validator";
import {runValidation} from "../utils/validation";
import {User} from "../models/user";
import {EmailAlreadyExistsException} from "../exceptions/EmailAlreadyExistsException";
import {UsernameAlreadyExistsException} from "../exceptions/UsernameAlreadyExistsException";
import ErrorCode from "../consts/ErrorCode";

export default {
  all : (req: Request, res: Response, next: NextFunction) => {
    userService.all()
        .then( (users) => res.json(users))
        .catch( (err) => next(err));
  },
  auth : (req: Request, res: Response, next: NextFunction) => {
    userService.authenticate(req.body.email, req.body.password).then( ({token, user}: {token: string, user: User}) => {
      if (user) {
        res.json({token, user});
      } else {
        res.status(401).send("Unauthorized");
      }
    }).catch(
        (err) => { next(err); }
    );
  },
  register :  (req: Request, res: Response, next: NextFunction) => {
    userService.register(req.body.username, req.body.password, req.body.email).then(
        (user) => res.json(user)
    ).catch(
        (err) => {
            if (err instanceof EmailAlreadyExistsException) {
              err.status = 422;
              err.code = ErrorCode.EMAIL_ALREADY_EXISTS;
            } else if (err instanceof UsernameAlreadyExistsException) {
              err.status = 422;
              err.code = ErrorCode.USERNAME_ALREADY_EXISTS;
            }
            next(err);
        }
    );
  },
  validateAuth : () => {
    return runValidation([
      check("email").exists().isEmail(),
      check("password").exists()
    ]);
  },
  validateRegister : () => {
    return runValidation([
      check("email").exists().isEmail(),
      check("password").exists(),
      check("username").exists()
    ]);
  },
};
