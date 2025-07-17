import prisma from "@/lib/prisma";
import AuthButton from "@/components/ui/auth-button";
import SignOutButton from "@/components/ui/signout-button";

export default async function Home() {
  return (
    <div className="">
      <AuthButton/>
    </div>
  );
}
