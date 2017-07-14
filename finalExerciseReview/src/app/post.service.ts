import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Post } from './post';
import 'rxjs/add/operator/map';

@Injectable()
export class PostService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: Http) { }

  getPosts(userId: number): Observable<Post[]> {
    const params = new URLSearchParams();
    params.set('userId', userId.toString());

    return this.http.get(`${this.baseUrl}/posts`, { params }).map(res => res.json());
  }
}
