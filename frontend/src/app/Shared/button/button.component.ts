import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass']
})
export class ButtonComponent {
  @Input()
  label: string = 'label';

  @Output() 
  buttonClick = new EventEmitter<any>();

  onButtonClick(value: any) {
    this.buttonClick.emit(value);
  }
}
