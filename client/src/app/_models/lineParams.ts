import { Line } from "./line";

export class LineParams {
    currentLineId : number;
    lineSymbol: string = "";
    pageNumber = 1;
    pageSize = 5;
    orderBy  = 'currentLineId'
    filterArrayListAsc: String[] = ['notificationsAmountAsc', 'idAsc', 'symbolAsc', 'lengthAsc'];
    filterArrayListDesc: String[] = ['notificationsAmountDesc', 'idDesc', 'symbolDesc', 'lengthDesc'];
    headerTableNames: String [] = ['Not. amount', 'Id', 'Symbol', 'Length'];
    
    constructor(){

    }
}