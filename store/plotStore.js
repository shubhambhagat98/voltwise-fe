import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { mountStoreDevtool } from "simple-zustand-devtools";

const empytyState = (set, get) => ({
  region: "CAL",
  setRegion: (region) => set({ region }),

  frequency: "D",
  setFrequency: (frequency) => set({ frequency }),

  timePeriod: "3-months",
  setTimePeriod: (timePeriod) => set({ timePeriod }),

  model: "prophet",
  setModel: (model) => set({ model }),
});

export const usePersistedPlotStore = create(
  persist(empytyState, {
    name: "plot-options",
    storage: createJSONStorage(() => sessionStorage),
  })
);

export const usePlotStore = (selector, compare) => {
  const store = usePersistedPlotStore(selector, compare);
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated ? store : selector(empytyState);
};
