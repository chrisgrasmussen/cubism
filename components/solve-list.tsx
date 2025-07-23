import { fetchSolves } from '@/actions/actions';
import SolveClient from '@/components/solve-client';

export default async function SolveListPage() {
  const solves = await fetchSolves();
  return <SolveClient solves={solves} />;
}