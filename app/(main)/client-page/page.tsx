"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { usePermissions } from "@/context/PermissionsContext";
import { useToast } from "@/hooks/use-toast";

export default function ClientPage() {
  const [clientTime, setClientTime] = useState("");
  const [counter, setCounter] = useState(0);
  const { combinedPermissions, toggleTestPermission } = usePermissions();
  const { toast } = useToast();

  // Set client time on mount
  useEffect(() => {
    setClientTime(new Date().toLocaleString());
  }, []);

  // Check access for a specific permission
  const checkAccess = (permission: string) => {
    const hasAccess = combinedPermissions[permission];
    toast({
      title: hasAccess ? "Access Granted" : "Access Denied",
      description: `You ${
        hasAccess ? "have" : "do not have"
      } access to: ${permission}`,
      variant: hasAccess ? "default" : "destructive",
    });
  };

  // Filter permissions to only show those with access (value = true)
  const accessiblePermissions = Object.entries(combinedPermissions).filter(
    ([, value]) => value === true
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Client-Side Page</h1>
      <div className="space-y-4">
        <p>Loaded at: {clientTime}</p>
        <p>Counter: {counter}</p>
        <Button
          onClick={() => setCounter((c) => c + 1)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Increment
        </Button>

        {/* Container for both sections */}
        <div className="flex justify-between">
          {/* Original Toggle Permissions Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Toggle Permissions
            </h2>
            <div className="space-y-2 flex flex-col items-center">
              {Object.entries(combinedPermissions).map(
                ([permission, value]) => (
                  <div key={permission} className="flex items-center gap-4">
                    <Button
                      onClick={() => toggleTestPermission(permission)}
                      className={`px-4 py-2 ${
                        value ? "bg-green-500" : "bg-red-500"
                      } text-white rounded`}
                    >
                      {permission}: {value ? "Allowed" : "Denied"}
                    </Button>
                    <Button
                      onClick={() => checkAccess(permission)}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Check Access
                    </Button>
                  </div>
                )
              )}
            </div>
          </div>

          {/* New Section: Accessible Permissions */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Your Accessible Permissions
            </h2>
            <div className="space-y-2 flex flex-col items-center">
              {accessiblePermissions.map(([permission]) => (
                <div key={permission} className="flex items-center gap-4">
                  <span className="font-medium">{permission}</span>
                  <Button
                    onClick={() => checkAccess(permission)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Check Access
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
