"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/base/ui/card";
import { Button } from "@/components/base/ui/button";
import { Badge } from "@/components/base/ui/badge";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Sparkles,
  ChevronRight,
  Send,
  Globe,
} from "lucide-react";
import Image from "next/image";
import { ContactFormValues } from "@/types/form";
import ContactForm from "@/components/base/forms/ContactForm";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: [
      "Dubai Marina Walk",
      "Dubai, United Arab Emirates",
      "PO Box 12345",
    ],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: [
      "+971 4 123 4567",
      "+971 50 123 4567",
      "24/7 Emergency: +971 4 999 8888",
    ],
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Mail,
    title: "Email Us",
    details: [
      "info@uaerentals.com",
      "support@uaerentals.com",
      "bookings@uaerentals.com",
    ],
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: [
      "Monday - Friday: 8:00 AM - 10:00 PM",
      "Saturday - Sunday: 9:00 AM - 9:00 PM",
      "24/7 Emergency Support",
    ],
    gradient: "from-amber-500 to-orange-500",
  },
];



const ContactPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const contactRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = (
    values: ContactFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    console.log("Form submitted:", values);
    resetForm();
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-0">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              width={1920}
              height={1080}
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop"
              alt="Modern office contact"
              className="w-full h-full object-cover scale-105 animate-slow-zoom"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-transparent to-purple-900/30" />
          </div>
        </div>

        <div
          className={`relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-6 w-6 text-amber-400 mr-3 animate-pulse" />
              <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-0 shadow-lg px-4 py-2 text-sm font-semibold">
                Contact Us
              </Badge>
              <Sparkles className="h-6 w-6 text-amber-400 ml-3 animate-pulse" />
            </div>

            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Get in{" "}
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 font-light max-w-4xl mx-auto">
              We&apos;re here to help you with all your luxury rental needs.
              Contact us today and experience exceptional service.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center sm:py-0 py-6">
              <Button
                size="lg"
                onClick={scrollToContact}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group px-8 py-4"
              >
                <Send className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
                Send Message
              </Button>
              <Button
                size="lg"
                onClick={scrollToContact}
                variant="outline"
                className="border-2 border-white text-black hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 group px-8 py-4 rounded-xl backdrop-blur-sm"
              >
                <Globe className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
                Learn About Culture
                <ChevronRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section
        ref={contactRef}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Card className="overflow-hidden bg-gradient-to-br from-white to-gray-50 shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                  Send us a Message
                </CardTitle>
                <p className="text-gray-600">
                  Fill out the form below and we&apos;ll get back to you within
                  24 hours.
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <ContactForm onSubmit={handleSubmit} />
              </CardContent>
            </Card>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className="overflow-hidden bg-gradient-to-br from-white to-gray-50 shadow-md"
              >
                <CardContent className="p-6 flex items-start space-x-4">
                  <div
                    className={`p-3 bg-gradient-to-r ${info.gradient} rounded-xl shadow-lg`}
                  >
                    <info.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-3">
                      {info.title}
                    </h3>
                    {info.details.map((detail, idx) => (
                      <p
                        key={idx}
                        className="text-sm text-gray-600 leading-relaxed"
                      >
                        {detail}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
