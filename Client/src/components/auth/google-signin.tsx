"use client";

import { signIn } from "next-auth/react";
import { useEffect } from "react";
import { setCookie } from "@/lib/cookies";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useOAuthSession } from "@/lib/oauthSession";

export const GoogleSignInHandler = () => {
  const { data: session } = useOAuthSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.accessToken && session?.user) {
      // Store cookies like normal login
      setCookie("token", session.accessToken, 7);
      setCookie("userId", session.user._id || "", 7);
      setCookie("userRole", session.user.role, 7);

      toast.success("Google login successful!");

      // Redirect based on role like normal login
      if (session.user.role === "owner") {
        router.push("/owner");
      } else if (session.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }
  }, [session, router]);

  return null; // This component doesn't render anything
};

export const handleGoogleSignIn = () => {
  signIn("google", { callbackUrl: "/", redirect: true });
};
