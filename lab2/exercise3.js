function slow(callback) {
  for (let i = 0; i <= 1000; i++) { }

  if (Math.random() > 0.5) {
    setImmediate(callback, 'Error', null);
  } else {
    setImmediate(callback, null, { id: 12345 });
  }
}

function exec(fn) {
  let doneCb, failCb;

  setImmediate(fn, function (error, data) {
    if (error) {
      failCb(error);
    } else {
      doneCb(data);
    }
  });

  return {
    done: function (cb) {
      doneCb = cb;
      return this;
    },
    fail: function (cb) {
      failCb = cb;
      return this;
    },
  };
}

exec(slow)
  .done(function (data) { console.log(data); })
  .fail(function (error) { console.log(`Error: ${error}`); });