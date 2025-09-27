"use client";

import usePhotographers from "@/lib/store";
import { useEffect, useState } from "react";
import { Star, MapPin, Camera, Calendar, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { ReviewsList } from "@/components/ReviewsList";
import { EnquiryModal } from "@/components/EnquiryModal";
import { notFound, useParams } from "next/navigation";
import ProfileSkeleton from "@/components/ProfileSkeleton";
import { formatPrice } from "@/lib/helpers";

function Page() {
  const { id } = useParams<{ id: string }>();
  const { photographer, loading, getPhotographer } = usePhotographers();

  const [hasInitialized, setHasInitialized] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  useEffect(() => {
    if (!photographer || photographer.id !== parseInt(id)) {
      getPhotographer(id);
    }
    setHasInitialized(true);
  }, [id]);

  if (!hasInitialized || loading) {
    return <ProfileSkeleton />;
  }

  if (!photographer) {
    return notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="px-4 pt-10 pb-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row gap-6">
              <Avatar className="h-40 w-40 ring-4 ring-border">
                <AvatarImage
                  src={photographer.profilePic || "/placeholder.svg"}
                  alt={photographer.name}
                  className="object-cover"
                />
                <AvatarFallback className="bg-muted text-muted-foreground text-2xl">
                  <Camera className="h-12 w-12" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-3xl font-bold tracking-tight mb-2">
                  {photographer.name}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{photographer.location}</span>
                  </div>
                  <Badge className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{photographer.rating}</span>
                  </Badge>
                </div>
                <p className="text-muted-foreground text-lg mb-6">
                  {photographer.bio}
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium tracking-tight mb-2">
                      Photography Styles
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {photographer.styles.map((style) => (
                        <Badge key={style} variant="secondary">
                          {style}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium tracking-tight mb-2">
                      Specializes In
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {photographer.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Card className="lg:w-80 w-full">
            <CardHeader>
              <CardTitle className="text-center">
                Book This Photographer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {formatPrice(photographer.price)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Starting price
                </div>
              </div>
              <Separator />
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Camera className="h-4 w-4 text-muted-foreground" />
                  <span>Professional equipment included</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Flexible scheduling available</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                  <span>Free consultation call</span>
                </div>
              </div>
              <Button
                onClick={() => setIsEnquiryOpen(true)}
                className="w-full"
                size="lg"
              >
                Send Enquiry
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Get a personalized quote based on your specific needs
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Separator />
      <div className="px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-6">
                Portfolio
              </h2>
              <PortfolioGallery
                images={photographer.portfolio}
                photographerName={photographer.name}
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight mb-6">
                Reviews ({photographer.reviews.length})
              </h2>
              <ReviewsList reviews={photographer.reviews} />
            </div>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Average Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{photographer.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Total Reviews</span>
                  <span className="font-medium">
                    {photographer.reviews.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Starting Price</span>
                  <span className="font-medium">{photographer.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium">{photographer.location}</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Get In Touch</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">
                  Ready to book your session? Send an Enquiry to get started
                  with your photography journey.
                </p>
                <Button
                  onClick={() => setIsEnquiryOpen(true)}
                  variant="secondary"
                  className="w-full"
                >
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        photographer={photographer}
      />
    </div>
  );
}

export default Page;
