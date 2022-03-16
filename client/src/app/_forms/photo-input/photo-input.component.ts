import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-photo-input',
  templateUrl: './photo-input.component.html',
  styleUrls: ['./photo-input.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: PhotoInputComponent,
    multi: true
  }]
})
export class PhotoInputComponent implements ControlValueAccessor {
  @Input() progress;
  onChange: Function;
  public files: FileList | null = null;

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const files = event;

    this.files = files;
    this.onChange(files);
  }

  constructor(private host: ElementRef<HTMLInputElement>) { }

  writeValue(value: null) {
    // clear file input
    this.host.nativeElement.value = '';
    this.files = null;
  }
  registerOnChange(fn: Function) {
    this.onChange = fn;
  }
  registerOnTouched(fn: Function) {

  }

}
