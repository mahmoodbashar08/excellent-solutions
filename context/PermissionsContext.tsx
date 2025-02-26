"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { fetchAndTransformPermissions } from "@/lib/auth";

type PermissionsContextType = {
  permissions: Record<string, boolean> | null;
  testPermissions: Record<string, boolean>;
  combinedPermissions: Record<string, boolean>;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  toggleTestPermission: (permission: string) => void;
};

const PermissionsContext = createContext<PermissionsContextType>({
  permissions: null,
  testPermissions: {},
  combinedPermissions: {},
  isLoading: false,
  error: null,
  refetch: async () => {},
  toggleTestPermission: () => {},
});

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
  const [testPermissions, setTestPermissions] = useState<
    Record<string, boolean>
  >({
    "system.DELETE": false,
    "system.FORMAT": false,
    "test.VIEW": true,
    "test.EDIT": false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Combine permissions and testPermissions
  const combinedPermissions = {
    ...testPermissions,
    ...(permissions || {}),
  };

  const fetchPermissions = async () => {
    const accessToken = session?.accessToken as string | undefined;

    if (accessToken) {
      setIsLoading(true);
      setError(null);
      try {
        const permissionsDict = await fetchAndTransformPermissions(accessToken);
        setPermissions(permissionsDict);
      } catch (err) {
        setError("Failed to fetch permissions");
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("No access token, skipping fetch");
      setIsLoading(false);
    }
  };

  const toggleTestPermission = (permission: string) => {
    // Update testPermissions
    setTestPermissions((prev) => ({
      ...prev,
      [permission]: !prev[permission],
    }));

    // Update original permissions
    setPermissions((prev) => ({
      ...(prev || {}), // Ensure prev is not null
      [permission]: !prev?.[permission], // Toggle the permission in the original permissions
    }));
  };

  useEffect(() => {
    fetchPermissions();
  }, [session?.accessToken]);

  return (
    <PermissionsContext.Provider
      value={{
        permissions,
        testPermissions,
        combinedPermissions,
        isLoading,
        error,
        refetch: fetchPermissions,
        toggleTestPermission,
      }}
    >
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissions = () => useContext(PermissionsContext);
