import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, TemplateRef } from '@angular/core';
//import { Console } from 'console';
import { expandCollapse } from 'src/app/_animations/expand-collapse';
import { deleteItem } from 'src/app/_animations/delete-Item';

import { Line } from 'src/app/_models/line';
import { LineParams } from 'src/app/_models/lineParams';
import { Pagination } from 'src/app/_models/pagination';
import { LinesService } from 'src/app/_services/lines.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DeleteLineModalComponent } from 'src/app/modals/delete-line-modal/delete-line-modal.component';
import { InsertLineModalComponent } from 'src/app/modals/insert-line-modal/insert-line-modal.component';

@Component({
  selector: 'app-line-list',
  templateUrl: './line-list.component.html',

animations: [  
  expandCollapse,
  deleteItem
]  

})

export class LineListComponent implements OnInit {
  lines: Line[]; 
  showChildTable: boolean[] = [];
  toggleSort: boolean[] = [];
  headerArray: number[];
  deletedElement: Line;
  pagination: Pagination;
  lineParams: LineParams;
  bsModalRef: BsModalRef; 
  
  constructor(private lineService: LinesService, 
              private toastr: ToastrService, 
              private modalServeice: BsModalService) {
    this.lineParams = this.lineService.getLineParams();
    this.headerArray =  Array.from(Array(this.lineParams.headerTableNames.length).keys());
  }

  ngOnInit(): void {
    this.loadLines();
  }

  loadLines(){
    this.lineService.setLineParams(this.lineParams);
    this.lineService.getLines(this.lineParams).subscribe(response => {
      this.lines = response.result;
      this.pagination = response.pagination;
    })
  }

  deleteLineById(id: number){
  
    this.deletedElement = this.lines.find(e => e.id === id);
    this.lineService.deleteLine(id).subscribe(() => {
      
      setTimeout(() => {
        this.loadLines();
      }, 500);

      this.toastr.success("Successfully removed");
    });
  }

  insertLine(line: any){
    this.lineService.inserLine(line).subscribe(() => {
      
      setTimeout(() => {
        this.loadLines();
      }, 500);

      this.toastr.success("Successfully added");
    })
  }

  pageChanged(event: any){
    this.lineParams.pageNumber = event.page;
    this.lineService.setLineParams(this.lineParams);
    this.loadLines();
    this.showChildTable = []; //stop showing all child table
  }

  openDeleteModal(id: number){
    this.bsModalRef = this.modalServeice.show(DeleteLineModalComponent);
    this.bsModalRef.content.notifyParent.subscribe((result)=>{
      if(result) this.deleteLineById(id);
      console.log(result);   
    })
  }

  openInsertModal(){
    this.bsModalRef = this.modalServeice.show(InsertLineModalComponent, {animated: true, class: 'modal-lg'});
    this.bsModalRef.content.notifyParent.subscribe((result) => {
      //console.log(result.length);
      //console.log(result);
      this.insertLine(result);
    })
  }

  testClick(){
    console.log("Kliknięty element!!!!");
  }
  //openModal(template: TemplateRef<any>) {
   // this.bsModalRef = this.modalServeice.show(DeleteLineModalComponent);
   // this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  //}

  //childTableToggle() {
    //console.log('register nav button');
    //this.showChildTable = !this.showChildTable;
    //console.log(this.showChildTable);
    //this.showFormChange.emit(this.showRegisterForm);
  //}
}
