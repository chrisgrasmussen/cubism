'use client';

import { useRouter } from 'next/navigation';
import Solve from '@/components/solve';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import solve from '@/components/solve';

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
      console.log('Delete response body:', text);
      if (!res.ok) throw new Error('Failed to delete solve');
      router.refresh(); // Refresh to update list
    } catch (err) {
      console.error('Error deleting solve:', err);
    }
  };

return (
  <div className="max-h-[300px] min-w-[500px] overflow-y-auto border rounded-md">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left pl-10 bg-blue-100">Time</TableHead>
          <TableHead className="text-right pr-10 bg-red-100">Actions</TableHead>
        </TableRow>
      </TableHeader>
<TableBody>
      {solves.length > 0 ? (
        solves.map((solve) => (
          <TableRow key={solve.id}>
            <TableCell className="text-left pl-10">{solve.time}</TableCell>
            <TableCell className="text-right pr-10">
              <button
                onClick={() => handleDelete(solve.id)}
                className="bg-red-500 text-white px-2 py-1 cursor-pointer rounded-md"
              >
                Delete
              </button>
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={2} className="text-center py-4 text-gray-500">
            No solves found.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
    </Table>
  </div>
);
}
