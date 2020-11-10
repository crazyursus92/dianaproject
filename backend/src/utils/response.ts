abstract class HttpResponse<T> implements IResponse<T> {
    code: number;
    data: T;
    status: string;
    message: string;
}

class ResponseSuccess<T> extends HttpResponse<T> {
    constructor(data: T, code: number = 200, message: string = "success") {
        super();
        this.data = data;
        this.code = code;
        this.message = message;
        this.status = "success";
    }
}

class ResponseError<T> extends HttpResponse<T> {
    constructor(data: T, code: number = 400, message: string = "error") {
        super();
        this.data = data;
        this.code = code;
        this.message = message;
        this.status = "error";
    }
}
