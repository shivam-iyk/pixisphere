"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import usePhotographers from "@/lib/store";

export function SearchBar() {
  const { filters, setFilters } = usePhotographers();

  const inputRef = useRef<HTMLInputElement>(null);

  const clearSearch = () => {
    setFilters({ ...filters, search: "" });
    inputRef.current?.focus();
  };

  return (
    <div className="col-span-3 relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        ref={inputRef}
        placeholder="Search by name, location or speciality..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        className="pl-10 pr-10"
      />
      {filters.search && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
