import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbService } from '../db.service';
import { Student } from '../student';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  student: Student;

  constructor(private route: ActivatedRoute, private db: DbService) {
    route.params.subscribe(params => {
      const studentId = params['id'];
      db.getStudent(studentId).then((student: Student) => {
        this.student = student;
      });
    });
  }
}
