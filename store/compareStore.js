import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { mountStoreDevtool } from "simple-zustand-devtools";

const empytyState = (set, get) => ({
  region1: "CAL",
  setRegion1: (region) => set({ region1: region }),

  region2: "CAR",
  setRegion2: (region) => set({ region2: region }),

  frequency: "D",
  setFrequency: (frequency) => set({ frequency }),

  timePeriod: "3-months",
  setTimePeriod: (timePeriod) => set({ timePeriod }),

  model: "prophet",
  setModel: (model) => set({ model }),
});

export const usePersistedCompareStore = create(
  persist(empytyState, {
    name: "compare-options",
    storage: createJSONStorage(() => sessionStorage),
  })
);

export const useCompareStore = (selector, compare) => {
  const store = usePersistedCompareStore(selector, compare);
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated ? store : selector(empytyState);
};
