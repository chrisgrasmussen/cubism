import AuthButton from "./auth-button";

export default function Navbar() {
      return (
      <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-white text-2xl"><a href="/">Cube Log</a></h1>
              <div className="flex space-x-4">
              </div>
              <AuthButton />
            </div>
      </nav>
      );
}