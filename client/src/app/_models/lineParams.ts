import { Line } from "./line";

export class LineParams {
    currentLineId : number;
    lineSymbol: string = "";
    pageNumber = 1;
    pageSize = 5;
    orderBy  = 'currentLineId'

    constructor(){

    }
}