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
    public page: number | null;
    public pageSize: number | null;
    public totalPages: number | null;

    constructor() {
        this.first = false;
        this.last = false;
        this.page = null;
        this.pageSize = null;
        this.totalPages = null;
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