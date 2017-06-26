String.prototype.filter = function (words) {
  let result = this;
  for (let word of words) {
    result = result.replace(word, '***');
  }
  return result;
};

console.log('This house is nice!'.filter(['house', 'nice']));