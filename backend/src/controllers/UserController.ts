import { Route, Controller, Get, Query, Path, Post, Body } from "tsoa";
import {IUser, User} from "../entity/User";
import {getConnection} from "typeorm";
import { ValidationError } from "class-validator";
import {IValidationError} from "../utils/Model";

interface IUserFilters {
    id?: number;
    firstName?: string;
    lastName?: string;
    age?: number;
    email?: string;
    password?: string;
}

interface IResponse<T> {
    data: T;
    status: string;
    code: number;
    message: string;
}

@Route("users")
export class UserController extends Controller {

    @Get()
    public async list(): Promise<IResponse<IUser[]>> {
        const users = await getConnection()
            .getRepository(User)
            .find()
        return new ResponseSuccess(users);
    }

    @Get("{id}")
    public async item(@Path() id: number): Promise<IResponse<IUser>> {
        const item = await getConnection()
        .getRepository(User)
        .findOne(id);
        return new ResponseSuccess(item);
    }

    @Post("{id}")
    public async update(@Path() id: number, @Body() user: IUser): Promise<IResponse<IUser | IValidationError[]>> {
        const item = await getConnection()
            .getRepository(User)
            .findOne(id);
        const errors = await item.load(user).validate();
        if(errors){
            return new ResponseError(errors);
        }
        const resultItem = await getConnection().manager.save(item);
        return new ResponseSuccess(resultItem);
    }

    @Post()
    public async create(@Body() user: IUser): Promise<IResponse<IUser | IValidationError[]>> {
        const item = await getConnection()
            .getRepository(User)
            .create();
        const errors = await item.load(user).validate();
        if(errors){
            return new ResponseError(errors);
        }
        const resultItem = await getConnection().manager.save(item);
        return new ResponseSuccess(resultItem);
    }
}
