'use client';

import { useSession } from 'next-auth/react';
import { useTransition } from 'react';

export function SolveList({ solves }: { solves: { id: number; time: string }[] }) {
  const [isPending, startTransition] = useTransition();

  async function handleDelete(solveId: number) {
    startTransition(async () => {
      const res = await fetch('/api/solves/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ solveId }),
      });

      if (res.ok) {
        // Optionally refresh the page or re-fetch solves
        window.location.reload(); // OR revalidatePath on the server
      } else {
        console.error('Failed to delete');
      }
    });
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {solves.map((solve) => (
        <div key={solve.id} className="bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md flex items-center justify-between w-64">
          <p>{solve.time}</p>
          <button
            disabled={isPending}
            onClick={() => handleDelete(solve.id)}
            className="bg-red-500 rounded-lg p-2 hover:shadow-md text-white cursor-pointer"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
