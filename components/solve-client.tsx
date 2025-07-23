// Client Component - SolveClient.tsx
'use client';

import { useRouter } from 'next/navigation';
import Solve from '@/components/solve';

export default function SolveClient({ solves }: { solves: any[] }) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
      try {
        const res = await fetch('/api/solves/delete', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ solveId: id }),
        });
        console.log('Delete response status:', res.status);
      const text = await res.text();
      console.log('Delete response body:', text); // Log the response body for debugging     
        if (!res.ok) throw new Error('Failed to delete solve');
        // Optionally, you can refresh the page or re-fetch solves here
        router.refresh(); // Refresh the page to show updated solves
      } catch (err) {
        console.error('Error deleting solve:', err);
      }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {solves.map((solve) => (
        <Solve key={solve.id} {...solve} onDelete={handleDelete} />
      ))}
    </div>
  );
}
