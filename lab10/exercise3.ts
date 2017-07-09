class Shape {
  width = 0;
  length = 0;
}

class Rectangle extends Shape {
  constructor(width: number, length: number) {
    super();
    this.width = width;
    this.length = length;
  }

  calcSize() {
    return this.width * this.length;
  }
}

const rectangle = new Rectangle(5, 2);
console.log(rectangle.calcSize());