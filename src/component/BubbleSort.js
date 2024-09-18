import React, { useEffect, useState } from 'react';
import { delay } from '../delay'; // Adjust the path as necessary

const BubbleSort = ({ array, speed, onComplete }) => {
  const [sortedArray, setSortedArray] = useState(array);

  useEffect(() => {
    // Ensure sorting runs only if array is not empty
    if (array.length > 0) {
      const bubbleSort = async () => {
        let arr = [...array];
        for (let i = 0; i < arr.length - 1; i++) {
          for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
              [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Swap
              setSortedArray([...arr]);
              await delay(speed);
            }
          }
        }
        // Ensure the final sorted array is displayed before waiting
        setSortedArray([...arr]);
        await delay(3000); // Wait 3 seconds after sorting to observe the result
        if (onComplete) {
          onComplete();
        }
      };
      bubbleSort();
    }
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
            margin: '0 2px',
            backgroundColor: 'red',
            display: 'inline-block',
            position: 'relative',
          }}
        >
          <span className="array-bar-label">{value}</span>
        </div>
      ))}
    </div>
  );
};

export default BubbleSort;
