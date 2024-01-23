import { MetaInfo } from "./MetaInfo";

export class PaginationResponse<T>{

    public metaInfo: MetaInfo;
    public results: T[];

    constructor(metaInfo: MetaInfo,results: T[]){
        this.results = results;
        this.metaInfo = metaInfo;
    }
}