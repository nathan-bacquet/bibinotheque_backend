import bcrypt from "bcryptjs";
//TODO
export function hashPassword(password: string) {
    return bcrypt.hashSync(this.password, 8);
}
//TODO
export function checkPassword(unencryptedPassword: string, cryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, cryptedPassword);
}
