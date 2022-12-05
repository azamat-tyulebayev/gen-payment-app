import { Component, OnInit } from '@angular/core';
import { LiveCodeService } from '../live-code.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.sass']
})
export class PaymentComponent implements OnInit {
  constructor (private liveCodeService: LiveCodeService){}

  paymentNameInputLabel:string = 'Payment';
  paymentName: string = '';

  paymentAmountInputLabel:string = 'Amount';
  paymentAmount: number = 0;

  paymentAmountInputType: string = 'number';
  paymentNameInputType: string = 'text';

  addPaymentButtonLabel: string = '+ Add';
  inputCustomClass: string = 'w-full';

  payments: Payment[] = [];

  addPayment(): void {
    this.payments.push({
      'name': this.paymentName,
      'amount': this.paymentAmount, 
      'code': this.liveCodeService.getCurrentCode(),
      'grid': this.liveCodeService.getCurrentGrid()
    })
  }

  ngOnInit(): void {
    this.liveCodeService.getCode();
    this.liveCodeService.getGrid();
    setInterval(() => {
      this.liveCodeService.getCode();
      this.liveCodeService.getGrid();
    }, 1000);
  }
}

export class Payment {
  name: string = 'Sample Name';
  amount: number = 99;
  code: any = '99';
  grid: String[][] = [];
}
