import { Photographer } from "./types";

// Fuzzy search implementation for better search experience
export function fuzzySearch(query: string, text: string): boolean {
  if (!query) return true;

  const queryLower = query.toLowerCase().trim();
  const textLower = text.toLowerCase();

  // Exact match
  if (textLower.includes(queryLower)) return true;

  // Split query into words for partial matching
  const queryWords = queryLower.split(/\s+/);
  return queryWords.every((word) => textLower.includes(word));
}

export function searchPhotographers(
  photographers: Photographer[],
  query: string
): Photographer[] {
  if (!query.trim()) return photographers;

  return photographers.filter((photographer) => {
    // Search in name
    if (fuzzySearch(query, photographer.name)) return true;

    // Search in location
    if (fuzzySearch(query, photographer.location)) return true;

    // Search in bio
    if (fuzzySearch(query, photographer.bio)) return true;

    // Search in tags
    if (photographer.tags.some((tag) => fuzzySearch(query, tag))) return true;

    // Search in styles
    if (photographer.styles.some((style) => fuzzySearch(query, style)))
      return true;

    return false;
  });
}

export function getSearchSuggestions(
  photographers: Photographer[],
  query: string
): string[] {
  if (!query.trim()) return [];

  const suggestions = new Set<string>();
  const queryLower = query.toLowerCase();

  photographers.forEach((photographer) => {
    // Add matching names
    if (photographer.name.toLowerCase().includes(queryLower)) {
      suggestions.add(photographer.name);
    }

    // Add matching locations
    if (photographer.location.toLowerCase().includes(queryLower)) {
      suggestions.add(photographer.location);
    }

    // Add matching tags
    photographer.tags.forEach((tag) => {
      if (tag.toLowerCase().includes(queryLower)) {
        suggestions.add(tag);
      }
    });

    // Add matching styles
    photographer.styles.forEach((style) => {
      if (style.toLowerCase().includes(queryLower)) {
        suggestions.add(style);
      }
    });
  });

  return Array.from(suggestions).slice(0, 5);
}
