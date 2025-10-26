"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "@/lib/cookies";
import { useOAuthSession } from "@/lib/oauthSession";

export const useAuth = () => {
  const { data: session, status } = useOAuthSession();
  const router = useRouter();

  // Check for traditional cookie-based auth
  const token = getCookie("token");
  const userId = getCookie("userId");
  const userRole = getCookie("userRole");

  const logout = async () => {
    // Clear NextAuth session if exists
    if (session) {
      await signOut({ redirect: false });
    }

    // Clear custom cookies
    deleteCookie("token");
    deleteCookie("userId");
    deleteCookie("userRole");

    // Clear localStorage
    localStorage.clear();

    // Clear sessionStorage
    sessionStorage.clear();

    router.push("/login");
  };

  // Check authentication from both NextAuth and cookies
  const isAuthenticated = !!session || !!token;
  const isLoading = status === "loading";

  // Prefer NextAuth user, fallback to cookie data
  const user =
    session?.user ||
    (token ? { id: userId, role: userRole, fname: null, lname: null } : null);

  return {
    user,
    token,
    userRole,
    isLoading,
    isAuthenticated,
    logout,
    session,
  };
};
