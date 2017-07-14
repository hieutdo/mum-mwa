import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';
import { Post } from './post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts: Array<Post>;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts(1).subscribe(res => this.posts = res);
  }
}
