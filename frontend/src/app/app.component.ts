import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  title = 'frontend';
  grid: String[][] = [];
  code = '';
  biasChar = '';
  lastBiasUpdate = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Get initial grid and code
    this.getGridAndCode();

    // Update grid and code every second
    setInterval(() => {
      this.getGridAndCode();
    }, 1000);
  }

  // Function to get the current grid and code from the backend
  getGridAndCode() {
    this.http.get('http://localhost:3000/grid')
      /*.subscribe((response: any) => {
        console.log(response);
        this.grid = response;
        //this.code = response.code;
      })*/
      .subscribe({
        complete: () => { console.log('complete'); },
        error: (response) => { console.log(response); },

        next: (response: any) => { this.grid = response.grid; console.log(response); },
    });

    this.http.get('http://localhost:3000/code')
    .subscribe({
      complete: () => { console.log('complete'); },
      error: (response) => { console.log(response); },
      next: (response) => { this.code = JSON.stringify(response); console.log(response); },
  });
  }

  // Function to update the bias character
  updateBiasChar(event: any) {
    // Check if 4 seconds have passed since last update
    if (new Date().getTime() - this.lastBiasUpdate > 4000) {
      this.lastBiasUpdate = new Date().getTime();
      this.http.post('http://localhost:3000/bias', { biasChar: event.target.value })
        .subscribe(() => {});
    }
  }
}
