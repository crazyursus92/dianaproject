abstract class HttpResponse<T> implements IResponse<T> {
    code: number;
    data: T;
    status: string;
    message: string;

    constructor(data: T, code: number = 200, message: string) {
        this.data = data;
        this.code = code;
        this.message = message;
        this.status = "success";
    }
}

export class ResponseSuccess<T> extends HttpResponse<T> {
    constructor(data: T, code: number = 200, message: string = "success") {
        super(data, code, message);
        this.status = "success";
    }
}

export class ResponseError<T> extends HttpResponse<T> {
    constructor(data: T, code: number = 400, message: string = "error") {
        super(data, code, message);
        this.status = "error";
    }
}
