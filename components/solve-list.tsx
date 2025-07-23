'use client';

import { useState, useEffect } from 'react';
import Solve from '@/components/solve'; // if using absolute path
import { useRouter } from 'next/navigation';


type SolveType = {
  id: string;
  time: string;
  createdAt: string;
};

export function SolveList() {
  const [solves, setSolves] = useState<SolveType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchSolves = async () => {
    try {
      const res = await fetch('/api/solves/get');
      if (!res.ok) throw new Error('Failed to fetch solves');
      const data = await res.json();
      setSolves(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSolves();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch('/api/solves/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ solveId: id }),
      });
      if (!res.ok) throw new Error('Failed to delete solve');
      setSolves((prev) => prev.filter((solve) => solve.id !== id));
    } catch (err) {
      alert('Error deleting solve');
      console.error(err);
    }
  };

  if (loading) return <p>Loading solves...</p>;
  if (solves.length === 0) return <p>No solves found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {solves.map((solve) => (
        <Solve key={solve.id} {...solve} onDelete={handleDelete} />
      ))}
    </div>
  );
}
