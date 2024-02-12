class MetaInfo {
    public empty: boolean;
    public pageInfo: PageInfo = new PageInfo();
    public sortInfo: SortInfo = new SortInfo();
    public search: { [key: string]: any };
    public totalElements: number | null;

    constructor() {
        this.empty = false;
        this.pageInfo = new PageInfo();
        this.sortInfo = new SortInfo();
        this.search = {};
        this.totalElements = null;
    }
}

class PageInfo {
    public first: boolean;
    public last: boolean;
    public page: number;
    public pageSize: number;
    public totalPages: number;

    constructor() {
        this.first = false;
        this.last = false;
        this.page = 0;
        this.pageSize = 0;
        this.totalPages = 0;
    }
}

class SortInfo {
    public sortField: string | null;
    public sortType: string | null;

    constructor() {
        this.sortField = null;
        this.sortType = null;
    }
}

export { MetaInfo, PageInfo, SortInfo };