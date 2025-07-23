import AuthButton from "./auth-button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import SignOutButton from "./signout-button";

export default async function Navbar() {
      const session = await getServerSession(authOptions);
      const user = session?.user;
      const upper = user?.email?.toUpperCase() || "Guest";

      return (
      <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-white text-2xl"><a href="/">Cube Log</a></h1>
              <div className="flex space-x-4">
              </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={user.image || ''} alt={user.name || 'User Avatar'} />
                                <AvatarFallback>{upper.charAt(0)}</AvatarFallback>
                              </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-70" align="end">
                        <div className="flex flex-col items-center">
                          <DropdownMenuItem>
                              {user.email || 'User'}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center">
                          <SignOutButton />
                        </DropdownMenuItem>
                        </div>
                        </DropdownMenuContent>
                  </DropdownMenu>

                </>
              ) : (
                <span className="text-white"></span>
              )}
              </div>
            </div>
      </nav>
      );
}