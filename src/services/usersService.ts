import usersRepository from "../repositories/usersRepository";
import bcrypt from "bcryptjs";
import {User, UserRole} from "../models/user";
import {UsernameAlreadyExistsException} from "../exceptions/UsernameAlreadyExistsException";
import {EmailAlreadyExistsException} from "../exceptions/EmailAlreadyExistsException";
import {createJwt} from "../utils/jwt";

export default {
    all: async() => {
        return usersRepository.all();
    },
    authenticate: async(email: string, password: string) => {
        let user: User = await usersRepository.findOne({email}, true);
        if (!user) {
            return false;
        }
        if (!await bcrypt.compare(password, user.password)) {
            return false;
        }
        delete user.password;
        let token = createJwt(user);
        return {token, user};
    },
    register: async(username: string, password: string, email: string, role: UserRole = UserRole.BASIC) => {
        password = await bcrypt.hash(password, 10);
        if (await usersRepository.findOne({email})) {
            throw new EmailAlreadyExistsException();
        } else if (await usersRepository.findOne({username})) {
            throw new UsernameAlreadyExistsException();
        }
        return usersRepository.createOne(username, password, email, role);
    }
};
