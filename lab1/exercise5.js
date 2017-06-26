function Person(name) {
  this.name = name;
}

Person.prototype.teach = function (subject) {
  console.log(`${this.name} is now teaching ${subject}`);
};

const TeacherA = new Person('TeacherA');
const TeacherB = new Person('TeacherB');

TeacherA.teach('Angular');
TeacherB.teach('Node');