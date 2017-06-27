function slow(callback) {
  setImmediate(function () {
    if (Math.random() > 0.5) {
      return callback('Error', null);
    }
    callback(null, { id: 12345 });
  });
  for (let i = 0; i <= 1000; i++) { }
}

function exec(fn) {
  let doneCb, failCb;

  setImmediate(function () {
    fn(function (error, data) {
      if (error) {
        failCb(error);
      } else {
        doneCb(data);
      }
    });
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