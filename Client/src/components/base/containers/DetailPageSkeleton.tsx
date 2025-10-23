import { Skeleton } from "@/components/base/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/base/ui/card";

export default function DetailPageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      {/* Hero Header Skeleton */}
      <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-32" />
              </div>
              <Skeleton className="h-12 w-3/4 mb-4" />
              <div className="flex items-center space-x-6 mb-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-32" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-20" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery Skeleton */}
            <Skeleton className="w-full h-96 rounded-2xl" />

            {/* Stats Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <Card key={index} className="p-6 text-center">
                  <Skeleton className="h-8 w-8 mx-auto mb-3 rounded-full" />
                  <Skeleton className="h-4 w-16 mx-auto" />
                </Card>
              ))}
            </div>

            {/* Tabs Skeleton */}
            <div className="flex space-x-6 border-b border-gray-200">
              {[...Array(3)].map((_, index) => (
                <Skeleton key={index} className="h-12 w-24" />
              ))}
            </div>

            {/* Content Skeleton */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <Skeleton className="h-8 w-48" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Skeleton className="h-8 w-56" />
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, index) => (
                      <div key={index} className="flex items-center space-x-3 p-4">
                        <Skeleton className="h-2 w-2 rounded-full" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <Skeleton className="h-8 w-32 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-6" />
              <Skeleton className="h-12 w-full" />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}