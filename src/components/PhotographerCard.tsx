import { Star, MapPin, Camera } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Photographer } from "@/lib/types";
import { formatPrice } from "@/lib/helpers";

export function PhotographerCard({
  photographer,
}: {
  photographer: Photographer;
}) {

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20 bg-card">
      <CardHeader className="px-4 py-2">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 ring-2 ring-border">
            <AvatarImage
              src={photographer.profilePic}
              alt={photographer.name}
              className="object-cover"
            />
            <AvatarFallback className="bg-muted text-muted-foreground">
              <Camera className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-card-foreground group-hover:text-primary transition-colors">
              {photographer.name}
            </h3>
            <div className="flex items-center gap-1 text-muted-foreground mb-2">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{photographer.location}</span>
            </div>
            <Badge className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-sm">{photographer.rating}</span>
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="text-2xl font-bold text-primary">
            {formatPrice(photographer.price)}
          </div>
          <div className="text-sm text-muted-foreground">Starting price</div>
        </div>
        <div>
          <div className="text-sm font-medium text-card-foreground mb-2">
            Styles
          </div>
          <div className="flex flex-wrap gap-2">
            {photographer.styles.map((style) => (
              <Badge key={style} variant="secondary" className="text-xs">
                {style}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm font-medium text-card-foreground mb-2">
            Specializes in
          </div>
          <div className="flex flex-wrap gap-2">
            {photographer.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {photographer.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{photographer.tags.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link className="w-full" href={`/photographer/${photographer.id}`}>
          <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            View Profile
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
