import React from "react";
import Head from "next/head";
import Link from "next/link";

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
};
const Layout: React.FC<LayoutProps> = ({title = 'Password Manager', children}) => {
  return(
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
      </Head>
      <header className="bg-gray-800 text-white p-4">
        <nav className="container mx-auto px-2 flex justify-between">
          <span className="text-x1"> Password Manager</span>
          <div className="space-x-4">
          <Link href="/" className="hover:text-gray-400">
              Home
          </Link>
          <Link href="/dashboard" className="hover:text-gray-400">
            Dashboard
          </Link>
          <Link href="/auth" className="hover:text-gray-400">
            Login/Sign Up
          </Link>
            
          </div>
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        <p>&copy; {new Date().getFullYear()} Password Manager</p>
      </footer>
    </div>
  );
};
export default Layout;