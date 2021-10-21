import { Line } from "./line";

export class LineParams {
    currentLineId : number;
    searchBy: string  ='symbol';
    searchListOptions: string[] = ['symbol','id'];
    searchText: string = "";
    orderBy  = 'currentLineId'
    orderByListAsc: String[] = [
        'notificationsAmountAsc',
        'idAsc',
        'symbolAsc',
        'lengthAsc'
    ];
    orderByListDesc: String[] = [
        'notificationsAmountDesc', 
        'idDesc',
        'symbolDesc',
        'lengthDesc'
    ];
    headerTableNames: String [] = [
        'Not. amount',
        'Id',
        'Symbol',
        'Length'
    ];
    pageNumber = 1;
    pageSize: number = 5; 
    
    constructor(){

    }
}