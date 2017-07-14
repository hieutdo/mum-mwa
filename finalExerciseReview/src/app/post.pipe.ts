import { Pipe, PipeTransform } from '@angular/core';
import { Post } from './post';

@Pipe({
  name: 'post'
})
export class PostPipe implements PipeTransform {

  transform(posts: Array<Post>, term: string): any {
    return posts ? posts.filter(p => p.title.includes(term)) : null;
  }

}
