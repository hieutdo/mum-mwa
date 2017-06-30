const os = require('os');
const Rx = require('@reactivex/rxjs');
const MIN_RAM = 2 * 1024 * 1024 * 1024;

function checkSystem() {
  console.log('Checking your system...');
  if (os.totalmem() < MIN_RAM) {
    console.log('This app needs at least 2 GB of RAM');
    return;
  }
  if (os.cpus().length < 2) {
    console.log('Processor is not supported');
    return;
  }
  console.log('System is checked successfully.');
}

function checkSystemObservable() {
  const myObservable = new Rx.BehaviorSubject('Checking your system...');
  myObservable.subscribe(
    msg => console.log(msg),
    err => console.log(err),
  );
  if (os.totalmem() < MIN_RAM) {
    myObservable.error('This app needs at least 2 GB of RAM');
  }
  if (os.cpus().length < 2) {
    myObservable.error('Processor is not supported');
  }
  myObservable.next('System is checked successfully');
}

checkSystemObservable();