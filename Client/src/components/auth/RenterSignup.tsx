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
import { SocialLogin } from "@/components/auth/social-login";
import {
  Eye,
  EyeOff,
  User,
  Sparkles,
  UserPlus,
  Phone,
  Mail,
  Lock,
  UserCheck,
} from "lucide-react";
import { SignupFormValues } from "@/types/form";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .matches(
      /^(\+971|971)?[0-9]{8,9}$/,
      "Please enter a valid UAE phone number"
    )
    .required("Phone number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase and number"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  agreeToTerms: Yup.boolean().oneOf(
    [true],
    "You must agree to the terms and conditions"
  ),
});

const RenterSignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    values: SignupFormValues,
    actions: FormikHelpers<SignupFormValues>
  ) => {
    setIsLoading(true);
    try {
      console.log("[Renter Signup] Form submitted:", values);
      actions.resetForm();
      // TODO: Implement actual renter signup logic
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsLoading(false);
      actions.setSubmitting(false);
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/30 to-red-50 relative overflow-hidden`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-orange-400/15 to-amber-400/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-gradient-to-br from-red-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-gradient-to-br from-amber-400/15 to-red-400/15 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 py-8">
        <div className="w-full max-w-lg space-y-6">
          {/* Language Toggle */}
          {/* <div className="flex justify-end animate-fade-in">
            <LanguageToggle currentLang={lang} onLanguageChange={setLang} />
          </div> */}

          {/* Logo */}
          <div className="text-center animate-slide-up">
            <Link href="/" className="inline-block group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative bg-white px-6 py-3 rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-6 w-6 text-orange-600" />
                    <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                      Ijara Hub
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Signup Card */}
          <Card className="backdrop-blur-md bg-white/85 border-white/20 shadow-2xl animate-slide-up-delay">
            <CardHeader className="space-y-1 text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mb-4 transform hover:scale-110 transition-transform duration-300">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <UserPlus className="h-5 w-5 text-orange-600" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Join as Renter
              </CardTitle>
              <CardDescription className="text-gray-600 text-lg">
                Find your perfect home in UAE
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Social Login */}
              <div className="opacity-0 animate-fade-in-delay">
                <SocialLogin />
              </div>

              {/* Signup Form */}
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  phoneNumber: "",
                  password: "",
                  confirmPassword: "",
                  agreeToTerms: false,
                }}
                validationSchema={SignupSchema}
                onSubmit={handleSubmit}
              >
                {({ values, setFieldValue, errors, touched }) => (
                  <Form className="space-y-5">
                    <div className="space-y-5">
                      {/* Name Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2 animate-slide-left">
                          <Label
                            htmlFor="firstName"
                            className="text-sm font-semibold text-gray-700 flex items-center space-x-1"
                          >
                            <UserCheck className="h-4 w-4" />
                            <span>First Name</span>
                          </Label>
                          <Field
                            name="firstName"
                            as={Input}
                            id="firstName"
                            type="text"
                            placeholder="Enter first name"
                            className={`bg-white/70 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 transition-all duration-300 ${
                              errors.firstName && touched.firstName
                                ? "border-red-400"
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="firstName"
                            component="p"
                            className="text-sm text-red-500"
                          />
                        </div>

                        <div className="space-y-2 animate-slide-right">
                          <Label
                            htmlFor="lastName"
                            className="text-sm font-semibold text-gray-700"
                          >
                            Last Name
                          </Label>
                          <Field
                            name="lastName"
                            as={Input}
                            id="lastName"
                            type="text"
                            placeholder="Enter last name"
                            className={`bg-white/70 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 transition-all duration-300 ${
                              errors.lastName && touched.lastName
                                ? "border-red-400"
                                : ""
                            }`}
                          />
                          <ErrorMessage
                            name="lastName"
                            component="p"
                            className="text-sm text-red-500"
                          />
                        </div>
                      </div>

                      {/* Email Field */}
                      <div className="space-y-2 animate-slide-left">
                        <Label
                          htmlFor="email"
                          className="text-sm font-semibold text-gray-700 flex items-center space-x-1"
                        >
                          <Mail className="h-4 w-4" />
                          <span>Email Address</span>
                        </Label>
                        <Field
                          name="email"
                          as={Input}
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          className={`bg-white/70 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 transition-all duration-300 ${
                            errors.email && touched.email
                              ? "border-red-400"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="email"
                          component="p"
                          className="text-sm text-red-500"
                        />
                      </div>

                      {/* Phone Field */}
                      <div className="space-y-2 animate-slide-right">
                        <Label
                          htmlFor="phoneNumber"
                          className="text-sm font-semibold text-gray-700 flex items-center space-x-1"
                        >
                          <Phone className="h-4 w-4" />
                          <span>Phone Number</span>
                        </Label>
                        <Field
                          name="phoneNumber"
                          as={Input}
                          id="phoneNumber"
                          type="tel"
                          placeholder="+971 50 123 4567"
                          className={`bg-white/70 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 transition-all duration-300 ${
                            errors.phoneNumber && touched.phoneNumber
                              ? "border-red-400"
                              : ""
                          }`}
                        />
                        <ErrorMessage
                          name="phoneNumber"
                          component="p"
                          className="text-sm text-red-500"
                        />
                      </div>

                      {/* Password Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2 animate-slide-left">
                          <Label
                            htmlFor="password"
                            className="text-sm font-semibold text-gray-700 flex items-center space-x-1"
                          >
                            <Lock className="h-4 w-4" />
                            <span>Password</span>
                          </Label>
                          <div className="relative">
                            <Field
                              name="password"
                              as={Input}
                              id="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="Create password"
                              className={`bg-white/70 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 pr-12 transition-all duration-300 ${
                                errors.password && touched.password
                                  ? "border-red-400"
                                  : ""
                              }`}
                            />
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

                        <div className="space-y-2 animate-slide-right">
                          <Label
                            htmlFor="confirmPassword"
                            className="text-sm font-semibold text-gray-700"
                          >
                            Confirm Password
                          </Label>
                          <div className="relative">
                            <Field
                              name="confirmPassword"
                              as={Input}
                              id="confirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="Confirm password"
                              className={`bg-white/70 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 pr-12 transition-all duration-300 ${
                                errors.confirmPassword &&
                                touched.confirmPassword
                                  ? "border-red-400"
                                  : ""
                              }`}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
                              ) : (
                                <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" />
                              )}
                            </Button>
                          </div>
                          <ErrorMessage
                            name="confirmPassword"
                            component="p"
                            className="text-sm text-red-500"
                          />
                        </div>
                      </div>

                      {/* Terms Agreement */}
                      <div className="space-y-2 animate-fade-in">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="terms"
                            checked={values.agreeToTerms}
                            onCheckedChange={(checked) =>
                              setFieldValue("agreeToTerms", checked)
                            }
                            className="mt-1"
                          />
                          <Label
                            htmlFor="terms"
                            className="text-sm text-gray-600 leading-relaxed"
                          >
                            I agree to the{" "}
                            <Link
                              href="/terms"
                              className="text-orange-600 hover:text-red-600 font-medium transition-colors underline"
                            >
                              Terms and Conditions
                            </Link>{" "}
                            and{" "}
                            <Link
                              href="/privacy"
                              className="text-orange-600 hover:text-red-600 font-medium transition-colors underline"
                            >
                              Privacy Policy
                            </Link>
                          </Label>
                        </div>
                        <ErrorMessage
                          name="agreeToTerms"
                          component="p"
                          className="text-sm text-red-500"
                        />
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 rounded-lg transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl animate-slide-up"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>Creating Account...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center space-x-2">
                            <UserPlus className="h-4 w-4" />
                            <span>Create Renter Account</span>
                          </div>
                        )}
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>

              {/* Sign In Link */}
              <div className="text-center space-y-2 animate-fade-in-delay">
                <p className="text-gray-600">Already have an account?</p>
                <Link
                  href="/login"
                  className="text-orange-600 hover:text-red-600 font-medium transition-colors flex items-center justify-center space-x-1"
                >
                  <User className="h-4 w-4" />
                  <span>Sign in here</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

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
          animation: fade-in 0.8s ease-out 1.2s both;
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
          animation: slide-right 0.6s ease-out 0.8s both;
        }
      `}</style>
    </div>
  );
};

export default RenterSignupPage;
