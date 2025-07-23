'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';


export default function Stopwatch() {
  const router = useRouter();

  // State to manage stopwatch time and status
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStopped, setHasStopped] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);


const saveSolve = async (time: string) => {
  try {
    const res = await fetch('/api/solves/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ time }),
    });
    
    if (!res.ok) throw new Error('Failed to save solve');

    await res.json(); // optional
    router.refresh(); // Refresh the page to show updated solves
    
  } catch (err) {
    console.error('Error saving solve:', err);
  }
};




  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return; // prevent holding down spacebar
      if (e.code === 'Space') {
        e.preventDefault();

        if (isRunning) {
          // Stop
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setIsRunning(false);
          setHasStopped(true);
        } else {
          // Start
          if (hasStopped) {
            setTime(0); // optional: reset if previously stopped
            setHasStopped(false);
          }

          const interval = setInterval(() => {
            setTime((prev) => prev + 10);
          }, 10);
          intervalRef.current = interval;
          setIsRunning(true);
        }
      } else if (e.key.toLowerCase() === 'r') {
        // Reset
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setTime(0);
        setIsRunning(false);
        setHasStopped(false);


      } else if (e.key.toLowerCase() === 's' && hasStopped) {
        const formattedTime = formatTime(time).toString();
        saveSolve(formattedTime);
        console.log('Solve saved:', formattedTime);
        clearInterval(intervalRef.current!);
        
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isRunning, hasStopped, time]);

  const formatTime = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const centiseconds = Math.floor((ms % 1000) / 10);
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(minutes)}:${pad(seconds)}:${pad(centiseconds)}`;
};

  return (
    <>
        <div className="flex flex-row items-center justify-center gap-4 p-8 border bg-blue-100 rounded-lg w-fit mx-auto">
          <div className="flex flex-col items-center justify-center gap-4 p-8 border bg-yellow-100 rounded-lg w-fit mx-auto">
          <h2 className="text-4xl font-bold">{formatTime(time)}</h2>
          <p className="text-gray-500 text-sm text-center">
            Press <kbd className="font-mono">Space</kbd>to <strong> {isRunning ? 'STOP' : hasStopped ? 'reset/save' : 'START'}.</strong>
            <br />
            After stopping: <kbd className="font-mono"><strong>R</strong></kbd> = Reset, <kbd className="font-mono"><strong>S</strong></kbd> = Save
          </p>
        </div>
        </div>
    </>
  );
}
