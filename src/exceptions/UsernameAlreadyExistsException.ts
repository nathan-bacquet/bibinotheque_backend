import BaseException from "./BaseException";
import ErrorCode from "../consts/ErrorCode";
export class UsernameAlreadyExistsException extends BaseException {
    public message = "Username already exists";
    public status = 422;
    public code = ErrorCode.USERNAME_ALREADY_EXISTS;
}
