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
import { usePermissions } from "@/context/PermissionsContext";
import { useToast } from "@/hooks/use-toast";

export const PermissionsTable = () => {
  const { toast } = useToast();
  const { combinedPermissions, isLoading } = usePermissions();

  // Fetched state (permissions are available)
  return (
    <div className="rounded-md border">
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <span className="ml-2">Loading permissions...</span>
        </div>
      ) : (
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
            {Object.entries(combinedPermissions).map(([permission]) => {
              const hasAccess = combinedPermissions[permission];

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
      )}
    </div>
  );
};
