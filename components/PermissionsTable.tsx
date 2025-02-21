"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuthorization } from "@/hooks/authorization";
import { useToast } from "@/hooks/use-toast";

export const PermissionsTable = () => {
  const { toast } = useToast();
  const { permissions, isLoading, checkAccess } = useAuthorization();

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        {/* <ClipLoader color="#4F46E5" size={40} /> Optional: Add a spinner */}
        <span className="ml-2">Loading permissions...</span>
      </div>
    );
  }

  // Empty state (permissions are fetched but empty)
  if (!permissions || Object.keys(permissions).length === 0) {
    return <div>No permissions found.</div>;
  }

  // Fetched state (permissions are available)
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px] text-center border-r">
              Permission
            </TableHead>
            <TableHead className="text-center border-r">Access</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(permissions).map(([permission]) => {
            const hasAccess = checkAccess({ allowedPermissions: [permission] });

            return (
              <TableRow key={permission}>
                <TableCell className="font-medium text-center border-r">
                  {permission}
                </TableCell>
                <TableCell className="text-center border-r">
                  {hasAccess ? (
                    <span className="text-green-500">✅ Allowed</span>
                  ) : (
                    <span className="text-red-500">❌ Denied</span>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    onClick={() => {
                      if (hasAccess) {
                        toast({
                          title: "Access Granted",
                          description: `You have access to: ${permission}`,
                          variant: "default",
                        });
                      } else {
                        toast({
                          title: "Permission Denied",
                          description: `You do not have access to: ${permission}`,
                          variant: "destructive",
                        });
                      }
                    }}
                    className={"bg-green-500 hover:bg-green-600"}
                  >
                    Check Access
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
