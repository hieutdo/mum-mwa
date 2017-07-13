import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  getUser(id: number) {
    return this.http.get(`http://jsonplaceholder.typicode.com/users/${id}`).map(res => res.json());
  }

  getPosts(userId: number) {
    return this.http.get(`http://jsonplaceholder.typicode.com/posts?userId=${userId}`).map(res => res.json());
  }
}
