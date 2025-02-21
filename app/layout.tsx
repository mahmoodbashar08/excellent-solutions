"use client"; // Mark this component as a Client Component

import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster"; // Import the Toaster component
import "./globals.css";
import { PermissionsProvider } from "@/context/PermissionsContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {/* Wrap the application with SessionProvider */}
        <SessionProvider>
          <PermissionsProvider>
            {children}
            {/* Add the Toaster component for notifications */}
            <Toaster />
          </PermissionsProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
