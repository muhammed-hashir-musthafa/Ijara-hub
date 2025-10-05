"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/base/ui/card"
import { Badge } from "@/components/base/ui/badge"
import { Button } from "@/components/base/ui/button"
import { Progress } from "@/components/base/ui/progress"
import { useTranslation, type Language } from "@/lib/i18n"
import {
  Users,
  Building2,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  Shield,
  Database,
} from "lucide-react"

export default function AdminDashboardPage() {
  const [lang] = useState<Language>("en")
  const t = useTranslation(lang)

  const systemStats = [
    {
      title: t.totalUsers,
      value: "12,847",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Active platform users",
    },
    {
      title: t.totalProperties,
      value: "3,421",
      change: "+8.2%",
      trend: "up",
      icon: Building2,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      description: "Listed properties",
    },
    {
      title: t.totalBookings,
      value: "28,394",
      change: "+15.3%",
      trend: "up",
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Completed bookings",
    },
    {
      title: t.totalRevenue,
      value: "AED 2.4M",
      change: "+18.7%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Platform revenue",
    },
  ]

  const systemHealth = [
    {
      name: "API Response Time",
      value: 145,
      max: 200,
      status: "healthy",
      unit: "ms",
    },
    {
      name: "Database Performance",
      value: 78,
      max: 100,
      status: "healthy",
      unit: "%",
    },
    {
      name: "Server Load",
      value: 65,
      max: 100,
      status: "warning",
      unit: "%",
    },
    {
      name: "Storage Usage",
      value: 42,
      max: 100,
      status: "healthy",
      unit: "%",
    },
  ]

  const recentActivities = [
    {
      id: "1",
      type: "user_registration",
      message: "New property owner registered: Ahmed Al-Rashid",
      timestamp: "2 minutes ago",
      status: "info",
    },
    {
      id: "2",
      type: "property_approval",
      message: "Property approved: Luxury Villa in Palm Jumeirah",
      timestamp: "5 minutes ago",
      status: "success",
    },
    {
      id: "3",
      type: "payment_dispute",
      message: "Payment dispute reported for booking #12847",
      timestamp: "12 minutes ago",
      status: "warning",
    },
    {
      id: "4",
      type: "system_alert",
      message: "High server load detected on Node 3",
      timestamp: "18 minutes ago",
      status: "error",
    },
    {
      id: "5",
      type: "user_verification",
      message: "Emirates ID verified for user: Sarah Johnson",
      timestamp: "25 minutes ago",
      status: "success",
    },
  ]

  const pendingActions = [
    {
      title: "Property Approvals",
      count: 8,
      description: "Properties awaiting approval",
      action: "Review",
      href: "/admin/properties?status=pending",
      priority: "high",
    },
    {
      title: "User Verifications",
      count: 23,
      description: "Identity verifications pending",
      action: "Process",
      href: "/admin/users?tab=verifications",
      priority: "medium",
    },
    {
      title: "Reported Content",
      count: 3,
      description: "Properties reported by users",
      action: "Investigate",
      href: "/admin/reports",
      priority: "high",
    },
    {
      title: "Payment Issues",
      count: 5,
      description: "Payment disputes to resolve",
      action: "Resolve",
      href: "/admin/payments/disputes",
      priority: "medium",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Activity className="h-4 w-4 text-blue-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Overview</h1>
          <p className="text-muted-foreground">Monitor and manage your Ijara Hub platform</p>
        </div>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-primary">Super Admin Access</span>
        </div>
      </div>

      {/* System Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat) => (
          <Card key={stat.title} className="border-border/50 hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>{stat.change}</span>
                <span>from last month</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Health */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              System Health
            </CardTitle>
            <CardDescription>Real-time system performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemHealth.map((metric) => (
              <div key={metric.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">{metric.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">
                      {metric.value}
                      {metric.unit}
                    </span>
                    <Badge variant={metric.status === "healthy" ? "default" : "destructive"} className="text-xs">
                      {metric.status}
                    </Badge>
                  </div>
                </div>
                <Progress
                  value={(metric.value / metric.max) * 100}
                  className={`h-2 ${
                    metric.status === "warning"
                      ? "[&>div]:bg-yellow-500"
                      : metric.status === "error"
                        ? "[&>div]:bg-red-500"
                        : "[&>div]:bg-green-500"
                  }`}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Pending Actions */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Pending Actions
            </CardTitle>
            <CardDescription>Items requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingActions.map((action) => (
              <div
                key={action.title}
                className={`p-3 rounded-lg border ${getPriorityColor(action.priority)} bg-opacity-50`}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{action.title}</span>
                      <Badge variant="outline" className="text-xs">
                        {action.count}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs bg-transparent">
                    {action.action}
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Recent System Activities
          </CardTitle>
          <CardDescription>Latest platform events and admin actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                {getStatusIcon(activity.status)}
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-foreground">{activity.message}</p>
                  <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <Button variant="outline" className="w-full bg-transparent">
              View All Activities
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
