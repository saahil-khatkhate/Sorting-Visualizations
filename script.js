//initialization

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const iw = window.innerWidth;
const ih = window.innerHeight;

canvas.width = iw;
canvas.height = ih;

const size = 50;
const swapDelay = 5;

let nums;

const init = () => {
  nums = Array(size);
  for (let i = 0; i < size; i++) {
    nums[i] = Math.floor(Math.random() * ih);
  }
};

const draw = () => {
    c.fillStyle = 'black';
    c.fillRect(0, 0, iw, ih);
    c.fillStyle = 'white';
    for (let i = 0; i < size; i++) {
        c.fillRect(iw/size * i, ih - nums[i], iw/size, nums[i]);
    }
  };

const wait = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

const swap = async (a, b) => {
  let temp = nums[a];
  nums[a] = nums[b];
  nums[b] = temp;
  await wait(swapDelay);
  draw();
}

//selection sort

const findMin = (start, end) => {
  let min = start;
  for (let i = start + 1; i <= end; i++) {
    if (nums[i] < nums[min]) min = i;
  }
  return min;
}

const selectionSort = async () => {
  for (let i = 0; i < size; i++) {
    await swap(i, findMin(i, size-1));
  }
};

//insertion sort

const insertItem = async (startIndex, endIndex) => {
  let current = endIndex;
  let finished = false;
  let isMore = true;
  while (isMore && !finished) {
    if (nums[current] < nums[current - 1]) {
      await swap(current, current-1);
      current--;
      isMore = current != startIndex;
    } else finished = true;
  }
};

const insertionSort = async () => {
  for (let i = 0; i < size; i++) {
    await insertItem(0, i);
  }
};

//bubble sort

const bubbleUp = async (startIndex, endIndex) => {
  for (let i = endIndex; i > startIndex; i--) {
    if (nums[i] < nums[i-1]) await swap(i, i-1);
  }
};

const bubbleSort = async () => {
  for (let i = 0; i < size; i++) {
    await bubbleUp(i, size-1);
  }
};

//quick sort

const split = async (from, to) => {
  let pivot = from;
  let first = from;
  let last = to;
  while (first < last) {
    first++;
    while (first < size && nums[first] <= nums[pivot]) first++;
    while (nums[last] > nums[pivot]) last--;
    if (first < last) await swap(first, last);
  }
  await swap(pivot, last);
  return last;
};

const quickSort = async (from, to) => {
  if (from < to) {
    let p = await split(from, to);
    await Promise.all([
      quickSort(from, p-1),
      quickSort(p+1, to)
    ]);
  }
};

init();
draw();
// selectionSort();
// insertionSort();
// bubbleSort();
// quickSort(0, size-1);