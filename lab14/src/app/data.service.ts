import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: Http) { }

  getUser(id: number) {
    return this.http.get(`${this.baseUrl}/users/${id}`).map(res => res.json());
  }

  getPosts(userId: number) {
    return this.http.get(`${this.baseUrl}/posts?userId=${userId}`).map(res => res.json());
  }
}
