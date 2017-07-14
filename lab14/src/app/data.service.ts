import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: Http) { }

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/${id}`).map(res => res.json());
  }

  getPosts(userId: number): Observable<any[]> {
    const params = new URLSearchParams();
    params.set('userId', userId.toString());

    return this.http.get(`${this.baseUrl}/posts`, { params }).map(res => res.json());
  }
}
