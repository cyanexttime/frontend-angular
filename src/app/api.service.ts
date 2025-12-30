import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://poc4k-central.ovng.dev.myovcloud.com:3001/api/hello';

  constructor(private http: HttpClient) {}

  getHello() {
    return this.http.get<{ message: string }>(this.apiUrl);
  }
}
