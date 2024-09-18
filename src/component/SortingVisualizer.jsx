import React, { useState } from 'react';
import BubbleSort from './BubbleSort';
import SelectionSort from './SelectionSort';
import InsertionSort from './InsertionSort';
import MergeSort from './MergeSort';
import QuickSort from './QuickSort';
import HeapSort from './HeapSort';
import RadixSort from './RadixSort';
import CountingSort from './CountingSort';
import './SortingVisualizer.css';

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [originalArray, setOriginalArray] = useState([]);
  const [algorithm, setAlgorithm] = useState('bubble-sort');
  const [speed, setSpeed] = useState(500);
  const [isSorting, setIsSorting] = useState(false);

  const handleArrayChange = (e) => {
    const value = e.target.value.split(',').map(num => parseInt(num.trim(), 10)).filter(num => !isNaN(num));
    setArray(value);
    setOriginalArray([...value]); // Save the original array
  };

  const updateSpeed = (change) => {
    setSpeed((prevSpeed) => Math.max(3000, prevSpeed + change)); // Min speed 10ms
  };

  const handleSort = () => {
    setIsSorting(true);
    setArray([...array]); // Trigger the sort
  };

  const handleReset = () => {
    setArray([...originalArray]); // Reset to original array
  };

  const renderAlgorithm = () => {
    switch (algorithm) {
      case 'bubble-sort':
        return <BubbleSort array={array} speed={speed} onComplete={() => setIsSorting(false)} />;
      case 'selection-sort':
        return <SelectionSort array={array} speed={speed} onComplete={() => setIsSorting(false)} />;
      case 'insertion-sort':
        return <InsertionSort array={array} speed={speed} onComplete={() => setIsSorting(false)} />;
      case 'merge-sort':
        return <MergeSort array={array} speed={speed} onComplete={() => setIsSorting(false)} />;
      case 'quick-sort':
        return <QuickSort array={array} speed={speed} onComplete={() => setIsSorting(false)} />;
      case 'heap-sort':
        return <HeapSort array={array} speed={speed} onComplete={() => setIsSorting(false)} />;
      case 'radix-sort':
        return <RadixSort array={array} speed={speed} onComplete={() => setIsSorting(false)} />;
      case 'counting-sort':
        return <CountingSort array={array} speed={speed} onComplete={() => setIsSorting(false)} />;
      default:
        return null;
    }
  };

  return (
    <div className="sorting-visualizer">
      <h1>Sorting Visualizer</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Enter array elements separated by commas"
          onChange={handleArrayChange}
        />
        <select onChange={(e) => setAlgorithm(e.target.value)}>
          <option value="bubble-sort">Bubble Sort</option>
          <option value="selection-sort">Selection Sort</option>
          <option value="insertion-sort">Insertion Sort</option>
          <option value="merge-sort">Merge Sort</option>
          <option value="quick-sort">Quick Sort</option>
          <option value="heap-sort">Heap Sort</option>
          <option value="radix-sort">Radix Sort</option>
          <option value="counting-sort">Counting Sort</option>
        </select>
        <button onClick={handleSort} disabled={isSorting}>Sort</button>
        <button onClick={handleReset} disabled={isSorting}>Reset</button>
        <div className="speed-controls">
          <button onClick={() => updateSpeed(-10)}>Decrease Speed</button>
          <span>Speed: {speed} ms</span>
          <button onClick={() => updateSpeed(10)}>Increase Speed</button>
        </div>
      </div>
      <div className="array-container">
        {renderAlgorithm()}
      </div>
    </div>
  );
};

export default SortingVisualizer;
