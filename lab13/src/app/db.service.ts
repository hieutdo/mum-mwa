import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Student } from './student';
import faker from 'faker';

@Injectable()
export class DbService {
  private delay = 1000;
  private data: Student[];

  constructor() {
    this.data = [...Array(100)].fill(1).map((_, i) => new Student(
      i + 1,
      faker.random.number() + '',
      faker.name.findName(),
      faker.internet.email()
    ));
  }

  getData(): Observable<Student[]> {
    return Observable.of(this.data).delay(this.delay);
  }

  getStudent(studentId: string): Observable<Student> {
    const student = this.data.find((item) => item.studentId === studentId);
    return Observable.of(student).delay(this.delay);
  }
}
