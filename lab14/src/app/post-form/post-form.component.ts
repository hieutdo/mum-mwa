import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  postForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.postForm = fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      post: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {
  }

  handleSubmit() {
    console.log(this.postForm.value);
  }

}
