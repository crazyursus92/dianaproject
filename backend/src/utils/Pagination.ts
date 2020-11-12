export interface IPagination<T> {
    items: T,
    page: number;
    limit: number;
    size: number;
}

export class Pagination<T> implements IPagination<T> {
    public items;
    public page;
    public limit;
    public size;

    constructor(items: T, page: number, limit: number, size: number) {
        this.items = items;
        this.page = page;
        this.limit = limit;
        this.size = size;
    }
}
