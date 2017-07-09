"use strict";
var Person = (function () {
    function Person(firstName) {
        this.firstName = firstName;
    }
    Object.defineProperty(Person.prototype, "firstName", {
        get: function () {
            return this._firstName;
        },
        set: function (val) {
            this._firstName = val.toUpperCase();
        },
        enumerable: true,
        configurable: true
    });
    return Person;
}());
var person = new Person('Hieu Do');
console.log(person.firstName);
//# sourceMappingURL=exercise4.js.map