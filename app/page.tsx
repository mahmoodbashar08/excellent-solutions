"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { PermissionsTable } from "@/components/PermissionsTable";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/login");
    },
  });

  const handleSignOut = async () => {
    await signOut({ redirect: false }); // Sign out without redirecting
    router.push("/login"); // Redirect to the login page after signing out
  };

  // Loading state while session is being fetched
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="ml-2">Loading session...</span>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p>Welcome, {session?.user?.name}!</p>
        </div>
        <button
          onClick={handleSignOut}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
      {/* Permissions Table */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Your Permissions</h2>
        <PermissionsTable />
      </div>
    </div>
  );
}
