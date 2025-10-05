import UnifiedLoginPage from "@/components/auth/Login";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Login | Ijara Hub Premium Rental Service",
  description:
    "Login to your Ijara Hub account to manage your rentals and access premium features.",
  keywords: [
    "Ijara Hub",
    "Login",
    "Premium Rental Service",
    "User Authentication",
    "Account Access",
    "Rental Management",
    "Secure Login",
    "User Dashboard",
  ],
};

const Login = () => {
  return (
    <div>
      <UnifiedLoginPage />
    </div>
  );
};

export default Login;
