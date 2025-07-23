'use client'

import { useSession, signIn, signOut } from "next-auth/react"

export default function SignOutButton(){
      return <button onClick={()=> signOut()} className="cursor-pointer bg-red-200 p-2 px-10 rounded-xl">Log Out</button>;
}