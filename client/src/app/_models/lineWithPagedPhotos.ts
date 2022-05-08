import { Line } from "./line";
import { PaginatedResult } from "./pagination";
import { Photo } from "./photo";


export interface LineItem {
    pagedListOfPhotos: PaginatedResult<Photo>;
    line: Line;
}

export class LineWithPagedPhotos {
    lineItem: LineItem;
    
    constructor(){

    }
}