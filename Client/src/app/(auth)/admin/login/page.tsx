import { AdminLoginPage } from "@/components/auth/AdminLogin";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Admin Login | Ijara Hub Premium Rental Service",
  description: "Admin login page for Ijara Hub Premium Rental Service.",
  keywords: [
    "Admin",
    "Login",
    "Ijara Hub",
    "Premium Rental Service",
    "Admin Login",
    "Admin Panel",
    "Admin Dashboard",
    "Admin Access",
    "Admin Authentication",
    "Admin Sign In",
    "Admin User",
    "Admin Security",
    "Admin Management",
    "Admin Control",
    "Admin Interface",
  ],
};

const AdminLogin = () => {
  return (
    <div>
      <AdminLoginPage />
    </div>
  );
};

export default AdminLogin;
