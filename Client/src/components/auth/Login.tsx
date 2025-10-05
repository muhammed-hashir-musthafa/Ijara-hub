"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Formik, Field, ErrorMessage, Form, FormikHelpers } from "formik";
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
import { RadioGroup, RadioGroupItem } from "@/components/base/ui/radio-group";
import { SocialLogin } from "@/components/auth/social-login";
import {
  Eye,
  EyeOff,
  Building2,
  User,
  Sparkles,
  ArrowRight,
} from "lucide-react";

// Validation Schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  userType: Yup.string()
    .oneOf(["renter", "owner"], "Please select a user type")
    .required("User type is required"),
  rememberMe: Yup.boolean(),
});

// Type for form values
interface LoginFormValues {
  email: string;
  password: string;
  userType: "renter" | "owner";
  rememberMe: boolean;
}

export default function UnifiedLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>
  ) => {
    setIsLoading(true);
    try {
      console.log("[Login] Form submitted:", values);
      actions.resetForm();
      // TODO: Replace with actual API login call
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/30 to-orange-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-amber-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-20 w-96 h-96 bg-gradient-to-br from-amber-400/15 to-red-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 right-1/3 w-64 h-64 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center animate-slide-up">
            <Link href="/" className="inline-block group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative bg-white px-6 py-3 rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-6 w-6 text-orange-600" />
                    <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      Ijara Hub
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Login Card */}
          <Card className="backdrop-blur-md bg-white/80 border-white/20 shadow-2xl animate-slide-up-delay">
            <CardHeader className="space-y-1 text-center pb-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 transform hover:scale-110 transition-transform duration-300">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <ArrowRight className="h-5 w-5 text-orange-600" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                Sign in to your account
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Social Login */}
              <div className="animate-fade-in-delay">
                <SocialLogin />
              </div>

              {/* Login Form */}
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                  userType: "renter",
                  rememberMe: false,
                }}
                validationSchema={LoginSchema}
                onSubmit={handleSubmit}
              >
                {({ values, setFieldValue, errors, touched }) => (
                  <Form className="space-y-6">
                    {/* User Type Selection */}
                    <div className="space-y-3 animate-slide-right">
                      <Label className="text-sm font-semibold text-gray-700">
                        I am a
                      </Label>
                      <RadioGroup
                        value={values.userType}
                        onValueChange={(value) =>
                          setFieldValue("userType", value as "renter" | "owner")
                        }
                        className="flex space-x-6"
                      >
                        <div className="flex items-center space-x-3 group">
                          <RadioGroupItem
                            value="renter"
                            id="renter"
                            className="border-2"
                          />
                          <Label
                            htmlFor="renter"
                            className="flex items-center space-x-2 cursor-pointer group-hover:text-orange-600 transition-colors"
                          >
                            <User className="h-4 w-4" />
                            <span>Renter</span>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 group">
                          <RadioGroupItem
                            value="owner"
                            id="owner"
                            className="border-2"
                          />
                          <Label
                            htmlFor="owner"
                            className="flex items-center space-x-2 cursor-pointer group-hover:text-red-600 transition-colors"
                          >
                            <Building2 className="h-4 w-4" />
                            <span>Owner</span>
                          </Label>
                        </div>
                      </RadioGroup>
                      <ErrorMessage
                        name="userType"
                        component="p"
                        className="text-sm text-red-500"
                      />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2 animate-slide-left">
                      <Label
                        htmlFor="email"
                        className="text-sm font-semibold text-gray-700"
                      >
                        Email Address
                      </Label>
                      <Field name="email">
                        {({ field }: { field: React.InputHTMLAttributes<HTMLInputElement> }) => (
                          <Input
                            {...field}
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            className={`bg-white/70 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 transition-all duration-300 ${
                              errors.email && touched.email ? "border-red-400" : ""
                            }`}
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="text-sm text-red-500"
                      />
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2 animate-slide-right">
                      <Label
                        htmlFor="password"
                        className="text-sm font-semibold text-gray-700"
                      >
                        Password
                      </Label>
                      <div className="relative">
                        <Field name="password">
                          {({ field }: { field: React.InputHTMLAttributes<HTMLInputElement> }) => (
                            <Input
                              {...field}
                              id="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your password"
                              className={`bg-white/70 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 pr-12 transition-all duration-300 ${
                                errors.password && touched.password ? "border-red-400" : ""
                              }`}
                            />
                          )}
                        </Field>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
                          )}
                        </Button>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="p"
                        className="text-sm text-red-500"
                      />
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between animate-fade-in">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          checked={values.rememberMe}
                          onCheckedChange={(checked) =>
                            setFieldValue("rememberMe", Boolean(checked))
                          }
                        />
                        <Label
                          htmlFor="remember"
                          className="text-sm text-gray-600"
                        >
                          Remember me
                        </Label>
                      </div>
                      <Link
                        href="/forgot-password"
                        className="text-sm text-orange-600 hover:text-red-600 font-medium transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-lg transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl animate-slide-up"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Signing in...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-2">
                          <span>Sign In</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      )}
                    </Button>
                  </Form>
                )}
              </Formik>

              {/* Sign Up Links */}
              <div className="text-center space-y-3 opacity-80 animate-fade-in-delay">
                <p className="text-gray-600">Don&apos;t have an account?</p>
                <div className="flex flex-col space-y-2">
                  <Link
                    href="/renter/signup"
                    className="text-orange-600 hover:text-red-600 font-medium transition-colors flex items-center justify-center space-x-1"
                  >
                    <User className="h-4 w-4" />
                    <span>Sign up as Renter</span>
                  </Link>
                  <Link
                    href="/owner/signup"
                    className="text-orange-600 hover:text-red-600 font-medium transition-colors flex items-center justify-center space-x-1"
                  >
                    <Building2 className="h-4 w-4" />
                    <span>Sign up as Owner</span>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-left {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-right {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out 0.5s both;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.8s both;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out 0.2s both;
        }

        .animate-slide-up-delay {
          animation: slide-up 0.8s ease-out 0.4s both;
        }

        .animate-slide-left {
          animation: slide-left 0.6s ease-out 0.6s both;
        }

        .animate-slide-right {
          animation: slide-right 0.6s ease-out 0.7s both;
        }
      `}</style>
  
      