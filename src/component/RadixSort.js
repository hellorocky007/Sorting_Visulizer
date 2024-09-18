import React, { useEffect, useState } from 'react';
import { delay } from '../delay'; // Ensure this path is correct

const countingSortForRadix = async (arr, exp, speed, setSortedArray) => {
  const n = arr.length;
  const output = new Array(n);
  const count = new Array(10).fill(0);

  // Count occurrences of each digit
  for (let i = 0; i < n; i++) {
    count[Math.floor(arr[i] / exp) % 10]++;
  }

  // Calculate cumulative count
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  // Build the output array
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
    setSortedArray([...arr]); // Update sorted array display
    await delay(speed);
  }

  // Copy the output array to arr
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
};

const radixSort = async (arr, speed, setSortedArray) => {
  const max = Math.max(...arr);
  let exp = 1;
  
  while (Math.floor(max / exp) > 0) {
    await countingSortForRadix(arr, exp, speed, setSortedArray);
    exp *= 10;
  }
};

const RadixSort = ({ array, speed, onComplete }) => {
  const [sortedArray, setSortedArray] = useState(array);

  useEffect(() => {
    const performRadixSort = async () => {
      let arr = [...array];
      await radixSort(arr, speed, setSortedArray);
      await delay(3000); // Wait 3 seconds after sorting
      onComplete();
    };
    performRadixSort();
  }, [array, speed, onComplete]);

  return (
    <div className="array-container">
      {sortedArray.map((value, index) => (
        <div
          key={index}
          className="array-bar"
          style={{
            height: `${value * 10}px`,
            width: '50px',
            margin: '0 2px',
            display: 'inline-block',
            backgroundColor: 'red', // Change as needed
            position: 'relative',
          }}
        >
          <span className="array-bar-label">{value}</span>
        </div>
      ))}
    </div>
  );
};

export default RadixSort;
