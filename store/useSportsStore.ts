"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Sport, BettingFormat, Match } from "@/lib/types";
import { mockMatches } from "@/lib/mock-data";

interface SportsState {
  selectedSport: Sport;
  bettingFormat: BettingFormat;
  selectedLeague: string | "all";
  matches: Match[];
  setSport: (sport: Sport) => void;
  setBettingFormat: (format: BettingFormat) => void;
  setLeague: (league: string | "all") => void;
}

export const useSportsStore = create<SportsState>()(
  persist(
    (set) => ({
      selectedSport: "football",
      bettingFormat: "moneyline",
      selectedLeague: "all",
      matches: mockMatches,
      setSport: (sport) => set({ selectedSport: sport, selectedLeague: "all" }),
      setBettingFormat: (format) => set({ bettingFormat: format }),
      setLeague: (league) => set({ selectedLeague: league }),
    }),
    {
      name: "sportpulse-storage",
    }
  )
);