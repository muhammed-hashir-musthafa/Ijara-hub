"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
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
  Users,
  Search,
  Filter,
  MoreHorizontal,
  UserCheck,
  UserX,
  Shield,
  Building2,
  Mail,
  MapPin,
  CheckCircle,
  Clock,
} from "lucide-react";
import { getUsers, deleteUser } from "@/services/userService";
import { User } from "@/types/auth";

export default function UserManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await getUsers();
      setUsers(response.users);
    } catch (error: unknown) {
      toast.error("Failed to load users. Please try again.");
      console.error("Error fetching users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Failed to delete user");
      } else {
        toast.error("Failed to delete user");
      }
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const userStats = [
    {
      title: "Total Users",
      value: users.length.toString(),
      change: "+247 this week",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Users",
      value: users.filter((u) => u.isActive).length.toString(),
      change: "87% active rate",
      icon: UserCheck,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Property Owners",
      value: users.filter((u) => u.role === "owner").length.toString(),
      change: "+89 this week",
      icon: Building2,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Suspended Users",
      value: users.filter((u) => !u.isActive).length.toString(),
      change: "1.2% of total",
      icon: UserX,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ];

  const getStatusBadge = (user: User) => {
    if (!user.isActive) {
      return <Badge variant="destructive">Suspended</Badge>;
    }
    if (!user.isVerified) {
      return <Badge variant="secondary">Pending Verification</Badge>;
    }
    return (
      <Badge variant="default" className="bg-green-100 text-green-800">
        Active
      </Badge>
    );
  };

  const getVerificationIcon = (isVerified: boolean) => {
    return isVerified ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <Clock className="h-4 w-4 text-yellow-500" />
    );
  };

  const getRoleIcon = (role: string) => {
    return role === "owner" ? (
      <Building2 className="h-4 w-4 text-purple-500" />
    ) : (
      <Users className="h-4 w-4 text-blue-500" />
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active") return matchesSearch && user.isActive;
    if (activeTab === "pending") return matchesSearch && !user.isVerified;
    if (activeTab === "suspended") return matchesSearch && !user.isActive;
    if (activeTab === "owners") return matchesSearch && user.role === "owner";
    if (activeTab === "renters") return matchesSearch && user.role === "renter";

    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            User Management
          </h1>
          <p className="text-muted-foreground">
            Manage platform users and their permissions
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Users className="h-4 w-4 mr-2" />
          Export Users
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {userStats.map((stat) => (
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

      {/* User Management Interface */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            User Directory
          </CardTitle>
          <CardDescription>
            Search, filter, and manage all platform users
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search users..."
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

          {/* User Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">All Users</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="suspended">Suspended</TabsTrigger>
              <TabsTrigger value="owners">Owners</TabsTrigger>
              <TabsTrigger value="renters">Renters</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="space-y-4">
              {/* Users Table */}
              <div className="rounded-md border border-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Verification</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Properties</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading
                      ? [...Array(5)].map((_, i) => (
                          <TableRow key={i}>
                            <TableCell colSpan={7}>
                              <div className="flex items-center space-x-4 animate-pulse">
                                <div className="rounded-full bg-gray-200 h-10 w-10"></div>
                                <div className="space-y-2 flex-1">
                                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      : filteredUsers.map((user) => (
                          <TableRow key={user.customId}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage
                                    src={
                                      user.profileImage || "/placeholder.svg"
                                    }
                                    alt={`${user.fname} ${user.lname}`}
                                  />
                                  <AvatarFallback>
                                    {user.fname[0]}
                                    {user.lname[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                  <p className="text-sm font-medium text-foreground">
                                    {user.fname} {user.lname}
                                  </p>
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Mail className="h-3 w-3" />
                                    <span>{user.email}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <MapPin className="h-3 w-3" />
                                    <span>{user.address?.city || "UAE"}</span>
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getRoleIcon(user.role)}
                                <span className="text-sm capitalize">
                                  {user.role}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(user)}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getVerificationIcon(user.isVerified)}
                                <span className="text-sm">
                                  {user.isVerified ? "Verified" : "Pending"}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm text-muted-foreground">
                                {user.lastLogin
                                  ? formatDate(user.lastLogin.toString())
                                  : "Never"}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm">-</span>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    className="h-8 w-8 p-0"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem>
                                    <Shield className="h-4 w-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Mail className="h-4 w-4 mr-2" />
                                    Send Message
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() =>
                                      handleDeleteUser(user.customId)
                                    }
                                  >
                                    <UserX className="h-4 w-4 mr-2" />
                                    Delete User
                                  </DropdownMenuItem>
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
                  Showing {filteredUsers.length} of {users.length} users
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
    </div>
  );
}
