import React from "react";
import { usePermissions } from "@/context/PermissionsContext"; // Import the PermissionsContext

export const useAuthorization = () => {
  const { permissions, isLoading, error } = usePermissions();

  const checkAccess = React.useCallback(
    ({ allowedPermissions }: { allowedPermissions: string[] }) => {
      if (!permissions) {
        return false;
      }

      if (allowedPermissions && allowedPermissions.length > 0) {
        return allowedPermissions.every(
          (permission) => permissions[permission]
        );
      }

      return true; // If no permissions are required, allow access
    },
    [permissions]
  );

  return { checkAccess, permissions, isLoading };
};
