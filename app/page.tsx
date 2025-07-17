import prisma from "@/lib/prisma";
import AuthButton from "@/components/ui/auth-button";
import Stopwatch from "@/components/ui/stopwatch";

export default async function Home() {

  return (
    <div className="">
      <AuthButton/>
      <Stopwatch/>
    </div>
  );
}
