
import Stopwatch from "@/components/stopwatch";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getCurrentUser, getUserId } from "@/actions/actions";
import SolveListPage from "@/components/solve-list";

export default async function Home() {
  const user = await getCurrentUser();
    console.log("Dashboard user:", user);
    if (!user) {
      redirect("/login");
    }
    const userId = await getUserId(user.email);
    if (!userId) {
      redirect("/login");
    }
    
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
      <Stopwatch />
      <p>Hello {user.name || "Friend"}</p>
      <p>Welcome to Cube Log</p>
      <p>Your user ID is: {user?.id || "Not logged in"}</p>
      <p>Your email is: {user?.email || "Not logged in"}</p>
      <SolveListPage />
    </div>
  );
}
