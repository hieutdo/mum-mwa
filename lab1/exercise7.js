Array.prototype.bubbleSort = function () {
  const arr = this;
  const length = arr.length;
  let swapped;

  do {
    swapped = false;
    for (let i = 0; i < length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        const tmp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = tmp;
        swapped = true;
      }

    }
  } while (swapped);

  return arr;
};

console.log([6, 4, 0, 3, -2, 1].bubbleSort());