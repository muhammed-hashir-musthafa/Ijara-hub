"use client";

import React from "react";
import { Button } from "@/components/base/ui/button";
import { Input } from "@/components/base/ui/input";
import { Label } from "@/components/base/ui/label";
import { Textarea } from "@/components/base/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/base/ui/select";
import { Send } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ContactFormValues } from "@/types/form";

const validationSchema = Yup.object({
  name: Yup.string().required("Full name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9+\-\s]*$/, "Invalid phone number")
    .optional(),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
  service: Yup.string().required("Please select a service"),
});

interface ContactFormProps {
  onSubmit: (values: ContactFormValues, { resetForm }: { resetForm: () => void }) => void;
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        service: "",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form className="space-y-6">
          {/* Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Field
                as={Input}
                id="name"
                name="name"
                placeholder="Your full name"
                className="mt-2"
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Field
                as={Input}
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                className="mt-2"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>

          {/* Phone and Service */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Field
                as={Input}
                id="phone"
                name="phone"
                placeholder="+971 50 123 4567"
                className="mt-2"
              />
              <ErrorMessage
                name="phone"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <Label htmlFor="service">Service Interest *</Label>
              <Select
                value={values.service}
                onValueChange={(val) =>
                  setFieldValue("service", val)
                }
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rooms">
                    Room Rentals
                  </SelectItem>
                  <SelectItem value="cars">Car Rentals</SelectItem>
                  <SelectItem value="both">
                    Both Services
                  </SelectItem>
                  <SelectItem value="concierge">
                    Concierge Service
                  </SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <ErrorMessage
                name="service"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <Label htmlFor="subject">Subject *</Label>
            <Field
              as={Input}
              id="subject"
              name="subject"
              placeholder="How can we help you?"
              className="mt-2"
            />
            <ErrorMessage
              name="subject"
              component="p"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Message */}
          <div>
            <Label htmlFor="message">Message *</Label>
            <Field
              as={Textarea}
              id="message"
              name="message"
              rows={6}
              placeholder="Tell us more about your requirements..."
              className="mt-2"
            />
            <ErrorMessage
              name="message"
              component="p"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full md:w-auto bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <Send className="h-5 w-5 mr-3" />
            Send Message
          </Button>
        </Form>
      )}
    </Formik>
  );
}