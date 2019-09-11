import {MigrationInterface, QueryRunner} from "typeorm";

//noinspection JSUnusedGlobalSymbols
export class CreateUsersTable1564647274367 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE users (" +
            "id INT AUTO_INCREMENT," +
            "username VARCHAR(255) NOT NULL UNIQUE," +
            "email VARCHAR(255) NOT NULL UNIQUE," +
            "password VARCHAR(255) NOT NULL," +
            "role ENUM('ADMIN','BASIC') DEFAULT 'BASIC'," +
            "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
            "updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP," +
            "PRIMARY KEY (id) )");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE users");
    }

}
