
import Stopwatch from "@/components/stopwatch";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getCurrentUser, getUserId } from "@/actions/actions";
import SolveListPage from "@/components/solve-list";
import { Separator } from "@/components/ui/separator"

export default async function Home() {
  const user = await getCurrentUser();
    if (!user) {
      redirect("/login");
    }
    const userId = await getUserId(user.email);
    if (!userId) {
      redirect("/login");
    }
    
  
  return (
    <div className="flex flex-col items-center justify-center max-h-screen p-4 space-y-4">
      <div className="flex flex-col items-center">
        <Separator className="my-10 w-full" />
      </div>
      <div>
            <Stopwatch />
      </div>
      <Separator className="my-10 w-full" />
      <div className="flex flex-col items-center w-full max-w-2xl">
              <SolveListPage />
      </div>
    </div>
  );
}
