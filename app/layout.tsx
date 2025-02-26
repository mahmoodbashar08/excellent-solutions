// app/layout.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
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
        <SessionProvider>
          <PermissionsProvider>
            {/* Main content structure remains in child layouts */}
            {children}
            <Toaster />
          </PermissionsProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
