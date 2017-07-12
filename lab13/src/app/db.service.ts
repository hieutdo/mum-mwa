import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Student } from './student';

@Injectable()
export class DbService {
  data = [{
    "id": 1,
    "studentId": "294-43-1911",
    "name": "Rhys Shimmin",
    "email": "rshimmin0@booking.com"
  }, {
    "id": 2,
    "studentId": "972-37-2291",
    "name": "Gipsy Simionescu",
    "email": "gsimionescu1@economist.com"
  }, {
    "id": 3,
    "studentId": "843-81-8008",
    "name": "Olympia Borrie",
    "email": "oborrie2@scientificamerican.com"
  }, {
    "id": 4,
    "studentId": "185-75-1990",
    "name": "Simona Croughan",
    "email": "scroughan3@bbc.co.uk"
  }, {
    "id": 5,
    "studentId": "953-68-4973",
    "name": "Maitilde Coode",
    "email": "mcoode4@rakuten.co.jp"
  }, {
    "id": 6,
    "studentId": "223-16-5638",
    "name": "Hillard Wayman",
    "email": "hwayman5@latimes.com"
  }, {
    "id": 7,
    "studentId": "218-70-4681",
    "name": "Xaviera Kittel",
    "email": "xkittel6@walmart.com"
  }, {
    "id": 8,
    "studentId": "469-00-6559",
    "name": "Waldo Gotthard.sf",
    "email": "wgotthardsf7@soundcloud.com"
  }, {
    "id": 9,
    "studentId": "100-61-1835",
    "name": "Nady Andrus",
    "email": "nandrus8@pcworld.com"
  }, {
    "id": 10,
    "studentId": "489-87-6987",
    "name": "Matilde Ivins",
    "email": "mivins9@google.com.hk"
  }];

  getData(): Observable<Student[]> {
    return Observable.of(this.data).delay(2000);
  }

  getStudent(studentId: string): Observable<Student> {
    const student = this.data.find((item) => item.studentId === studentId);
    return Observable.of(student).delay(2000);
  }
}
