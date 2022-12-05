import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LiveCodeService {

  constructor(protected http: HttpClient) {}

  private code = new BehaviorSubject<string>('');
  code$ = this.code.asObservable();

  private grid = new BehaviorSubject<String[][]>([]);
  grid$ = this.grid.asObservable();

  updateCode(value: string) {
    this.code.next(value);
  }

  updateGrid(value: []) {
    this.grid.next(value);
  }

  getCurrentCode() {
    return this.code.getValue();
  }

  getCurrentGrid() {
    return this.grid.getValue();
  }

  // Function to get the current code from the backend
  getCode() {
    this.http.get('http://localhost:3000/code')
    .subscribe({
      complete: () => { console.log('complete'); },
      error: (response) => { console.log(response); },
      next: (response) => { this.updateCode(JSON.stringify(response)); console.log(response); },
  });
  }

  // Function to get the current grid from the backend
  getGrid() {
    this.http.get('http://localhost:3000/grid')
      .subscribe({
        complete: () => { console.log('complete'); },
        error: (response) => { console.log(response); },

        next: (response: any) => { this.updateGrid(response.grid); console.log(response); },
    });
  }
}
