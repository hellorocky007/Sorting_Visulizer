import React, { useEffect, useState } from 'react';
import { delay } from '../delay'; // Adjust the path as necessary

const countingSort = async (arr, speed, setSortedArray) => {
  const n = arr.length;
  const max = Math.max(...arr);
  const count = new Array(max + 1).fill(0);
  const output = new Array(n);

  for (let i = 0; i < n; i++) {
    count[arr[i]]++;
  }

  for (let i = 1; i <= max; i++) {
    count[i] += count[i - 1];
  }

  for (let i = n - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
    setSortedArray([...arr]);
    await delay(speed);
  }

  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
};

const CountingSort = ({ array, speed, onComplete }) => {
  const [sortedArray, setSortedArray] = useState(array);

  useEffect(() => {
    const performCountingSort = async () => {
      let arr = [...array];
      await countingSort(arr, speed, setSortedArray);
      await delay(3000); // Wait 3 seconds after sorting
      onComplete();
    };
    performCountingSort();
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

export default CountingSort;
