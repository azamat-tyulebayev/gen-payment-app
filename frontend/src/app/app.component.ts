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
  grid: String[][] = new Array(10).fill(new Array(10).fill(''));

  code = '';
  biasChar = '';
  lastBiasUpdate = 0;
  generatorStarted: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getCode();
  }

  startGenerator() {
    if (this.generatorStarted === false) {
      // Get initial grid and code
      this.getGrid();

      // Update grid and code every second
      setInterval(() => {
        this.getGrid();
        this.getCode();
      }, 1000);

      this.generatorStarted = true;
    }
  }

  // Function to get the current grid from the backend
  getGrid() {
    this.http.get('http://localhost:3000/grid')
      .subscribe({
        complete: () => { console.log('complete'); },
        error: (response) => { console.log(response); },

        next: (response: any) => { this.grid = response.grid; console.log(response); },
    });
  }

    // Function to get the current code from the backend
    getCode() {
      this.http.get('http://localhost:3000/code')
      .subscribe({
        complete: () => { console.log('complete'); },
        error: (response) => { console.log(response); },
        next: (response) => { this.code = JSON.stringify(response); console.log(response); },
    });
    }

  // Function to update the bias character
  updateBiasChar() {
    // Check if 4 seconds have passed since last update
    if (new Date().getTime() - this.lastBiasUpdate > 4000) {
      this.lastBiasUpdate = new Date().getTime();
      this.http.post('http://localhost:3000/bias', { biasChar: this.biasChar })
        .subscribe(() => {});
    }else {
      console.log('wait 4 seconds1!!!');
    }
  }
}
