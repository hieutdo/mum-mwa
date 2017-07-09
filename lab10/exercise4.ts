class Person {
  private _firstName: string;

  constructor(firstName: string) {
    this.firstName = firstName;
  }

  get firstName() {
    return this._firstName;
  }

  set firstName(val: string) {
    this._firstName = val.toUpperCase();
  }
}

const person = new Person('Hieu Do');
console.log(person.firstName);