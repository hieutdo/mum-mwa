import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';
import { Student } from 'app/student';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: Student[];

  constructor(private db: DbService) { }

  ngOnInit() {
    this.db.getData().subscribe((students) => {
      this.students = students;
    });
  }

}
