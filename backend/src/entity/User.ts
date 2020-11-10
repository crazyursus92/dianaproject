import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import {IsEmail, IsNumber, IsOptional, IsString} from "class-validator";
import {Model} from "../utils/Model";

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    age?: number;
    email: string;
    password: string;
}

@Entity()
export class User extends Model implements IUser {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    firstName: string;

    @Column()
    @IsString()
    lastName: string;

    @Column()
    @IsNumber()
    @IsOptional()
    age?: number;

    @Column()
    @IsString()
    @IsEmail()
    email: string;

    @Column()
    @IsString()
    @IsOptional()
    password: string;

    protected attributes = [
        "id",
        "firstName",
        "lastName",
        "age",
        "email",
        "password",
    ];

}
