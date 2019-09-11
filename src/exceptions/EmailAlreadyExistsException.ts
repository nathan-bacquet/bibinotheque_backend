import BaseException from "./BaseException";
import ErrorCode from "../consts/ErrorCode";
export class EmailAlreadyExistsException extends BaseException {
    public message = "Email already exists";
    public status = 422;
    public code = ErrorCode.EMAIL_ALREADY_EXISTS;
}
