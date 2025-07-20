'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import SignOutButton from "./signout-button";

export default function AuthButton(){
      const {data: session, status} = useSession();

      if (status === "loading") {
            return <button className="bg-blue-500 p-2 rounded-xl text-white" disabled>Loading</button>;
      } if (session) {
            return <SignOutButton/>
      }

      return <button onClick={()=> signIn('github')} className="cursor-pointer bg-blue-200 p-2 rounded-xl">Sign In</button>;
}