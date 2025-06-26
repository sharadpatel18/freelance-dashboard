import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-xl font-bold">
            Freelance Dashboard
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/tasks" className="hover:text-blue-300">
              My Tasks
            </Link>
            <Link href="/projects" className="hover:text-blue-300">
              Projects
            </Link>
            <Link href="/clients" className="hover:text-blue-300">
              Clients
            </Link>
            <Link href="/analytics" className="hover:text-blue-300">
              Analytics
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </nav>
  );
}