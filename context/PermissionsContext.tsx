"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchAndTransformPermissions } from "@/lib/auth";

type PermissionsContextType = {
  permissions: Record<string, boolean> | null;
  isLoading: boolean;
  error: string | null;
};

const PermissionsContext = createContext<PermissionsContextType>({
  permissions: null,
  isLoading: false,
  error: null,
});

// Define some test permissions to add alongside fetched permissions
const TEST_PERMISSIONS: Record<string, boolean> = {
  "system.DELETE": false, // Example of a restricted permission
  "system.FORMAT": false, // Another restricted permission
  "test.VIEW": true, // Example of a test permission that is allowed
  "test.EDIT": false, // Example of a test permission that is denied
};

export const PermissionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session } = useSession();
  const [permissions, setPermissions] = useState<Record<
    string,
    boolean
  > | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPermissions = async () => {
      if (session?.accessToken) {
        setIsLoading(true); // Set loading to true when starting the fetch
        setError(null);
        try {
          // Fetch permissions from the server
          const permissionsDict = await fetchAndTransformPermissions(
            session.accessToken
          );

          // Merge fetched permissions with test permissions
          const finalPermissions = {
            ...TEST_PERMISSIONS,
            ...permissionsDict,
          };

          setPermissions(finalPermissions);
        } catch (err) {
          console.error("Error fetching permissions:", err);
          setError("Failed to fetch permissions");
        } finally {
          setIsLoading(false); // Set loading to false after fetch completes (success or error)
        }
      }
    };

    fetchPermissions();
  }, [session?.accessToken]);

  return (
    <PermissionsContext.Provider value={{ permissions, isLoading, error }}>
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissions = () => useContext(PermissionsContext);
