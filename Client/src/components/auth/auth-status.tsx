"use client";

import { useAuth } from "@/hooks/useAuth";
import { signOut } from "next-auth/react";
import { Button } from "@/components/base/ui/button";

export const AuthStatus = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-4">
        <span>Welcome, {user?.fname}!</span>
        <Button onClick={() => signOut()} variant="outline">
          Sign Out
        </Button>
      </div>
    );
  }

  return null;
};