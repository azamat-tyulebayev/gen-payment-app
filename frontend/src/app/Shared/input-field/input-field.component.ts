import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.sass']
})
export class InputFieldComponent {
  @Input()
  label: string = 'label';

  @Input()
  placeholder: string = 'placeholder';

  @Input()
  inputLength: number = 45;

  @Input() 
  type: string = 'text';

  @Input()
  inputId: string = 'uniqueInputId' + Math.random();

  @Input()
  customClass: string = 'w-20';

  @Input() 
  bindedInputVariable: any;

  @Output() 
  bindedInputVariableChange = new EventEmitter<any>();

  onBindedInputVariableChange(value: any) {
    this.bindedInputVariableChange.emit(value);
  }
}
