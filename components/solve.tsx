'use client';

import { useState, useEffect } from 'react';

type SolveProps = {
  id: string;
  time: string;
  createdAt: string;
  onDelete: (id: string) => void;
};

export default function Solve({ id, time, createdAt, onDelete }: SolveProps) {
  const [loading, setLoading] = useState(false);
  const [solves, setSolves] = useState<SolveProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const handleDelete = () => {
    setLoading(true);
    setError(null);
    onDelete(id); 
  };


  return (
    <div className="bg-gray-100 p-4 rounded-lg flex justify-between items-center w-64 shadow hover:shadow-md">
      <div>
        <p className="font-mono">{time}</p>
      </div>
      <button
        onClick={handleDelete}
        className="bg-red-500 p-2 rounded text-white hover:bg-red-600">
        Delete
      </button>
    </div>
  );
}
