import BaseException from "./BaseException";
import ErrorCode from "../consts/ErrorCode";
export default class UnauthorizedException extends BaseException {
    public message = "Unauthorized";
    public status = 401;
    public code = ErrorCode.UNAUTHORIZED;
}
