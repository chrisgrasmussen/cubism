import prisma from "@/lib/prisma";
import AuthButton from "@/components/ui/auth-button";

export default async function Home() {
  return (
    <div className="">
      <AuthButton/>
    </div>
  );
}
