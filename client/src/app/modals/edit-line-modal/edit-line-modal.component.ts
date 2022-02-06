import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Line } from 'src/app/_models/line';

@Component({
  selector: 'app-edit-line-modal',
  templateUrl: './edit-line-modal.component.html',
  styleUrls: ['./edit-line-modal.component.css']
})
export class EditLineModalComponent implements OnInit {

  message?: string;
  insertLineForm: FormGroup;
  validationErrors: string[] = [];
  //line: Line;
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
    console.log(this.line)
    
    this.insertLineForm = this.formBuilder.group({
      symbol: [this.line.symbol, Validators.required],
      length: [this.line.length , [Validators.required, Validators.pattern("^(0|[1-9]\\d*)(\\.\\d+)?$")]],
      description: [this.line.description, Validators.required],
    })
    //this.registerForm.controls.password.valueChanges.subscribe(() => {
    //  this.registerForm.controls.confirmPassword.updateValueAndValidity();
    //})
    console.log(this.insertLineForm.value);
    //this.insertLineForm.get('length').value;
  }

}
