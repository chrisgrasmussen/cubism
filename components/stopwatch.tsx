// components/Stopwatch.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { addSolve } from '@/actions/actions';
import {useRouter} from 'next/navigation';

export default function Stopwatch() {
  const router = useRouter();
  const [time, setTime] = useState(0); // time in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [hasStopped, setHasStopped] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Format time as mm:ss.SS
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

  // Start or stop on spacebar, reset with R, save with S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault(); // prevent page scroll
        if (!isRunning && !hasStopped) {
          setIsRunning(true);
          intervalRef.current = setInterval(() => {
            setTime((prev) => prev + 10);
          }, 10);
        } else if (isRunning) {
          setIsRunning(false);
          setHasStopped(true);
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      }

      if (hasStopped && !isRunning) {
        if (e.key.toLowerCase() === 'r') {
          setTime(0);
          setHasStopped(false);
        }

        if (e.key.toLowerCase() === 's') {
          saveSolve();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRunning, hasStopped]);

  // Save solve to DB
  const saveSolve = async () => {
    const formatted = formatTime(time);
    const res = await fetch('/api/solves/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ time: formatted }),
    });
    router.refresh();

    if (res.ok) {
      setTime(0);
      setHasStopped(false);
    } else {
      alert('You must be logged in to save solves.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 border rounded-lg w-fit mx-auto">
      <h2 className="text-4xl font-bold">{formatTime(time)}</h2>
      <p className="text-gray-500 text-sm text-center">
        Press <kbd className="font-mono">Space</kbd> to {isRunning ? 'stop' : hasStopped ? 'reset/save' : 'start'}.
        <br />
        After stopping: <kbd className="font-mono">R</kbd> = Reset, <kbd className="font-mono">S</kbd> = Save
      </p>
    </div>
  );
}
