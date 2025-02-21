import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "@/lib/axios";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phoneNumber: { label: "Phone Number", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          // Sending login request to the backend
          const loginResponse = await axios.post("auth/login", {
            phoneNumber: credentials?.phoneNumber,
            password: credentials?.password,
          });

          // Check if the login response contains valid data
          if (
            loginResponse.status === 200 &&
            loginResponse.data &&
            loginResponse.data.data
          ) {
            // Access the token and user data from the login response
            const { token, user } = loginResponse.data.data;

            // Return the user and token to NextAuth
            return {
              id: user.id,
              phoneNumber: user.phoneNumber,
              name: user.name,
              token: token, // Include the token
            };
          } else {
            console.error("Invalid login response:", loginResponse.data);
            throw new Error("Invalid login response"); // Throw an error for invalid response
          }
        } catch (error: any) {
          console.error("Login error:", error);

          // Handle specific error messages from the backend
          if (error.response) {
            // Backend returned an error response
            const { status, data } = error.response;

            if (status === 400) {
              // Bad request (e.g., invalid phone number or password)
              throw new Error(
                data.message || "Invalid phone number or password"
              );
            } else if (status === 404) {
              // User not found
              throw new Error("User not found");
            } else if (status === 401) {
              // Unauthorized (e.g., incorrect password)
              throw new Error("Incorrect password");
            } else {
              // Other server errors
              throw new Error("An error occurred. Please try again later.");
            }
          } else if (error.request) {
            // No response from the server
            throw new Error(
              "No response from the server. Please try again later."
            );
          } else {
            // Other errors (e.g., network issues)
            throw new Error("An error occurred. Please try again later.");
          }
        }
      },
    }),
  ],
  pages: {
    signIn: "/login", // Custom login page
  },
  secret: process.env.NEXTAUTH_SECRET, // Add a secret to your .env file
  callbacks: {
    async jwt({ token, user }: any) {
      // If the user object is available (after successful login), add it to the token
      if (user) {
        token.id = user.id;
        token.phoneNumber = user.phoneNumber;
        token.accessToken = user.token; // Include the token
      }
      return token;
    },
    async session({ session, token }: any) {
      // Add the user details to the session object
      if (token) {
        session.user.id = token.id;
        session.user.phoneNumber = token.phoneNumber;
        session.accessToken = token.accessToken; // Include the token
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
