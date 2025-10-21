"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FormikHelpers } from "formik";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/base/ui/card";
import { SocialLogin } from "@/components/auth/social-login";
import { Sparkles, UserPlus, User } from "lucide-react";
import { SignupFormValues } from "@/types/form";
import RenterSignupForm from "@/components/renter/forms/RenterSignupForm";
import { renterSignup } from "@/services/authService";
import { setCookie } from "@/lib/cookies";

const RenterSignupPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    values: SignupFormValues,
    actions: FormikHelpers<SignupFormValues>
  ) => {
    setIsLoading(true);
    try {
      const signupData = {
        fname: values.firstName,
        lname: values.lastName,
        email: values.email,
        password: values.password,
        phone: values.phoneNumber,
        gender: values.gender,
        age: parseInt(values.age)
      };
      const response = await renterSignup(signupData);
      toast.success("Account created successfully!");
      setCookie("token", response?.data?.token || '', 7);
      if (response?.data?.user?._id) {
        setCookie("userId", response.data.user._id, 7);
      }
      setCookie("userRole", "renter", 7);
      actions.resetForm();
      // Redirect to dashboard or home
      window.location.href = "/";
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || "Signup failed. Please try again.";
        toast.error(errorMessage);
      } else {
        toast.error("Signup failed. Please try again.");
      }
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
              <RenterSignupForm onSubmit={handleSubmit} isLoading={isLoading} />

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
