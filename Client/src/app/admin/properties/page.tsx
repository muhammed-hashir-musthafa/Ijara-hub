"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/base/ui/card";
import { Badge } from "@/components/base/ui/badge";
import { Button } from "@/components/base/ui/button";
import { Input } from "@/components/base/ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/base/ui/avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/base/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/base/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/base/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/base/ui/dialog";
import { Textarea } from "@/components/base/ui/textarea";
import { useTranslation, type Language } from "@/lib/i18n";
import {
  Building2,
  Search,
  Filter,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  MapPin,
  DollarSign,
  Car,
  Home,
  Star,
  AlertTriangle,
} from "lucide-react";
import Image from "next/image";

type Property = {
  id: string;
  title: string;
  type: "room" | "car";
  price: string;
  location: string;
  owner: {
    name: string;
    email: string;
    avatar: string;
  };
  status: "pending" | "approved" | "rejected";
  submittedDate: string;
  images: string[];
  rating: number;
  reviews: number;
  amenities: string[];
  description: string;
  rejectionReason?: string;
};

export default function PropertyManagementPage() {
  const [lang] = useState<Language>("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );
  const [rejectionReason, setRejectionReason] = useState("");
  const t = useTranslation(lang);

  const propertyStats = [
    {
      title: t.allProperties,
      value: "3,421",
      change: "+89 this week",
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: t.pendingApproval,
      value: "8",
      change: "Requires review",
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: t.approvedProperties,
      value: "3,156",
      change: "92% approval rate",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: t.rejectedProperties,
      value: "257",
      change: "8% rejection rate",
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

const mockProperties: Property[] = [
    {
      id: "1",
      title: "Luxury Villa in Palm Jumeirah",
      type: "room",
      price: "AED 2,500/night",
      location: "Palm Jumeirah, Dubai",
      owner: {
        name: "Ahmed Al-Rashid",
        email: "ahmed.rashid@email.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "pending",
      submittedDate: "2024-01-15T10:30:00Z",
      images: ["/luxury-hotel-suite-dubai-burj-khalifa-view.jpg"],
      rating: 0,
      reviews: 0,
      amenities: ["WiFi", "Pool", "Parking", "AC"],
      description:
        "Stunning luxury villa with private beach access and panoramic views of Dubai skyline.",
    },
    {
      id: "2",
      title: "BMW X5 - Premium SUV",
      type: "car",
      price: "AED 400/day",
      location: "Dubai Marina, Dubai",
      owner: {
        name: "Sarah Johnson",
        email: "sarah.johnson@email.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "approved",
      submittedDate: "2024-01-10T14:20:00Z",
      images: ["/mercedes-s-class-luxury-sedan-black.jpg"],
      rating: 4.8,
      reviews: 24,
      amenities: ["GPS", "Bluetooth", "Leather Seats", "Sunroof"],
      description:
        "Premium BMW X5 in excellent condition with full insurance coverage.",
    },
    {
      id: "3",
      title: "Modern Apartment in Business Bay",
      type: "room",
      price: "AED 800/night",
      location: "Business Bay, Dubai",
      owner: {
        name: "Mohammed Hassan",
        email: "mohammed.hassan@email.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "rejected",
      submittedDate: "2024-01-08T09:15:00Z",
      images: ["/luxury-penthouse-dubai-marina-modern-interior.jpg"],
      rating: 0,
      reviews: 0,
      amenities: ["WiFi", "Gym", "Pool", "Concierge"],
      description:
        "Modern 2-bedroom apartment with city views and premium amenities.",
      rejectionReason:
        "Insufficient documentation provided. Please submit property ownership documents.",
    },
    {
      id: "4",
      title: "Mercedes S-Class Luxury Sedan",
      type: "car",
      price: "AED 600/day",
      location: "DIFC, Dubai",
      owner: {
        name: "Khalid Al-Mansoori",
        email: "khalid.mansoori@email.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "approved",
      submittedDate: "2024-01-05T16:45:00Z",
      images: ["/mercedes-s-class-luxury-sedan-black.jpg"],
      rating: 4.9,
      reviews: 18,
      amenities: [
        "Chauffeur Available",
        "Premium Sound",
        "Massage Seats",
        "WiFi",
      ],
      description:
        "Executive Mercedes S-Class with professional chauffeur service available.",
    },
    {
      id: "5",
      title: "Penthouse Suite with Burj Khalifa View",
      type: "room",
      price: "AED 5,000/night",
      location: "Downtown Dubai, Dubai",
      owner: {
        name: "Emma Wilson",
        email: "emma.wilson@email.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "pending",
      submittedDate: "2024-01-12T11:30:00Z",
      images: ["/luxury-hotel-suite-dubai-burj-khalifa-view.jpg"],
      rating: 0,
      reviews: 0,
      amenities: ["Butler Service", "Private Elevator", "Jacuzzi", "City View"],
      description:
        "Ultra-luxury penthouse with unobstructed Burj Khalifa views and premium services.",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPropertyIcon = (type: string) => {
    return type === "car" ? (
      <Car className="h-4 w-4 text-blue-500" />
    ) : (
      <Home className="h-4 w-4 text-purple-500" />
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredProperties = mockProperties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.owner.name.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "pending")
      return matchesSearch && property.status === "pending";
    if (activeTab === "approved")
      return matchesSearch && property.status === "approved";
    if (activeTab === "rejected")
      return matchesSearch && property.status === "rejected";
    if (activeTab === "rooms") return matchesSearch && property.type === "room";
    if (activeTab === "cars") return matchesSearch && property.type === "car";

    return matchesSearch;
  });

  const handleApprove = (propertyId: string) => {
    console.log("[v0] Approving property:", propertyId);
    // TODO: Implement property approval logic
  };

  const handleReject = (propertyId: string, reason: string) => {
    console.log("[v0] Rejecting property:", propertyId, "Reason:", reason);
    // TODO: Implement property rejection logic
    setRejectionReason("");
    setSelectedProperty(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {t.propertyManagement}
          </h1>
          <p className="text-muted-foreground">
            Review and manage property listings on the platform
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Building2 className="h-4 w-4 mr-2" />
          Export Properties
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {propertyStats.map((stat) => (
          <Card key={stat.title} className="border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Property Management Interface */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Property Directory
          </CardTitle>
          <CardDescription>
            Review, approve, and manage all property listings
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Property Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">All Properties</TabsTrigger>
              <TabsTrigger value="pending">
                Pending
                {mockProperties.filter((p) => p.status === "pending").length >
                  0 && (
                  <Badge
                    variant="destructive"
                    className="ml-2 h-5 w-5 p-0 text-xs"
                  >
                    {
                      mockProperties.filter((p) => p.status === "pending")
                        .length
                    }
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
              <TabsTrigger value="rooms">Rooms</TabsTrigger>
              <TabsTrigger value="cars">Cars</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {/* Properties Table */}
              <div className="rounded-md border border-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Property</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProperties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Image
                              width={48}
                              height={48}
                              src={property.images[0] || "/placeholder.svg"}
                              alt={property.title}
                              className="h-12 w-12 rounded-lg object-cover"
                            />
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-foreground">
                                {property.title}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                <span>{property.location}</span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={
                                  property.owner.avatar || "/placeholder.svg"
                                }
                                alt={property.owner.name}
                              />
                              <AvatarFallback>
                                {property.owner.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">
                                {property.owner.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {property.owner.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getPropertyIcon(property.type)}
                            <span className="text-sm capitalize">
                              {property.type}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3 text-green-500" />
                            <span className="text-sm font-medium">
                              {property.price}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(property.status)}</TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">
                            {formatDate(property.submittedDate)}
                          </span>
                        </TableCell>
                        <TableCell>
                          {property.rating > 0 ? (
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">{property.rating}</span>
                              <span className="text-xs text-muted-foreground">
                                ({property.reviews})
                              </span>
                            </div>
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              No reviews
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {property.status === "pending" && (
                                <>
                                  <DropdownMenuItem
                                    className="text-green-600"
                                    onClick={() => handleApprove(property.id)}
                                  >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Approve Property
                                  </DropdownMenuItem>
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <DropdownMenuItem
                                        className="text-red-600"
                                        onSelect={(e) => {
                                          e.preventDefault();
                                          setSelectedProperty(property);
                                        }}
                                      >
                                        <XCircle className="h-4 w-4 mr-2" />
                                        Reject Property
                                      </DropdownMenuItem>
                                    </DialogTrigger>
                                  </Dialog>
                                </>
                              )}
                              {property.status === "rejected" && (
                                <DropdownMenuItem className="text-green-600">
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Reconsider Approval
                                </DropdownMenuItem>
                              )}
                              {property.status === "approved" && (
                                <DropdownMenuItem className="text-red-600">
                                  <AlertTriangle className="h-4 w-4 mr-2" />
                                  Flag Property
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredProperties.length} of {mockProperties.length}{" "}
                  properties
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Rejection Dialog */}
      {selectedProperty && (
        <Dialog
          open={!!selectedProperty}
          onOpenChange={() => setSelectedProperty(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Property</DialogTitle>
              <DialogDescription>
                Please provide a reason for rejecting &quot;{selectedProperty.title}
                &quot;. This will be sent to the property owner.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                placeholder="Enter rejection reason..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setSelectedProperty(null)}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() =>
                  handleReject(selectedProperty.id, rejectionReason)
                }
                disabled={!rejectionReason.trim()}
              >
                Reject Property
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
