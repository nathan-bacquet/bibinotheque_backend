import {getRepository} from "typeorm";
import {User, UserRole} from "../models/user";
import moment = require("moment");
export default{
    all: () => {
        return getRepository(User).find();
    },
    findOne: async (whereCriteria: Object, withPassword: boolean = false) => {
        let user = await getRepository(User).findOne({ where: whereCriteria });
        if (user && !withPassword) {
           delete user.password;
        }
        return user;
    },
    createOne: async (username: string, password: string, email: string, role: UserRole) => {
        let userRepo = getRepository(User);
        let insertResult = await userRepo.insert(
            {username, password, email, role, createdAt: moment(), updatedAt: moment()}
        );
        return userRepo.findOne(insertResult.raw.insertId);
    }
};
