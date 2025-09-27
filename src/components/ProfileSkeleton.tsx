import React from "react";
import { Skeleton } from "./ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";

function ProfileSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="px-4 pt-10 pb-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row gap-6">
              <Skeleton className="h-40 w-40 ring-4 ring-border rounded-full" />
              <div className="flex-1 space-y-4">
                <Skeleton className="w-40 h-7" />
                <div className="flex items-center gap-4 mb-6">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-10" />
                </div>
                <Skeleton className="w-80 h-6 mb-6" />
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-25" />
                    <div className="flex flex-wrap gap-2">
                      <Skeleton className="h-5 w-10" />
                      <Skeleton className="h-5 w-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-25" />
                    <div className="flex flex-wrap gap-2">
                      <Skeleton className="h-5 w-10" />
                      <Skeleton className="h-5 w-10" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Card className="w-80">
            <CardHeader>
              <CardTitle className="flex justify-center items-center">
                <Skeleton className="w-40 h-6" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-2 items-center justify-center">
                <Skeleton className="w-36 h-10" />
                <Skeleton className="w-24 h-4" />
              </div>
              <Separator />
              <div className="space-y-3 text-sm">
                <Skeleton className="w-48 h-4" />
                <Skeleton className="w-48 h-4" />
                <Skeleton className="w-48 h-4" />
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-4">
              <Skeleton className="w-full h-10 rounded-lg" />
              <Skeleton className="w-[80%] h-4 mx-auto" />
            </CardFooter>
          </Card>
        </div>
      </div>
      <Separator />
      <div className="px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-8">
              <Skeleton className="w-32 h-7" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 2 }).map((_, index) => (
                  <Skeleton
                    className="aspect-square overflow-hidden rounded-lg"
                    key={index}
                  />
                ))}
              </div>
            </div>
            <Skeleton className="lg:w-40 w-full h-7 mb-6" />
            <div className="space-y-4">
              <Card>
                <CardContent>
                  <div className="flex gap-4">
                    <Skeleton className="w-12 h-12 rounded-full" />
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-2">
                          <Skeleton className="w-16 h-5" />
                          <div className="flex items-center gap-2">
                            <Skeleton className="w-20 h-4" />
                            <Skeleton className="w-20 h-4" />
                          </div>
                        </div>
                        <Skeleton className="w-32 h-5" />
                      </div>
                      <Skeleton className="w-full h-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="w-28 h-6" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="w-32 h-5" />
                  <Skeleton className="w-8 h-5" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="w-32 h-5" />
                  <Skeleton className="w-8 h-5" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="w-32 h-5" />
                  <Skeleton className="w-8 h-5" />
                </div>
                <div className="flex items-center justify-between">
                  <Skeleton className="w-32 h-5" />
                  <Skeleton className="w-8 h-5" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="w-32 h-6" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="w-full h-3" />
                <Skeleton className="w-1/2 h-3" />
              </CardContent>
              <CardFooter>
                <Skeleton className="w-full h-10 rounded-lg" />
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSkeleton;
