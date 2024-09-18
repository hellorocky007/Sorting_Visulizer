import React, { useEffect, useState } from 'react';
import { delay } from '../delay'; // Adjust the path as necessary

const InsertionSort = ({ array, speed, onComplete }) => {
  const [sortedArray, setSortedArray] = useState(array);

  useEffect(() => {
    const insertionSort = async () => {
      let arr = [...array];
      for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
          arr[j + 1] = arr[j];
          j--;
          setSortedArray([...arr]);
          await delay(speed);
        }
        arr[j + 1] = key;
        setSortedArray([...arr]);
        await delay(speed);
      }
      await delay(3000); // Wait 3 seconds after sorting
      onComplete();
    };
    insertionSort();
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

export default InsertionSort;
