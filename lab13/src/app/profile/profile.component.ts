import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../db.service';
import { Student } from '../student';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  student: Student;

  constructor(private route: ActivatedRoute, private db: DbService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const studentId = params['id'];
      this.db.getStudent(studentId).subscribe((student) => {
        this.student = student;
      });
    });
  }
}
