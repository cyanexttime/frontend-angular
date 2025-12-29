import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>Angular Frontend</h1>
    <p>{{ message }}</p>
  `
})
export class AppComponent implements OnInit {
  message = 'Loading...';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getHello().subscribe(res => {
      this.message = res.message;
    });
  }
}
