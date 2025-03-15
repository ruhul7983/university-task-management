"use client";
import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
export default function SignupPage() {
  const router = useRouter()
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    setError("")
    e.preventDefault()
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;
    const phone = form.phone.value;
    if (email !== email.split("@")[0] + "@diu.edu.bd") {
      setError("Email must be a @diu.edu.bd");
      return;
    }
    const data = {
      email,
      password,
      name,
      phone
    }
    try {
      const res = await axios.post("https://os-project-backend.vercel.app/users",
        data
      )
      console.log(res.data.status);

      if (res.data.status) {
        // Sign in the user immediately after successful registration
        console.log("IN check");

        const result = await signIn("credentials", {
          redirect: false,
          email: email,
          password: password,
        })

        if (result?.error) {
          // setError(result.error)
        } else {
          router.push("/")
        }
      } else {
      }
    } catch (error) {
    }
  }
  return (
    <div className="min-h-[90vh] flex flex-col">


      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-card text-card-foreground rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-semibold mb-6 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Ruhul Amin"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  name="name"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="number"
                  placeholder="017123456789"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  name="phone"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your.email@diu.edu.bd"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  name="email"
                />
                {error && <p className="text-red-500 text-sm ">{error}</p>}

              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  name="password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-900 transition-all"
              >
                Sign Up
              </button>
            </div>
          </form>
          <div className="mt-6 text-sm text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-muted text-muted-foreground py-4">
        <div className="container mx-auto text-center text-sm">
          © 2025 University Task Manager. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

