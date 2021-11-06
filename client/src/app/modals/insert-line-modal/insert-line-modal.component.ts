import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Line } from 'src/app/_models/line';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LineDetailComponent } from 'src/app/lines/line-detail/line-detail.component';

@Component({
  selector: 'app-insert-line-modal',
  templateUrl: './insert-line-modal.component.html',
  styleUrls: ['./insert-line-modal.component.css']
})
export class InsertLineModalComponent implements OnInit {

  message?: string;
  insertLineForm: FormGroup;
  validationErrors: string[] = [];
  line: Line;
  
  @Output() notifyParent: EventEmitter<Line> = new EventEmitter();

  constructor(public bsModalRef: BsModalRef,
              private toastr: ToastrService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  confirm(): void {
    console.log(this.insertLineForm.value);
    this.notifyParent.emit(this.insertLineForm.value);
    this.bsModalRef?.hide();
  }
 
  cancel(): void {
    this.bsModalRef?.hide();
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){

    this.insertLineForm = this.formBuilder.group({
      symbol: ['', Validators.required],
      length: ['' , [Validators.required, Validators.pattern("^(0|[1-9]\\d*)(\\.\\d+)?$")]],
      description: ['', Validators.required],
    })
    //this.registerForm.controls.password.valueChanges.subscribe(() => {
    //  this.registerForm.controls.confirmPassword.updateValueAndValidity();
    //})
    console.log(this.insertLineForm.value);
    //this.insertLineForm.get('length').value;
  }

}
