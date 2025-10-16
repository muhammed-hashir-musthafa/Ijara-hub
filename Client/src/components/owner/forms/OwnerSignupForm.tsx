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
  Building2,
  Phone,
  Mail,
  Lock,
  UserCheck,
  Briefcase,
  User,
  Calendar,
  MapPin,
  FileText,
} from "lucide-react";
import { OwnerSignupFormValues } from "@/types/form";

const OwnerSignupSchema = Yup.object().shape({
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
  businessName: Yup.string()
    .min(2, "Business name must be at least 2 characters")
    .required("Business name is required"),
  businessEmail: Yup.string()
    .email("Invalid business email format")
    .required("Business email is required"),
  businessPhone: Yup.string()
    .matches(
      /^(\+971|971)?[0-9]{8,9}$/,
      "Please enter a valid UAE business phone number"
    )
    .required("Business phone is required"),
  businessAddress: Yup.string()
    .min(5, "Business address must be at least 5 characters")
    .required("Business address is required"),
  businessPincode: Yup.string()
    .matches(/^[0-9]{5,6}$/, "Please enter a valid pincode")
    .required("Business pincode is required"),
  businessType: Yup.string()
    .oneOf(["individual", "company"], "Please select a business type")
    .required("Business type is required"),
  experienceYears: Yup.number()
    .min(0, "Experience cannot be negative")
    .max(50, "Experience cannot exceed 50 years")
    .required("Experience years is required")
    .typeError("Experience must be a number"),
  bio: Yup.string().max(500, "Bio cannot exceed 500 characters").optional(),
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

interface OwnerSignupFormProps {
  onSubmit: (values: OwnerSignupFormValues, actions: FormikHelpers<OwnerSignupFormValues>) => Promise<void>;
  isLoading?: boolean;
}

export default function OwnerSignupForm({ onSubmit, isLoading = false }: OwnerSignupFormProps) {
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
        businessName: "",
        businessEmail: "",
        businessPhone: "",
        businessAddress: "",
        businessPincode: "",
        businessType: "individual",
        experienceYears: "",
        bio: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
      }}
      validationSchema={OwnerSignupSchema}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form className="space-y-5">
          <div className="space-y-5">
            {/* Personal Information */}
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
                  placeholder="Enter first name"
                  className={`${
                    errors.firstName && touched.firstName
                      ? "border-red-400"
                      : ""
                  } w-full`}
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
                  placeholder="Enter last name"
                  className={`${
                    errors.lastName && touched.lastName
                      ? "border-red-400"
                      : ""
                  } w-full`}
                />
                <ErrorMessage
                  name="lastName"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  type="email"
                  placeholder="Enter your email"
                  className={`${
                    errors.email && touched.email
                      ? "border-red-400"
                      : ""
                  } w-full`}
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>

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
                  type="text"
                  placeholder="+971 50 123 4567"
                  className={`${
                    errors.phoneNumber && touched.phoneNumber
                      ? "border-red-400"
                      : ""
                  } w-full`}
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <SelectTrigger className="bg-white/70 border-gray-200 focus:border-orange-400 w-full">
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
                  type="text"
                  placeholder="30"
                  min="18"
                  max="100"
                  className={`${
                    errors.age && touched.age ? "border-red-400" : ""
                  } w-full`}
                />
                <ErrorMessage
                  name="age"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>
            </div>

            {/* Business Information */}
            <div className="space-y-2 animate-slide-left">
              <Label
                htmlFor="businessName"
                className="text-sm font-semibold text-gray-700 flex items-center space-x-1"
              >
                <Briefcase className="h-4 w-4" />
                <span>Business Name</span>
              </Label>
              <Field
                name="businessName"
                as={Input}
                placeholder="Enter business name"
                className={`${
                  errors.businessName && touched.businessName
                    ? "border-red-400"
                    : ""
                } w-full`}
              />
              <ErrorMessage
                name="businessName"
                component="p"
                className="text-sm text-red-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 animate-slide-left">
                <Label
                  htmlFor="businessEmail"
                  className="text-sm font-semibold text-gray-700 flex items-center space-x-1"
                >
                  <Mail className="h-4 w-4" />
                  <span>Business Email</span>
                </Label>
                <Field
                  name="businessEmail"
                  as={Input}
                  type="email"
                  placeholder="business@company.com"
                  className={`${
                    errors.businessEmail && touched.businessEmail
                      ? "border-red-400"
                      : ""
                  } w-full`}
                />
                <ErrorMessage
                  name="businessEmail"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>

              <div className="space-y-2 animate-slide-right">
                <Label
                  htmlFor="businessPhone"
                  className="text-sm font-semibold text-gray-700 flex items-center space-x-1"
                >
                  <Phone className="h-4 w-4" />
                  <span>Business Phone</span>
                </Label>
                <Field
                  name="businessPhone"
                  as={Input}
                  type="text"
                  placeholder="+971 4 123 4567"
                  className={`${
                    errors.businessPhone && touched.businessPhone
                      ? "border-red-400"
                      : ""
                  } w-full`}
                />
                <ErrorMessage
                  name="businessPhone"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 animate-slide-left">
                <Label
                  htmlFor="businessAddress"
                  className="text-sm font-semibold text-gray-700 flex items-center space-x-1"
                >
                  <MapPin className="h-4 w-4" />
                  <span>Business Address</span>
                </Label>
                <Field
                  name="businessAddress"
                  as={Input}
                  placeholder="Business address"
                  className={`${
                    errors.businessAddress && touched.businessAddress
                      ? "border-red-400"
                      : ""
                  } w-full`}
                />
                <ErrorMessage
                  name="businessAddress"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>

              <div className="space-y-2 animate-slide-right">
                <Label
                  htmlFor="businessPincode"
                  className="text-sm font-semibold text-gray-700"
                >
                  Business Pincode
                </Label>
                <Field
                  name="businessPincode"
                  as={Input}
                  placeholder="12345"
                  className={`${
                    errors.businessPincode && touched.businessPincode
                      ? "border-red-400"
                      : ""
                  } w-full`}
                />
                <ErrorMessage
                  name="businessPincode"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 animate-slide-left">
                <Label
                  htmlFor="businessType"
                  className="text-sm font-semibold text-gray-700"
                >
                  Business Type
                </Label>
                <Select
                  value={values.businessType}
                  onValueChange={(value) =>
                    setFieldValue("businessType", value)
                  }
                >
                  <SelectTrigger className="bg-white/70 border-gray-200 focus:border-orange-400 w-full">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">
                      Individual
                    </SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                  </SelectContent>
                </Select>
                <ErrorMessage
                  name="businessType"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>

              <div className="space-y-2 animate-slide-right">
                <Label
                  htmlFor="experienceYears"
                  className="text-sm font-semibold text-gray-700 flex items-center space-x-1"
                >
                  <Briefcase className="h-4 w-4" />
                  <span>Established Year</span>
                </Label>
                <Field
                  name="experienceYears"
                  as={Input}
                  type="text"
                  placeholder="2025"
                  min="0"
                  max="50"
                  className={`${
                    errors.experienceYears && touched.experienceYears
                      ? "border-red-400"
                      : ""
                  } w-full`}
                />
                <ErrorMessage
                  name="experienceYears"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>
            </div>

            <div className="space-y-2 animate-slide-left">
              <Label
                htmlFor="bio"
                className="text-sm font-semibold text-gray-700 flex items-center space-x-1"
              >
                <FileText className="h-4 w-4" />
                <span>Bio (Optional)</span>
              </Label>
              <Field
                name="bio"
                as="textarea"
                placeholder="Tell us about your business..."
                rows={3}
                className={`w-full px-3 py-2 border border-gray-200 rounded-md focus:border-orange-400 focus:ring-orange-400/20 transition-all duration-300 ${
                  errors.bio && touched.bio ? "border-red-400" : ""
                }`}
              />
              <ErrorMessage
                name="bio"
                component="p"
                className="text-sm text-red-500"
              />
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 animate-slide-right">
                <Label
                  htmlFor="password"
                  className="text-sm font-semibold text-gray-700 flex items-center space-x-1"
                >
                  <Lock className="h-4 w-4" />
                  <span>Password</span>
                </Label>
                <div className="relative w-full">
                  <Field
                    name="password"
                    as={Input}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password"
                    className={`${
                      errors.password && touched.password
                        ? "border-red-400"
                        : ""
                    } pr-12 w-full`}
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

              <div className="space-y-2 animate-slide-left">
                <Label
                  htmlFor="confirmPassword"
                  className="text-sm font-semibold text-gray-700"
                >
                  Confirm Password
                </Label>
                <div className="relative w-full">
                  <Field
                    name="confirmPassword"
                    as={Input}
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    className={`${
                      errors.confirmPassword &&
                      touched.confirmPassword
                        ? "border-red-400"
                        : ""
                    } pr-12 w-full`}
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
                    className="text-orange-600 hover:text-orange-800 font-medium transition-colors underline"
                  >
                    Terms and Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-orange-600 hover:text-orange-800 font-medium transition-colors underline"
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
                  <Building2 className="h-4 w-4" />
                  <span>Create Owner Account</span>
                </div>
              )}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}