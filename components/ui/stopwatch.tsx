'use client';

import { useEffect, useRef, useState } from 'react';

export default function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleStartStop();
      } else if (e.key === 'r' || e.key === 'R') {
        handleReset();
      } else if (e.key === 's' || e.key === 'S') {
        handleAddSolve();
      }
      
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRunning]);

  const handleStartStop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current!);
      intervalRef.current = null;
      setIsRunning(false);
    } else {
      const now = Date.now();
      startTimeRef.current = now;
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current!);
      }, 10);
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    clearInterval(intervalRef.current!);
    intervalRef.current = null;
    setElapsedTime(0);
    setIsRunning(false);
    startTimeRef.current = null;
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = Math.floor((ms % 1000) / 10);
    const format = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0'
    )}.${String(centiseconds).padStart(2, '0')}`;
    return format;
  };


const handleKeySave = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 's' || e.key === 'S') {
            e.preventDefault();
            console.log(formatTime(elapsedTime));
      }
};

    const handleAddSolve = async () => {
      const id = Math.floor(1000 + Math.random() * 9000);
      const time = formatTime(elapsedTime);
      await console.log(time);
      handleReset(); 
    };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold mb-6">{formatTime(elapsedTime)}</h1>
      <div className="flex space-x-4">
        <button
          onClick={handleStartStop}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {isRunning ? 'Stop' : 'Start'} (Space)
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          Reset (R)
        </button>
            <button
            onKeyDown={handleKeySave}
          onClick={() => handleAddSolve()}
          className="px-6 py-2 bg-green-500 text-white rounded hover:bg-gray-600 transition"
        >
          Save (S)
        </button>
      </div>
    </div>
  );
}