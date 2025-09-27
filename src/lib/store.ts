import { create } from "zustand";
import { PhotographerStore } from "./types";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const usePhotographers = create<PhotographerStore>((set) => ({
  photographer: null,
  photographers: [],
  filters: {
    search: "",
    city: "all",
    rating: 0,
    selectedStyles: [],
    priceRange: [0, 25000],
    sortBy: "recently-added",
  },
  loading: false,
  setFilters: (filters) => set({ filters }),
  getPhotographer: async (id) => {
    set({ loading: true, photographer: null });
    try {
      const { data } = await axios.get(`${baseURL}/photographers/${id}`);
      if (data) {
        const photographer = { ...data, id: parseInt(data.id) };
        set({ photographer });
        return photographer;
      }
    } catch (error) {
      console.error("Error fetching photographer:", error);
      set({ photographer: null });
    } finally {
      set({ loading: false });
    }
  },
  getPhotographers: async () => {
    set({ loading: true });
    try {
      const { data } = await axios.get(`${baseURL}/photographers`);
      if (data) {
        set({ photographers: data });
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
}));

export default usePhotographers;
