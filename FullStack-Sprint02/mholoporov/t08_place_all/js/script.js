function sortEvenOdd(arr) {
    let sorted = false;

    while (!sorted) {
        sorted = true;
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] % 2 !== 0 && arr[i + 1] % 2 === 0) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                sorted = false;
            } else if (arr[i] % 2 === 0 && arr[i + 1] % 2 === 0 && arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                sorted = false;
            } else if (arr[i] % 2 !== 0 && arr[i + 1] % 2 !== 0 && arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                sorted = false;
            }
        }
    }
}

const arr = [6, 2, 15, 5, 1, 3, 8, 1, 8, 10, 7, 11];
sortEvenOdd(arr);
console.log(arr); // (12) [2, 6, 8, 8, 10, 1, 1, 3, 5, 7, 11, 15]