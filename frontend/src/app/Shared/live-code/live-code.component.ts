import { Component } from '@angular/core';
import { LiveCodeService } from '../../live-code.service';

@Component({
  selector: 'app-live-code',
  templateUrl: './live-code.component.html',
  styleUrls: ['./live-code.component.sass']
})
export class LiveCodeComponent {
  constructor (private liveCodeService: LiveCodeService){}

  code = '';
  ngOnInit() {
    this.liveCodeService.code$.subscribe(value => {
      this.code = value;
    });
  }
}
