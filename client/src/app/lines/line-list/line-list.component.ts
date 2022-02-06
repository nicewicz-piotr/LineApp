import { Component, OnInit, TemplateRef } from '@angular/core';
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
import { Router } from '@angular/router';

@Component({
  selector: 'app-line-list',
  templateUrl: './line-list.component.html',
  styleUrls: ['./line-list.component.css'],

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
              private modalService: BsModalService,
              private router: Router) {
    this.lineParams = this.lineService.getLineParams();
    this.headerArray =  Array.from(Array(this.lineParams.headerTableNames.length).keys());
  }

  ngOnInit(): void {
    this.loadLines();
  }

  /*
  loadLine(id: number){
    this.lineService.getLine(id).subscribe(response => {
      this.router.navigateByUrl('/');
    });
  }
  */

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

  insertLine(line: Line){
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
    this.bsModalRef = this.modalService.show(DeleteLineModalComponent, {animated: true});
    this.bsModalRef.content.notifyParent.subscribe((result: boolean)=>{
      if(result) this.deleteLineById(id);
      console.log(result);   
    })
  }

  openInsertModal(){
    this.bsModalRef = this.modalService.show(InsertLineModalComponent, {animated: true, class: 'modal-lg'});
    this.bsModalRef.content.notifyParent.subscribe((result: Line) => {
      //console.log(result);
      this.insertLine(result);
    })
  }

  testClick(){
    console.log("Kliknięty element!!!!");
  }
}
