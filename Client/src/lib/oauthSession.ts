"use client";
import { useState, useEffect } from "react";
import { User } from "@/types/auth";

interface OAuthSession {
  user: User;
  accessToken: string;
  expiresAt?: number;
}

export const useOAuthSession = () => {
  const [session, setSession] = useState<OAuthSession | null>(null);
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/oauth/session"); // your new endpoint
        if (!res.ok) throw new Error("No session");
        const data = await res.json();
        setSession(data);
        setStatus("authenticated");
      } catch {
        setSession(null);
        setStatus("unauthenticated");
      }
    };

    fetchSession();
  }, []);

  return { data: session, status };
};
