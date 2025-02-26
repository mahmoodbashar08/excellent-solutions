// app/(main)/layout.tsx
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto p-4">
        {children} {/* This will be your page content */}
      </main>
    </div>
  );
}
