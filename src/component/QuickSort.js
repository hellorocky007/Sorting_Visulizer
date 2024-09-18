import React, { useEffect, useState } from 'react';
import { delay } from '../delay'; // Adjust the path as necessary

const partition = async (arr, low, high, speed, setSortedArray) => {
  let pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
      setSortedArray([...arr]);
      await delay(speed);
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Swap
  setSortedArray([...arr]);
  await delay(speed);
  return i + 1;
};

const quickSort = async (arr, low, high, speed, setSortedArray) => {
  if (low < high) {
    let pi = await partition(arr, low, high, speed, setSortedArray);
    await quickSort(arr, low, pi - 1, speed, setSortedArray);
    await quickSort(arr, pi + 1, high, speed, setSortedArray);
  }
};

const QuickSort = ({ array, speed, onComplete }) => {
  const [sortedArray, setSortedArray] = useState(array);

  useEffect(() => {
    const performQuickSort = async () => {
      let arr = [...array];
      await quickSort(arr, 0, arr.length - 1, speed, setSortedArray);
      await delay(3000); // Wait 3 seconds after sorting
      onComplete();
    };
    performQuickSort();
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

export default QuickSort;
