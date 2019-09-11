import BaseException from "./BaseException";
import ErrorCode from "../consts/ErrorCode";
export default class JwtExpiredException extends BaseException {
    public message = "token expired";
    public status = 401;
    public code = ErrorCode.JWT_EXPIRED;
}
