"use client";

import React from "react";
import Link from "next/link";
import { FormikHelpers } from "formik";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/base/ui/card";
import { Shield, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/base/ui/alert";
import { AdminLoginFormValues } from "@/types/form";
import AdminLoginForm from "@/components/admin/forms/AdminLoginForm";



export const AdminLoginPage = () => {

  const handleSubmit = async (
    values: AdminLoginFormValues,
    actions: FormikHelpers<AdminLoginFormValues>
  ) => {
    try {
      console.log("[Admin Login] Form submitted:", values);
      actions.resetForm();
      // TODO: Implement actual admin login logic
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card/30 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <div className="text-2xl font-bold text-primary">Ijara Hub</div>
          </Link>
        </div>

        {/* Security Warning */}
        <Alert className="border-destructive/50 bg-destructive/5">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <AlertDescription className="text-destructive">
            This is a restricted admin area. Unauthorized access is prohibited.
          </AlertDescription>
        </Alert>

        {/* Admin Login Card */}
        <Card className="border-border/50 shadow-xl bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold text-card-foreground">
              Admin Portal
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Super admin access to platform management
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <AdminLoginForm onSubmit={handleSubmit} />

            {/* Security Notice */}
            <div className="text-center text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg">
              All admin activities are logged and monitored for security
              purposes.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
