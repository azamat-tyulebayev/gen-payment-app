import { Component, Input, OnInit } from '@angular/core';
import { LiveCodeService } from '../live-code.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.sass']
})
export class GeneratorComponent implements OnInit{
  title = 'frontend';
  grid: String[][] = new Array(10).fill(new Array(10).fill(''));

  inputLabel = 'Character';
  biasChar = '';
  lastBiasUpdate = 0;
  generatorStarted: boolean = false;
  inputType: string = 'text';
  buttonLabel: string = 'Generate 2D Grid';
  
  ngOnInit (): void {
    this.liveCodeService.getCode();
  }

  constructor (private liveCodeService: LiveCodeService, private http: HttpClient){}

  startGenerator() {
    if (this.generatorStarted === false) {
      // Get initial grid
      this.getGrid();

      // Update grid and code every second
      setInterval(() => {
        this.getGrid();
        this.liveCodeService.getCode();
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

  // Function to update the bias character
  updateBiasChar(event: any) {
    // Check if 4 seconds have passed since last update
    if (new Date().getTime() - this.lastBiasUpdate > 4000) {
      var charCode = this.biasChar.charCodeAt(0);

      if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode == 8)
      {
        this.lastBiasUpdate = new Date().getTime();
        this.http.post('http://localhost:3000/bias', { biasChar: this.biasChar })
          .subscribe(() => {});
      } else {
        console.log('Only letters allowed!');
      }
    }else {
      console.log('wait 4 seconds1!!!');
    }
  }
}
