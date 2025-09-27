"use client";

import { useEffect, useState } from "react";
import { ZoomIn } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface PortfolioGalleryProps {
  images: string[];
  photographerName: string;
}

export function PortfolioGallery({
  images,
  photographerName,
}: PortfolioGalleryProps) {
  const [current, setCurrent] = useState<number | null>(null);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (current === null || !api) return;
    setCurrent(api.selectedScrollSnap() + 1);
    api.scrollTo(current);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, current]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="group relative aspect-square overflow-hidden rounded-lg bg-muted cursor-pointer"
            onClick={() => setCurrent(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${photographerName} portfolio ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        ))}
      </div>

      <Dialog open={current !== null} onOpenChange={() => setCurrent(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Portfolio</DialogTitle>
            <DialogDescription className="text-center">
              These photos are part of {photographerName}&apos;s portfolio.
            </DialogDescription>
          </DialogHeader>
          <Carousel setApi={setApi} className="w-[85%] mx-auto">
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem
                  className="overflow-hidden relative rounded-xl"
                  key={index}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt=""
                    width="600"
                    height="600"
                    className="w-full h-full object-contain rounded-xl"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </DialogContent>
      </Dialog>
    </>
  );
}
