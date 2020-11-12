import { Route, Controller, Get, Query, Path, Post, Body } from "tsoa";
import {IUser, UserEntity} from "../entity/User.entity";
import {getConnection} from "typeorm";
import {IValidationError} from "../utils/Model";
import {ResponseError, ResponseSuccess} from "../utils/response";
import {IPagination, Pagination} from "../utils/Pagination";

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
    public async list(@Query() page?: number, @Query() size?: number): Promise<IResponse<IPagination<IUser[]>>> {
        const currentPage = page || 0;
        const currentSize = size || 10;
        const [users, count ] = await getConnection()
            .getRepository(UserEntity)
            .createQueryBuilder("u")
            .limit(currentSize)
            .offset(currentSize * currentPage)
            .getManyAndCount();
        return new ResponseSuccess(new Pagination(users, currentPage, count, currentSize));
    }

    @Get("{id}")
    public async item(@Path() id: number): Promise<IResponse<IUser>> {
        const item = await getConnection()
        .getRepository(UserEntity)
        .findOne(id);
        return new ResponseSuccess(item!);
    }

    @Post("{id}")
    public async update(@Path() id: number, @Body() user: IUser): Promise<IResponse<IUser | IValidationError[]>> {
        const item = await getConnection()
            .getRepository(UserEntity)
            .findOne(id);
        const errors = await item!.load(user).validate();
        if(errors){
            return new ResponseError(errors);
        }
        const resultItem = await getConnection().manager.save(item);
        return new ResponseSuccess(resultItem!);
    }

    @Post()
    public async create(@Body() user: IUser): Promise<IResponse<IUser | IValidationError[]>> {
        const item = await getConnection()
            .getRepository(UserEntity)
            .create();
        const errors = await item.load(user).validate();
        if(errors){
            return new ResponseError(errors);
        }
        const resultItem = await getConnection().manager.save(item);
        return new ResponseSuccess(resultItem);
    }
}
