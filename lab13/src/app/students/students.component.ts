import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: any[];

  constructor(private db: DbService) { }

  ngOnInit() {
    this.db.getData().then((data: any[]) => {
      this.students = data;
    });
  }

}
