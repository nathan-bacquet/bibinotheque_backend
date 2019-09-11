import {User} from "../models/user";
import jwt from "jsonwebtoken";
import moment from "moment";

export function createJwt(user: User) {
    return jwt.sign({
        data: {
            userId: user.id,
            userRole: user.role
        },
        exp: moment().add(process.env.ACCESS_TOKEN_DURATION, "s").unix()
    }, process.env.JWT_SECRET);
}

export function checkJwtValidity(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET);
}
