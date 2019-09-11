import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn} from "typeorm";
import moment = require("moment");
import Moment = moment.Moment;

export enum UserRole {
    ADMIN = "ADMIN",
    BASIC = "BASIC",
}
@Unique(["email"])
@Unique(["username"])
@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    public id: number;
    @Column()
    public username: string;
    @Column()
    public password: string;
    @Column()
    public email: string;
    //noinspection ReservedWordAsName
    @Column({
        //noinspection ReservedWordAsName
        default: UserRole.BASIC,
        //noinspection ReservedWordAsName
        enum: UserRole,
        type: "enum"
    })
    public role: UserRole;
    @CreateDateColumn({
        transformer: {
            to: (value: Moment): string => value.format("YYYY-MM-DD HH:mm:ss"),
            from: (value: string): Moment => moment(value, "YYYY-MM-DD HH:mm:ss")
        },
        name: "created_at"
    })
    public createdAt: Moment;
    @UpdateDateColumn({
        transformer: {
            to: (value: Moment): string => value.format("YYYY-MM-DD HH:mm:ss"),
            from: (value: string): Moment => moment(value, "YYYY-MM-DD HH:mm:ss")
        },
        name: "updated_at"
    })
    public updatedAt: Moment;
}
