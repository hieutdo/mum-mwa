import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { Observable } from 'rxjs/Observable';
import { Post } from '../post';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts$: Observable<Post[]>;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.posts$ = this.postService.getPosts(1);
  }

}
