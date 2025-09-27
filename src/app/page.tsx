"use client";

import { useEffect, useMemo, useState } from "react";
import { PhotographerCard } from "@/components/PhotographerCard";
import { SearchFilters } from "@/components/SearchFilters";
import usePhotographers from "@/lib/store";
import { History } from "lucide-react";
import { PhotographersLoading } from "@/components/PhotographersLoading";

function Page() {
  const { photographers, filters, getPhotographers, loading } =
    usePhotographers();
  const [filteredPhotographers, setFilteredPhotographers] =
    useState(photographers);

  useEffect(() => {
    getPhotographers();
  }, []);

  useMemo(() => {
    if (photographers.length === 0) return;
    let filtered = photographers;
    if (filters.city !== "all") {
      filtered = filtered.filter((photographer) =>
        photographer.location.toLowerCase().includes(filters.city.toLowerCase())
      );
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      filtered = filtered.filter(
        (photographer) => photographer.price >= min && photographer.price <= max
      );
    }
    if (filters.rating) {
      filtered = filtered.filter(
        (photographer) => photographer.rating >= filters.rating
      );
    }
    if (filters.search) {
      filtered = filtered.filter(
        (photographer) =>
          photographer.name
            .toLowerCase()
            .includes(filters.search.toLowerCase()) ||
          photographer.styles.some((s) =>
            s.toLowerCase().includes(filters.search.toLowerCase())
          ) ||
          photographer.location
            .toLowerCase()
            .includes(filters.search.toLowerCase())
      );
    }
    if (filters.selectedStyles.length > 0) {
      filtered = filtered.filter((photographer) =>
        filters.selectedStyles.every((style) =>
          photographer.styles.includes(style)
        )
      );
    }
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "price-low":
          filtered = filtered.sort((a, b) => a.price - b.price);
          break;
        case "price-high":
          filtered = filtered.sort((a, b) => b.price - a.price);
          break;
        case "rating-high":
          filtered = filtered.sort((a, b) => b.rating - a.rating);
          break;
        case "recently-added":
          filtered = filtered.sort(
            (a, b) => new Date(b.id).getTime() - new Date(a.id).getTime()
          );
          break;
        default:
          filtered = photographers;
          break;
      }
    }
    setFilteredPhotographers(filtered);
  }, [photographers, filters]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold text-pretty mb-4">
          Find Your Perfect Photographer
        </h1>
        <p className="text-muted-foreground md:text-lg text-sm">
          Discover talented photographers for your special moments across India
        </p>
      </div>
      <SearchFilters resultCount={filteredPhotographers.length} />
      {loading ? (
        <PhotographersLoading />
      ) : filteredPhotographers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredPhotographers.map((photographer) => (
            <PhotographerCard
              photographer={photographer}
              key={photographer.id}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[50vh]">
          <History size="60" />
          <h3 className="text-2xl font-semibold tracking-tight">
            Nothing Here
          </h3>
          <p className="text-muted-foreground max-sm:text-sm">
            No photographers found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
}

export default Page;
