import AuthButton from "@/components/auth-button";
import { getCurrentUser, getUserId } from "@/actions/actions";
import { getSolves } from "@/actions/actions";
import Stopwatch from "@/components/stopwatch";
import { SolveList } from "@/components/solve-list";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const user = await getCurrentUser();
  const solves = user ? await getSolves(user.id) : [];

  if (!user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
      <AuthButton />
      <Stopwatch />
      <h1>Dashboard</h1>
      <p>Hello {user?.name || "User"}! Welcome to your dashboard!</p>
      <p>Your user ID is: {user?.id || "Not logged in"}</p>
      <p>Your email is: {user?.email || "Not logged in"}</p>
      <SolveList solves={solves.map(({ id, time }) => ({ id: Number(id), time: String(time) }))} />
    </div>
  );
}