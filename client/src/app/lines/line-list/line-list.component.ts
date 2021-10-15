import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
//import { Console } from 'console';

import { Line } from 'src/app/_models/line';
import { LineParams } from 'src/app/_models/lineParams';
import { Pagination } from 'src/app/_models/pagination';
import { LinesService } from 'src/app/_services/lines.service';

@Component({
  selector: 'app-line-list',
  templateUrl: './line-list.component.html',

animations: [  
  trigger('expandCollapse', [  
    state('collapsed', style({  
      height: 0,  
      paddingTop: 0,  
      paddingBottom: 0,  
      overflow: 'hidden'      // This will hide the children of the div  
    })),  
  
    state('expanded', style({  
      height: '*',          // Height depends upon the content. So Angular computes it dynamically  
      padding: '*',  
      overflow: 'hidden'  
    })),  
  
    // finally we need to add transition  
    transition('collapsed => expanded', [  
      // Don't want any initially animation at collapsed state. So,  
      animate('300ms ease-out')  
    ]),  
  
    transition('expanded => collapsed', [  
      animate('300ms ease-in')  
    ])  
  ]),
  
  
  trigger('deleteItem', [
    state('expanded', style({ 
      height: '*', /*display: 'block',*/ 
      color:'black' })),

    state('collapsed', style({ 
      height: '0px', 
      maxHeight: '0', 
      display: 'none', 
      color: 'white' })),

    transition('expanded <=> collapsed', 
    [animate('1000ms cubic-bezier(0.4, 0.0, 0.2, 1)')
  ]),
]),
]  


})

export class LineListComponent implements OnInit {
  lines: Line[]; 
  showChildTable: boolean[] = [];
  toggleSort: boolean[] = [];
  headerArray: number[];
  selectedItems: Line[];
  deletedElement: Line;
  pagination: Pagination;
  lineParams: LineParams; 
  
  constructor(private lineService: LinesService) {
    this.lineParams = new LineParams();
    this.headerArray =  Array.from(Array(this.lineParams.headerTableNames.length).keys());
  }

  ngOnInit(): void {
    this.loadLines();
  }

  loadLines(){
    this.lineService.getLines(this.lineParams).subscribe(response => {
      //this.lines = lines;
      //this.selectedItems = lines;
      this.lines = response.result;
      this.pagination = response.pagination;
      this.selectedItems = response.result;
      //this.toggleSort = this.toggleSort && 
    })
  }

  deleteFromCart(id: number){
    // *********EXECUTING ONLY ANIMATIONS*******************************

    this.deletedElement = this.selectedItems.find(e => e.id === id);
    this.selectedItems =  this.selectedItems.filter(e => e.id != id)

    setTimeout( () => { 
        this.lines = this.selectedItems;
      } , 1000);

    // *********INSERT CODE HERE TO DELETE ITEMS FROM API***************
    // this.employeService.deleteFromCart(id).subscribe((data:any)=>{
    //   alert("Data deleted succefully");
    //   this.getdata()
    // })
  }

  pageChanged(event: any){
    this.lineParams.pageNumber = event.page;
    this.loadLines();
    this.showChildTable = []; //stop showing all child table
  }

  testClick(){
    console.log("Kliknięty element!!!!");
  }


  //childTableToggle() {
    //console.log('register nav button');
    //this.showChildTable = !this.showChildTable;
    //console.log(this.showChildTable);
    //this.showFormChange.emit(this.showRegisterForm);
  //}
}
