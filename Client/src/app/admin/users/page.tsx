"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/base/ui/card"
import { Badge } from "@/components/base/ui/badge"
import { Button } from "@/components/base/ui/button"
import { Input } from "@/components/base/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/base/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/base/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/base/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/base/ui/table"
import { useTranslation, type Language } from "@/lib/i18n"
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
} from "lucide-react"

export default function UserManagementPage() {
  const [lang] = useState<Language>("en")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const t = useTranslation(lang)

  const userStats = [
    {
      title: t.totalUsers,
      value: "12,847",
      change: "+247 this week",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: t.activeUsers,
      value: "11,203",
      change: "87% active rate",
      icon: UserCheck,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Property Owners",
      value: "3,421",
      change: "+89 this week",
      icon: Building2,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: t.suspendedUsers,
      value: "156",
      change: "1.2% of total",
      icon: UserX,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
  ]

  const mockUsers = [
    {
      id: "1",
      firstName: "Ahmed",
      lastName: "Al-Rashid",
      email: "ahmed.rashid@email.com",
      phoneNumber: "+971 50 123 4567",
      role: "owner" as const,
      isVerified: true,
      status: "active" as const,
      lastLogin: "2024-01-15T10:30:00Z",
      registrationDate: "2023-08-15T14:20:00Z",
      location: "Dubai, UAE",
      properties: 5,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@email.com",
      phoneNumber: "+971 55 987 6543",
      role: "renter" as const,
      isVerified: true,
      status: "active" as const,
      lastLogin: "2024-01-14T16:45:00Z",
      registrationDate: "2023-11-22T09:15:00Z",
      location: "Abu Dhabi, UAE",
      properties: 0,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      firstName: "Mohammed",
      lastName: "Hassan",
      email: "mohammed.hassan@email.com",
      phoneNumber: "+971 52 456 7890",
      role: "owner" as const,
      isVerified: false,
      status: "pending" as const,
      lastLogin: "2024-01-13T12:20:00Z",
      registrationDate: "2024-01-10T11:30:00Z",
      location: "Sharjah, UAE",
      properties: 2,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "4",
      firstName: "Emma",
      lastName: "Wilson",
      email: "emma.wilson@email.com",
      phoneNumber: "+971 56 234 5678",
      role: "renter" as const,
      isVerified: true,
      status: "suspended" as const,
      lastLogin: "2024-01-05T08:15:00Z",
      registrationDate: "2023-09-30T13:45:00Z",
      location: "Dubai, UAE",
      properties: 0,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "5",
      firstName: "Khalid",
      lastName: "Al-Mansoori",
      email: "khalid.mansoori@email.com",
      phoneNumber: "+971 50 345 6789",
      role: "owner" as const,
      isVerified: true,
      status: "active" as const,
      lastLogin: "2024-01-15T14:10:00Z",
      registrationDate: "2023-06-12T16:20:00Z",
      location: "Abu Dhabi, UAE",
      properties: 12,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const getStatusBadge = (status: string, isVerified: boolean) => {
    if (status === "suspended") {
      return <Badge variant="destructive">Suspended</Badge>
    }
    if (status === "pending" || !isVerified) {
      return <Badge variant="secondary">Pending Verification</Badge>
    }
    return (
      <Badge variant="default" className="bg-green-100 text-green-800">
        Active
      </Badge>
    )
  }

  const getVerificationIcon = (isVerified: boolean) => {
    return isVerified ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <Clock className="h-4 w-4 text-yellow-500" />
    )
  }

  const getRoleIcon = (role: string) => {
    return role === "owner" ? (
      <Building2 className="h-4 w-4 text-purple-500" />
    ) : (
      <Users className="h-4 w-4 text-blue-500" />
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "active") return matchesSearch && user.status === "active"
    if (activeTab === "pending") return matchesSearch && (user.status === "pending" || !user.isVerified)
    if (activeTab === "suspended") return matchesSearch && user.status === "suspended"
    if (activeTab === "owners") return matchesSearch && user.role === "owner"
    if (activeTab === "renters") return matchesSearch && user.role === "renter"

    return matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t.userManagement}</h1>
          <p className="text-muted-foreground">Manage platform users and their permissions</p>
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
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
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
          <CardDescription>Search, filter, and manage all platform users</CardDescription>
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
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
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
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={user.avatar || "/placeholder.svg"}
                                alt={`${user.firstName} ${user.lastName}`}
                              />
                              <AvatarFallback>
                                {user.firstName[0]}
                                {user.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                              <p className="text-sm font-medium text-foreground">
                                {user.firstName} {user.lastName}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Mail className="h-3 w-3" />
                                <span>{user.email}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                <span>{user.location}</span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getRoleIcon(user.role)}
                            <span className="text-sm capitalize">{user.role}</span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(user.status, user.isVerified)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getVerificationIcon(user.isVerified)}
                            <span className="text-sm">{user.isVerified ? "Verified" : "Pending"}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-muted-foreground">{formatDate(user.lastLogin)}</span>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{user.properties}</span>
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
                                <Shield className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="h-4 w-4 mr-2" />
                                Send Message
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {user.status === "suspended" ? (
                                <DropdownMenuItem className="text-green-600">
                                  <UserCheck className="h-4 w-4 mr-2" />
                                  Activate User
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem className="text-red-600">
                                  <UserX className="h-4 w-4 mr-2" />
                                  Suspend User
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
                  Showing {filteredUsers.length} of {mockUsers.length} users
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
  )
}
