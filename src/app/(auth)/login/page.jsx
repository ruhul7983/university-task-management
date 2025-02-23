"use client"; 
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    if (result?.error) {
      // setError(result.error)
    } else {
      router.push("/") // Redirect to dashboard or home page
    }
  }
  return (
    <div className="min-h-[90vh] flex flex-col">
     

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-card text-card-foreground rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-semibold mb-6 text-center">Log In</h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your.email@university.edu"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  name="email"
                />
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
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor="remember" className="text-sm font-medium leading-none">
                  Remember me
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-900 transition-all"
              >
                Log In
              </button>
            </div>
          </form>
          <div className="mt-4 text-sm text-center">
            <Link href="/forgot-password" className="text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <div className="mt-6 text-sm text-center">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Sign up
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

