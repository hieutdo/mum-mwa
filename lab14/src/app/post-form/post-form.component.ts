import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../data.service';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  postForm: FormGroup;

  constructor(private fb: FormBuilder, private data: DataService) { }

  ngOnInit() {
    this.postForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      post: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  handleSubmit() {
    console.log(this.postForm.value);
  }

  getData() {
    Observable
      .forkJoin(this.data.getUser(1), this.data.getPosts(1))
      .subscribe(([user, posts]) => {
        this.postForm.controls['name'].setValue(user.name);
        this.postForm.controls['email'].setValue(user.email);
        this.postForm.controls['post'].setValue(posts[0].body);
      });
  }
}
