const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

const iw = window.innerWidth;
const ih = window.innerHeight;

canvas.width = iw;
canvas.height = ih;

const size = 500;
const barWidth = iw/size;
let nums = Array(size);
for (let i = 0; i < size; i++) {
  nums[i] = Math.floor(Math.random() * ih);
}

const draw = () => {
    c.fillStyle = 'black';
    c.fillRect(0, 0, iw, ih);
    c.fillStyle = 'white';
    for (let i = 0; i < size; i++) {
        c.fillRect(barWidth * i, ih - nums[i], barWidth, nums[i]);
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
  await wait(15);
  draw();
}

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

draw();
selectionSort();