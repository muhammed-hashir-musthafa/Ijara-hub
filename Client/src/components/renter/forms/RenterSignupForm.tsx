"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Formik, Field, ErrorMessage, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/base/ui/button";
import { Input } from "@/components/base/ui/input";
import { Label } from "@/components/base/ui/label";
import { Checkbox } from "@/components/base/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/base/ui/select";
import {
  Eye,
  EyeOff,
  User,
  UserPlus,
  Phone,
  Mail,
  Lock,
  UserCheck,
  Calendar,
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
  gender: Yup.string()
    .oneOf(["male", "female", "other"], "Please select a gender")
    .required("Gender is required"),
  age: Yup.number()
    .min(18, "You must be at least 18 years old")
    .max(100, "Age cannot exceed 100")
    .required("Age is required")
    .typeError("Age must be a number"),
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

interface RenterSignupFormProps {
  onSubmit: (values: SignupFormValues, actions: FormikHelpers<SignupFormValues>) => Promise<void>;
  isLoading?: boolean;
}

export default function RenterSignupForm({ onSubmit, isLoading = false }: RenterSignupFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        gender: "male",
        age: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
      }}
      validationSchema={SignupSchema}
      onSubmit={onSubmit}
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

            {/* Contact & Personal Information */}
            <div className="space-y-5">
              {/* Phone Number - full width */}
              <div className="space-y-2 animate-slide-left">
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
                  type="text"
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

              {/* Gender and Age */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Gender Field */}
                <div className="space-y-2 animate-slide-left">
                  <Label
                    htmlFor="gender"
                    className="text-sm font-semibold text-gray-700 flex items-center space-x-1"
                  >
                    <User className="h-4 w-4" />
                    <span>Gender</span>
                  </Label>
                  <Select
                    value={values.gender}
                    onValueChange={(value) =>
                      setFieldValue("gender", value)
                    }
                  >
                    <SelectTrigger
                      className={`bg-white/70 border-gray-200 focus:border-orange-400 min-w-[200px] ${
                        errors.gender && touched.gender
                          ? "border-red-400"
                          : ""
                      }`}
                    >
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <ErrorMessage
                    name="gender"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>

                {/* Age Field */}
                <div className="space-y-2 animate-slide-right">
                  <Label
                    htmlFor="age"
                    className="text-sm font-semibold text-gray-700 flex items-center space-x-1"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Age</span>
                  </Label>
                  <Field
                    name="age"
                    as={Input}
                    id="age"
                    type="text"
                    placeholder="25"
                    min="18"
                    max="100"
                    className={`bg-white/70 border-gray-200 focus:border-orange-400 focus:ring-orange-400/20 transition-all duration-300 ${
                      errors.age && touched.age
                        ? "border-red-400"
                        : ""
                    }`}
                  />
                  <ErrorMessage
                    name="age"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>
              </div>
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
  );
}