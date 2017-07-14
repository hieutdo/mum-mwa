import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: any[];

  constructor() { }

  ngOnInit() {
    this.posts = [{ title: 'something' }];
  }

}
