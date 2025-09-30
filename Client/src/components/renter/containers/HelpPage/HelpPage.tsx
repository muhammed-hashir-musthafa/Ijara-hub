"use client";

import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/base/ui/card";
import { Button } from "@/components/base/ui/button";
import { Badge } from "@/components/base/ui/badge";
import { Input } from "@/components/base/ui/input";
import {
  Search,
  HelpCircle,
  MessageCircle,
  CreditCard,
  Car,
  Home,
  Phone,
  Mail,
  ChevronRight,
  ChevronDown,
  Sparkles,
  //   BookOpen,s
  //   FileText,
  Headphones,
} from "lucide-react";

const faqCategories = [
  {
    id: "booking",
    title: "Booking & Reservations",
    icon: Home,
    gradient: "from-blue-500 to-cyan-500",
    count: 8,
    faqs: [
      {
        question: "How do I make a reservation?",
        answer:
          "You can make a reservation through our website or mobile app. Simply select your desired property or vehicle, choose your dates, and complete the booking process with secure payment.",
      },
      {
        question: "Can I modify or cancel my booking?",
        answer:
          "Yes, you can modify or cancel your booking up to 24 hours before your reservation starts. Cancellation policies may vary depending on the property or vehicle type.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards, debit cards, PayPal, and bank transfers. All payments are processed securely through encrypted channels.",
      },
    ],
  },
  {
    id: "vehicles",
    title: "Vehicle Rentals",
    icon: Car,
    gradient: "from-green-500 to-emerald-500",
    count: 6,
    faqs: [
      {
        question: "What documents do I need to rent a car?",
        answer:
          "You'll need a valid driver's license, passport or Emirates ID, and a credit card in the driver's name. International visitors may need an International Driving Permit.",
      },
      {
        question: "Is insurance included in the rental?",
        answer:
          "Basic insurance is included in all vehicle rentals. Additional comprehensive coverage options are available at competitive rates.",
      },
      {
        question: "What happens if I have an accident?",
        answer:
          "Contact our 24/7 emergency support immediately. We'll guide you through the process and arrange necessary assistance, including replacement vehicle if needed.",
      },
    ],
  },
  {
    id: "properties",
    title: "Property Rentals",
    icon: Home,
    gradient: "from-purple-500 to-pink-500",
    count: 7,
    faqs: [
      {
        question: "What amenities are included?",
        answer:
          "Amenities vary by property but typically include WiFi, air conditioning, fully equipped kitchen, and cleaning service. Check individual listings for specific details.",
      },
      {
        question: "Is there a minimum stay requirement?",
        answer:
          "Most properties have a minimum stay of 1-3 nights, though this varies by location and season. Luxury properties may require longer minimum stays.",
      },
      {
        question: "Can I bring pets?",
        answer:
          "Pet policies vary by property. Many of our listings are pet-friendly, but please check the property details and inform us during booking.",
      },
    ],
  },
  {
    id: "payment",
    title: "Payment & Billing",
    icon: CreditCard,
    gradient: "from-amber-500 to-orange-500",
    count: 5,
    faqs: [
      {
        question: "When will I be charged?",
        answer:
          "Payment is typically processed at the time of booking. For longer stays, we may offer installment payment options.",
      },
      {
        question: "Are there any hidden fees?",
        answer:
          "No, we believe in transparent pricing. All fees including taxes and service charges are clearly displayed before you complete your booking.",
      },
      {
        question: "Can I get a refund?",
        answer:
          "Refunds are available according to our cancellation policy. The refund amount depends on how far in advance you cancel your reservation.",
      },
    ],
  },
];

const supportOptions = [
  {
    icon: Phone,
    title: "Phone Support",
    description: "24/7 multilingual support",
    action: "Call Now",
    gradient: "from-amber-500 to-red-500",
    highlight: "+971 4 123 4567",
    link: "tel:+97141234567", // Direct call
    type: "phone",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Instant help from our team",
    action: "Start Chat",
    gradient: "from-amber-500 to-red-500",
    highlight: "Average response: 2 min",
    link: "https://wa.me/971501234567", // WhatsApp chat
    type: "chat",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Detailed assistance via email",
    action: "Send Email",
    gradient: "from-amber-500 to-red-500",
    highlight: "help@uaerentals.com",
    link: "mailto:help@uaerentals.com", // Opens email client
    type: "email",
  },
  {
    icon: MessageCircle,
    title: "Social Media",
    description: "Message us on social platforms",
    action: "Contact Us",
    gradient: "from-amber-500 to-red-500",
    highlight: "@uaerentals",
    link: "https://www.instagram.com/uaerentals", // Social link
    type: "social",
  },
];

// const helpResources = [
//   {
//     icon: BookOpen,
//     title: "User Guide",
//     description: "Complete guide to using our platform",
//     gradient: "from-indigo-500 to-purple-500",
//   },
//   {
//     icon: Video,
//     title: "Video Tutorials",
//     description: "Step-by-step video instructions",
//     gradient: "from-red-500 to-pink-500",
//   },
//   {
//     icon: FileText,
//     title: "Documentation",
//     description: "Detailed technical documentation",
//     gradient: "from-teal-500 to-cyan-500",
//   },
// ];

const HelpPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const helpRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToHelp = () => {
    helpRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredFaqs = faqCategories
    .map((category) => ({
      ...category,
      faqs: category.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((category) => category.faqs.length > 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 sm:pt-0">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-amber-500 animate-gradient-shift" />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-3 h-3 bg-white/30 rounded-full animate-float-slow"></div>
          <div className="absolute top-40 right-20 w-2 h-2 bg-white/40 rounded-full animate-float-fast"></div>
          <div className="absolute bottom-40 left-20 w-4 h-4 bg-white/20 rounded-full animate-float-slow"></div>
          <div className="absolute top-60 right-40 w-1 h-1 bg-white/50 rounded-full animate-float-fast"></div>
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
                Help & Support
              </Badge>
              <Sparkles className="h-6 w-6 text-amber-400 ml-3 animate-pulse" />
            </div>

            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up">
              We&apos;re Here to{" "}
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Help
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 font-light max-w-4xl mx-auto animate-fade-in-up animation-delay-300">
              Get instant answers to your questions or connect with our support
              team for personalized assistance
            </p>

            <div className="mt-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-500">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg rounded-xl border-0 shadow-lg bg-white/95 backdrop-blur-sm"
                />
              </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-700">
              <Button
                size="lg"
                onClick={scrollToHelp}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group px-8 py-4"
              >
                <HelpCircle className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
                Browse FAQ
                <ChevronRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-white text-amber-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group px-8 py-4"
              >
                <a
                  href="https://wa.me/971501234567"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
                  Start Live Chat
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get{" "}
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Instant
              </span>{" "}
              Support
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose your preferred way to get help from our expert support team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportOptions.map((option, index) => (
              <Card
                key={index}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`mx-auto w-16 h-16 bg-gradient-to-r ${option.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <option.icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {option.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {option.description}
                  </p>

                  <Badge className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-xs mb-4">
                    {option.highlight}
                  </Badge>

                  {/* Make the button clickable */}
                  <Button
                    asChild
                    size="sm"
                    className={`w-full bg-gradient-to-r ${option.gradient} text-white rounded-lg`}
                  >
                    <a
                      href={option.link}
                      target={option.type === "video" ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                    >
                      {option.action}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={helpRef} className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Find quick answers to common questions about our services
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Category Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-3">
                {faqCategories.map((category) => (
                  <Card
                    key={category.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      activeCategory === category.id
                        ? "ring-2 ring-amber-200 bg-amber-50"
                        : ""
                    }`}
                    onClick={() =>
                      setActiveCategory(
                        activeCategory === category.id ? null : category.id
                      )
                    }
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 bg-gradient-to-r ${category.gradient} rounded-lg`}
                        >
                          <category.icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-sm">
                            {category.title}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {category.count} questions
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* FAQ Content */}
            <div className="lg:col-span-3 space-y-4">
              {(activeCategory
                ? faqCategories.filter((cat) => cat.id === activeCategory)
                : filteredFaqs
              ).map((category) => (
                <div key={category.id}>
                  {!activeCategory && (
                    <div className="flex items-center mb-4">
                      <div
                        className={`p-3 bg-gradient-to-r ${category.gradient} rounded-xl mr-4`}
                      >
                        <category.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {category.title}
                      </h3>
                    </div>
                  )}

                  {category.faqs.map((faq, faqIndex) => (
                    <Card
                      key={`${category.id}-${faqIndex}`}
                      className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                      onClick={() =>
                        setExpandedFaq(
                          expandedFaq === `${category.id}-${faqIndex}`
                            ? null
                            : `${category.id}-${faqIndex}`
                        )
                      }
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-900 flex-1">
                            {faq.question}
                          </h4>
                          <ChevronDown
                            className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                              expandedFaq === `${category.id}-${faqIndex}`
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </div>

                        <div
                          className={`transition-all duration-300 overflow-hidden ${
                            expandedFaq === `${category.id}-${faqIndex}`
                              ? "mt-4 opacity-100"
                              : "mt-0 h-0 opacity-0"
                          }`}
                        >
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Help Resources */}
      {/* <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Additional{" "}
              <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Resources
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Explore our comprehensive help resources and guides
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {helpResources.map((resource, index) => (
              <Card
                key={index}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`mx-auto w-20 h-20 bg-gradient-to-r ${resource.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <resource.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{resource.description}</p>
                  <Button
                    className={`bg-gradient-to-r ${resource.gradient} text-white rounded-lg`}
                  >
                    Access Resource
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* Still Need Help CTA */}
      <section className="py-24 bg-gradient-to-r from-amber-500 to-orange-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <Headphones className="h-8 w-8 text-white mr-3 animate-pulse" />
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                Still Need Help?
              </h2>
              <Headphones className="h-8 w-8 text-white ml-3 animate-pulse" />
            </div>

            <p className="text-xl text-white/90 mb-8">
              Our support team is available 24/7 to assist you with any
              questions or concerns
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-amber-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group px-8 py-4"
              >
                <a
                  href="https://wa.me/971501234567"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
                  Start Live Chat
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-black hover:bg-white hover:text-amber-600 transition-all duration-300 transform hover:scale-105 group px-8 py-4 backdrop-blur-sm"
              >
                <a href="tel:+971501234567">
                  <Phone className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
                  Call Support
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-fast {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 10s ease infinite;
        }

        .animate-float-slow {
          animation: float-slow 3s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: float-fast 2s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </div>
  );
};

export default HelpPage;
