import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';
import { Student } from 'app/student';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students$: Observable<Student[]>;

  constructor(private db: DbService) { }

  ngOnInit() {
    this.students$ = this.db.getData();
  }

}
