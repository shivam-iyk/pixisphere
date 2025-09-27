"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SearchBar } from "@/components/SearchBar";
import { Filters } from "@/lib/types";
import usePhotographers from "@/lib/store";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "./ui/label";

const FiltersContent = ({ filtersActive }: { filtersActive: number }) => {
  const { filters, photographers, setFilters } = usePhotographers();
  const [styles, setStyles] = useState<string[]>([]);

  useMemo(() => {
    const uniqueStyles = Array.from(
      new Set(photographers.flatMap(({ styles }) => styles))
    );
    setStyles(uniqueStyles);
  }, [photographers]);

  return (
    <div className="space-y-6 px-4">
      <div>
        <label className="text-sm font-medium text-card-foreground mb-3 block">
          Price Range
        </label>
        <div className="px-2 space-y-2">
          <Slider
            value={filters.priceRange}
            onValueChange={(value: [number, number]) =>
              setFilters({ ...filters, priceRange: value })
            }
            max={25000}
            min={0}
            step={1000}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{filters.priceRange[0]}</span>
            <span>{filters.priceRange[1]}</span>
          </div>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-card-foreground mb-3 block">
          Minimum Rating
        </label>
        <RadioGroup
          value={filters.rating.toString()}
          onValueChange={(value) =>
            setFilters({
              ...filters,
              rating: Number(value),
            })
          }
        >
          {[4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <RadioGroupItem
                id={`rating-${rating}`}
                value={rating.toString()}
                checked={filters.rating === rating}
              />
              <Label htmlFor={`rating-${rating}`}>{rating}+ Stars</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div>
        <label className="text-sm font-medium text-card-foreground mb-3 block">
          Photography Styles
        </label>
        <div className="space-y-2">
          {styles.map((style) => (
            <div key={style} className="flex items-center space-x-2">
              <Checkbox
                id={`style-${style}`}
                checked={filters.selectedStyles.includes(style)}
                onCheckedChange={() =>
                  setFilters({
                    ...filters,
                    selectedStyles: filters.selectedStyles.includes(style)
                      ? filters.selectedStyles.filter(
                          (selectedStyle) => selectedStyle !== style
                        )
                      : [...filters.selectedStyles, style],
                  })
                }
              />
              <label
                htmlFor={`style-${style}`}
                className="text-sm text-card-foreground cursor-pointer"
              >
                {style}
              </label>
            </div>
          ))}
        </div>
      </div>
      {filtersActive > 0 && (
        <Button
          variant="outline"
          className="w-full bg-transparent"
          onClick={() =>
            setFilters({
              search: "",
              city: "all",
              priceRange: [0, 25000],
              rating: 0,
              selectedStyles: [],
              sortBy: "recently-added",
            })
          }
        >
          Clear All Filters
        </Button>
      )}
    </div>
  );
};

export function SearchFilters({ resultCount }: { resultCount: number }) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [cities, setCities] = useState<string[]>(["all"]);
  const [filtersActive, setFiltersActive] = useState(3);

  const { filters, photographers, setFilters } = usePhotographers();

  useMemo(() => {
    const uniqueCities = Array.from(
      new Set(photographers.map(({ location }) => location))
    );
    setCities(uniqueCities);
  }, [photographers]);

  useMemo(() => {
    let count = 0;
    if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 25000) count++;
    if (filters.rating !== 0) count++;
    if (filters.selectedStyles && filters.selectedStyles.length > 0) count++;
    setFiltersActive(count);
  }, [filters]);

  return (
    <div className="mb-8 space-y-4">
      <div className="grid grid-cols-4 gap-2">
        <SearchBar />
        <Button onClick={() => setIsFiltersOpen(true)}>
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {filtersActive > 0 && (
            <Badge
              variant="secondary"
              className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {filtersActive}
            </Badge>
          )}
        </Button>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <Select
          value={filters.city}
          onValueChange={(city) => setFilters({ ...filters, city })}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select city" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="capitalize">
              All Cities
            </SelectItem>
            {cities.map((city) => (
              <SelectItem key={city} value={city} className="capitalize">
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.sortBy}
          onValueChange={(sortBy) =>
            setFilters({ ...filters, sortBy: sortBy as Filters["sortBy"] })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating-high">Rating: High to Low</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="recently-added">Recently Added</SelectItem>
          </SelectContent>
        </Select>

        <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Photographers</SheetTitle>
              <SheetDescription>
                Refine your search to find the perfect photographer
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <FiltersContent filtersActive={filtersActive} />
            </div>
          </SheetContent>
        </Sheet>
        <div className="text-sm text-muted-foreground ml-auto">
          {resultCount} photographer{resultCount !== 1 ? "s" : ""} found
        </div>
      </div>
    </div>
  );
}
