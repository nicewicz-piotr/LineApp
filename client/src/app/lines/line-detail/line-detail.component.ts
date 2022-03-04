import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Line } from 'src/app/_models/line';
import { AccountService } from 'src/app/_services/account.service';
import { LinesService } from 'src/app/_services/lines.service';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { error } from 'protractor';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditLineModalComponent } from 'src/app/modals/edit-line-modal/edit-line-modal.component';
import { ToastrService } from 'ngx-toastr';
import { Notification } from "../../_models/notification";
import { InsertNotificationModalComponent } from 'src/app/modals/insert-notification-modal/insert-notification-modal.component';


@Component({
  selector: 'app-line-detail',
  templateUrl: './line-detail.component.html',
  styleUrls: ['./line-detail.component.css']
})
export class LineDetailComponent implements OnInit {
  lines: Line[];
  line: Line;
  editedElement: Line;
  user: User;
  bsModalRef: BsModalRef; 

  constructor(private accountService: AccountService,
              private route: ActivatedRoute,
              private router: Router,
              private lineService: LinesService,
              private modalService: BsModalService,
              private toastr: ToastrService) {
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit(): void {
    this.loadLine();
  }

  
  loadLine(){
    let urlParamId = Number(this.route.snapshot.paramMap.get('id'))
    //console.log(urlParamId)
    urlParamId = urlParamId ? urlParamId : 0;
    //console.log(urlParamId)

    this.lineService.getLine(urlParamId).subscribe(line => {
      this.line = line;
      console.log("Load line parameter:", line)
    })
  }

  editLineById(line: Line){
  
    //let urlId = Number(this.route.snapshot.paramMap.get('id'))
    //this.editedElement = this.lines.find(e => e.id === urlId);
    this.editedElement = this.line
    line.id = this.line.id
    //console.log(line)
    this.lineService.updateLine(line).subscribe(() => {
      
      setTimeout(() => {
        this.loadLine();
      }, 500);

      //this.loadLine();
      this.toastr.success("Successfully edited");
    });
    
  }

  openEditModal(){
    const line = this.line;
    this.bsModalRef = this.modalService.show(EditLineModalComponent, {initialState: { line }, animated: true, class: 'modal-lg'});
    this.bsModalRef.content.notifyParent.subscribe((result: Line) => {
      
      this.editLineById(result);
    })
    
  }

  insertNotification(notification: Notification){
  
    //let urlId = Number(this.route.snapshot.paramMap.get('id'))
    //this.editedElement = this.lines.find(e => e.id === urlId);
    notification.lineId = this.line.id
    //console.log(line)
    this.lineService.insertNotification(notification).subscribe((result) => {
      
      console.log(result);
      setTimeout(() => {
        this.loadLine(); //???
      }, 500);

      //this.loadLine();
      this.toastr.success("Successfully added");
    });
    
    
  }

  openInsertNotificationModal(){
    const line = this.line;
    this.bsModalRef = this.modalService.show(InsertNotificationModalComponent, { animated: true, class: 'modal-lg'});
    this.bsModalRef.content.notifyParent.subscribe((result: Notification) => {
      
      this.insertNotification(result);
    })
    
  }  
  
}
