"use strict";
var Car = (function () {
    function Car(name) {
        this.name = name;
        this.acceleration = 0;
    }
    Car.prototype.honk = function () {
        console.log(this.name + " is saying: tooooooot!");
    };
    Car.prototype.accelerate = function (speed) {
        this.acceleration = this.acceleration + speed;
    };
    return Car;
}());
var car = new Car('BMW');
car.honk();
console.log(car.acceleration);
car.accelerate(60);
console.log(car.acceleration);
//# sourceMappingURL=exercise2.js.map