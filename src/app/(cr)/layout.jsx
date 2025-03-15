"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Calendar, ChevronDown, LogOut, Menu, Moon, PlusCircle, Settings, Sun, Trash2, User } from 'lucide-react'
import { useSession, signOut } from "next-auth/react";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,

} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const router = useRouter();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  const [isCr, setCr] = useState(false);

  const { data: session, status } = useSession();
  useEffect(() => {
    if(!session){
      router.push("/login");
    }
    if (session?.user?.email) {
      axios.get(`https://os-project-backend.vercel.app/cr?email=${session.user.email}`)
        .then((response) => {
          setCr(response.data.isCr);
          if (!response.data.isCr) {
            router.push("/login"); // ✅ Safe inside `useEffect`
          }
        })
        .catch((error) => {
          console.error("Error fetching classroom data:", error);
          router.push("/login"); // Handle error case
        });
    }
  }, [session, router]);
 

  if (status === "loading") {
    return <p></p>; // Handle loading state
  }

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? "dark" : ""}`}>
      {/* Header */}
      <header className="border-b bg-background">
        <div className="flex h-16 items-center px-4 md:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 py-4">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-lg font-semibold px-4 py-2 rounded-md hover:bg-accent"
                >
                  <Calendar className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/events"
                  className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-accent"
                >
                  <Calendar className="h-5 w-5" />
                  View All Events
                </Link>
                <Link
                  href="/dashboard/events/add"
                  className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-accent"
                >
                  <PlusCircle className="h-5 w-5" />
                  Add Event
                </Link>
                <Link
                  href="/dashboard/events/remove"
                  className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-accent"
                >
                  <Trash2 className="h-5 w-5" />
                  Remove Event
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2 mr-6">
            <Calendar className="h-6 w-6" />
            <span className="font-bold text-xl hidden md:inline-block">Home</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 flex-1">
            <Link
              href="/dashboard/events"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              View All Events
            </Link>
            <Link
              href="/cr/add"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Add Event
            </Link>
            <Link
              href="/dashboard/events/remove"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Remove Event
            </Link>
          </nav>
          <div className="flex items-center gap-2 ml-auto">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <DropdownMenu>

              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar (desktop only) */}
        <aside className="hidden md:flex w-64 flex-col border-r bg-muted/40">
          <nav className="flex flex-col gap-2 p-4">
            <Link
              href="/cr"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              <Calendar className="h-5 w-5" />
              Dashboard
            </Link>
            <p className="px-3 pt-5 pb-2 text-xs font-medium text-muted-foreground">Events</p>
            <Link
              href="/cr/events"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              <Calendar className="h-5 w-5" />
              View All Events
            </Link>
            <Link
              href="/cr/add"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              <PlusCircle className="h-5 w-5" />
              Add Event
            </Link>
            <Link
              href="/dashboard/events/remove"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              <Trash2 className="h-5 w-5" />
              Remove Event
            </Link>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
