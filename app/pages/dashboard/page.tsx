import AuthButton from "@/components/auth-button";
import { getCurrentUser, getUserId } from "@/actions/actions";
import { getSolves } from "@/actions/actions";
import Stopwatch from "@/components/stopwatch";
import { SolveList } from "@/components/solve-list";
import { redirect } from "next/navigation";

export default async function Dashboard() {

  // Fetch the current user
  const user = await getCurrentUser();
  console.log("Dashboard user:", user);
  if (!user) {
    redirect("/login");
  }
  const userId = await getUserId(user.email);
  if (!userId) {
    redirect("/login");
  }
  const solves = await getSolves(userId);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
      <Stopwatch />
      <p>Hello {user.name || "Friend"}</p>
      <p>Welcome to Cube Log</p>
      <p>Your user ID is: {user?.id || "Not logged in"}</p>
      <p>Your email is: {user?.email || "Not logged in"}</p>
    </div>
  );
}