import axios from "axios";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          // Send request to your backend for authentication
          const response = await axios.post("http://localhost:5000/users/login", {
            email: credentials?.email,
            password: credentials?.password
          });

          // If login is successful, return user data
          if (response.data.status === 200) {
            return response.data.user; // Ensure backend returns { id, name, email } for authentication
          }

          return null; // Return null if authentication fails
        } catch (error) {
          console.error("Login failed:", error.response?.data || error.message);
          return null;
        }
      }
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signUp: "/register",
  },
})

export { handler as GET, handler as POST }

