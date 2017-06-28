const EventEmitter = require('events');

class Clock extends EventEmitter {
  constructor() {
    super();

    setInterval(() => {
      this.emit('tick');
    }, 1000);
  }
}

const clock = new Clock();

clock.on('tick', () => {
  console.log('woohoo');
});