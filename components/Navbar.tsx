// components/Navbar.tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Your Logo
        </Link>

        <div className="space-x-4">
          <Link href="/server-page" className="hover:text-gray-300">
            Server Page
          </Link>
          <Link href="/client-page" className="hover:text-gray-300">
            Client Page
          </Link>
        </div>
      </div>
    </nav>
  );
}
