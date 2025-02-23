"use client";
import { useSession,signOut  } from "next-auth/react";

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
const NavLink = ({ href, children }) => (
  <Link
    href={href}
    className="text-black hover:bg-black hover:rounded-full hover:text-white px-3 py-2 rounded-full text-sm font-medium transition-all duration-200"
  >
    {children}
  </Link>
)

const MobileNavLink = ({ href, children }) => (
  <Link
    href={href}
    className="text-black hover:bg-white hover:text-black block px-3 py-2 rounded-md text-base font-medium transition-all duration-200"
  >
    {children}
  </Link>
)

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <p>Loading...</p>; // Handle loading state
  }
  console.log("Data as s: ", session);

  return (
    <nav className="fixed top-4 left-4 right-4 z-50 ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <div className="backdrop-blur-md bg-white/50 rounded-full border hover:shadow transition-all">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <Image
                src="/daffodil-logo.png"
                alt="University Logo"
                width={40}
                height={40}
                className="mr-3"
                priority
              />
              <span className="text-xl font-semibold text-gray-800">UniTask</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/tasks">Tasks</NavLink>
                <NavLink href="/calendar">Calendar</NavLink>
                <NavLink href="/messages">Messages</NavLink>
              </div>
            </div>
            <div className="hidden md:block">
              {session ? (
                <button onClick={() => signOut()} className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors duration-200">
                  Logout
                </button>
              ) : (
                <Link href={"/login"} className="bg-primary px-4 py-2 rounded-full hover:bg-black hover:text-white transition-colors duration-200">
                  Login
                </Link>
              )}

            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="backdrop-blur-md text-black bg-white/30 px-2 pt-2 pb-3 space-y-1 sm:px-3 mt-2 rounded-2xl shadow-lg">
            <MobileNavLink href="/">Home</MobileNavLink>
            <MobileNavLink href="/tasks">Tasks</MobileNavLink>
            <MobileNavLink href="/calendar">Calendar</MobileNavLink>
            <MobileNavLink href="/messages">Messages</MobileNavLink>
            <MobileNavLink href="/profile">Profile</MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

