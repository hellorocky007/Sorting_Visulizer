import React, { useEffect, useState } from 'react';
import { delay } from '../delay'; // Adjust the path as necessary

const merge = async (arr, left, mid, right, speed, setSortedArray) => {
  let temp = [];
  let i = left, j = mid + 1;
  while (i <= mid && j <= right) {
    if (arr[i] <= arr[j]) {
      temp.push(arr[i++]);
    } else {
      temp.push(arr[j++]);
    }
    setSortedArray([...arr]);
    await delay(speed);
  }
  while (i <= mid) temp.push(arr[i++]);
  while (j <= right) temp.push(arr[j++]);
  for (let k = left; k <= right; k++) arr[k] = temp[k - left];
  setSortedArray([...arr]);
};

const mergeSort = async (arr, left, right, speed, setSortedArray) => {
  if (left < right) {
    let mid = Math.floor((left + right) / 2);
    await mergeSort(arr, left, mid, speed, setSortedArray);
    await mergeSort(arr, mid + 1, right, speed, setSortedArray);
    await merge(arr, left, mid, right, speed, setSortedArray);
  }
};

const MergeSort = ({ array, speed, onComplete }) => {
  const [sortedArray, setSortedArray] = useState(array);

  useEffect(() => {
    const performMergeSort = async () => {
      let arr = [...array];
      await mergeSort(arr, 0, arr.length - 1, speed, setSortedArray);
      await delay(3000); // Wait 3 seconds after sorting
      onComplete();
    };
    performMergeSort();
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

export default MergeSort;
