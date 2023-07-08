import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const empytyState = (set, get) => ({
  region: "CAL",
  setRegion: (region) => set({ region }),

  regionName: "California",
  setRegionName: (regionName) => set({ regionName }),

  year: 2023,
  setYear: (year) => set({ year }),
});

export const usePersistedAnalyticsStore = create(
  persist(empytyState, {
    name: "analytics-options",
    storage: createJSONStorage(() => sessionStorage),
  })
);

export const useAnalyticsStore = (selector, compare) => {
  const store = usePersistedAnalyticsStore(selector, compare);
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated ? store : selector(empytyState);
};
