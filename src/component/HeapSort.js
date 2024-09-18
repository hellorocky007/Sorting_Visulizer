import React, { useEffect, useState } from 'react';
import { delay } from '../delay'; // Adjust the path as necessary

const heapify = async (arr, n, i, speed, setSortedArray) => {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]]; // Swap
    setSortedArray([...arr]);
    await delay(speed);
    await heapify(arr, n, largest, speed, setSortedArray);
  }
};

const heapSort = async (arr, speed, setSortedArray) => {
  const n = arr.length;
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(arr, n, i, speed, setSortedArray);
  }
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]]; // Swap
    setSortedArray([...arr]);
    await delay(speed);
    await heapify(arr, i, 0, speed, setSortedArray);
  }
};

const HeapSort = ({ array, speed, onComplete }) => {
  const [sortedArray, setSortedArray] = useState(array);

  useEffect(() => {
    const performHeapSort = async () => {
      let arr = [...array];
      await heapSort(arr, speed, setSortedArray);
      await delay(3000); // Wait 3 seconds after sorting
      onComplete();
    };
    performHeapSort();
  }, [array, speed, onComplete]);

  return (
    <div className="array-container">
      {sortedArray.map((value, index) => (
        <div
          key={index}
          className="array-bar"
          style={{
            height: `${value * 25}px`,
            maxHeight:'100vh',
            width: '50px',
          }}
        >
          <span className="array-bar-label">{value}</span>
        </div>
      ))}
    </div>
  );
};

export default HeapSort;
