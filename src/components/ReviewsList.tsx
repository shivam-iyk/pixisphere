import { Star, Calendar, User2, StarHalf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Photographer } from "@/lib/types";

export function ReviewsList({ reviews }: { reviews: Photographer["reviews"] }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN");
  };

  if (reviews.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          No reviews yet. Be the first to leave a review!
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review, index) => (
        <Card key={index}>
          <CardContent>
            <div className="flex gap-4">
              <div className="border border-border rounded-full h-fit p-2">
                <User2 />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-card-foreground">
                      {review.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        {Array.from(
                          { length: Math.floor(review.rating) },
                          (_, idx) => (
                            <Star
                              className="fill-yellow-400 text-yellow-400"
                              size={16}
                              key={idx}
                            />
                          )
                        )}
                        {review.rating.toString().split(".") && (
                          <StarHalf
                            className="fill-yellow-400 text-yellow-400"
                            size={16}
                          />
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {review.rating} out of 5 stars
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(review.date)}</span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {review.comment}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
