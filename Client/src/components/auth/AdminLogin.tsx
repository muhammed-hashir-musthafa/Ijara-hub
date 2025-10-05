"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/base/ui/button";
import { Input } from "@/components/base/ui/input";
import { Label } from "@/components/base/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/base/ui/card";
import { Checkbox } from "@/components/base/ui/checkbox";
import { Eye, EyeOff, Shield, AlertTriangle, Building2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/base/ui/alert";
import { AdminLoginFormValues } from "@/types/form";

const initialValues: AdminLoginFormValues = {
  email: "",
  password: "",
  rememberMe: false,
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const AdminLoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    values: AdminLoginFormValues,
    actions: FormikHelpers<AdminLoginFormValues>
  ) => {
    setIsLoading(true);
    try {
      console.log("[Admin Login] Form submitted:", values);
      actions.resetForm();
      // TODO: Implement actual owner signup logic
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
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
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, setFieldValue }) => (
                <Form className="space-y-4">
                  {/* Email */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-card-foreground"
                    >
                      Email
                    </Label>
                    <Field
                      as={Input}
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="bg-input border-border focus:ring-primary"
                    />
                    <ErrorMessage
                      name="email"
                      component="p"
                      className="text-sm text-destructive"
                    />
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-sm font-medium text-card-foreground"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Field
                        as={Input}
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="bg-input border-border focus:ring-primary pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="p"
                      className="text-sm text-destructive"
                    />
                  </div>

                  {/* Remember Me and Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="rememberMe"
                        checked={values.rememberMe}
                        onCheckedChange={(checked) =>
                          setFieldValue("rememberMe", checked === true)
                        }
                      />
                      <Label
                        htmlFor="rememberMe"
                        className="text-sm text-muted-foreground"
                      >
                        Remember me
                      </Label>
                    </div>
                    <Link
                      href="/admin/forgot-password"
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <Button
                    disabled={isLoading}
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Logging In...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Building2 className="h-4 w-4" />
                        <span>Login In</span>
                      </div>
                    )}
                  </Button>
                </Form>
              )}
            </Formik>

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
