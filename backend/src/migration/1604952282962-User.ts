import {MigrationInterface, QueryRunner, Table} from "typeorm";
import faker from "faker";

export class User1604952282962 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    isPrimary: true,
                    type: "int",
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "firstName",
                    type: "varchar",
                },
                {
                    name: "lastName",
                    type: "varchar",
                },
                {
                    name: "age",
                    type: "int",
                    isNullable: true,
                },
                {
                    name: "email",
                    type: "varchar",
                },
                {
                    name: "password",
                    type: "varchar",
                },
            ],
        }), true);

        const users: (string | number)[][] = [];

        while (users.length < 100) {
            users.push([
                `'${faker.name.findName().replace("'", "")}'`,
                `'${faker.name.lastName().replace("'", "")}'`,
                faker.random.number(79),
                `'${faker.internet.email()}'`,
                `'${faker.internet.password()}'`,
            ]);
        }


            await queryRunner.query(
        `INSERT INTO users (firstName, lastName, age, email, password) VALUES (${users.map(user => user.join(",")).join("), (")})`)     }

        public async down(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.dropTable("users");
        }

    }
