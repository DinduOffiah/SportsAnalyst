"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Sport, BettingFormat, Match } from "@/lib/types";
import { mockMatches } from "@/lib/mock-data";

export interface SavedFilter {
  id: string;
  name: string;
  sport: Sport;
  league: string | "all";
  bettingFormat: BettingFormat;
  createdAt: string;
}

interface SportsState {
  selectedSport: Sport;
  bettingFormat: BettingFormat;
  selectedLeague: string | "all";
  matches: Match[];
  savedFilters: SavedFilter[];
  showOnlyValueBets: boolean; // ← Added

  setSport: (sport: Sport) => void;
  setBettingFormat: (format: BettingFormat) => void;
  setLeague: (league: string | "all") => void;
  setMatches: (matches: Match[]) => void;
  setShowOnlyValueBets: (value: boolean) => void; // ← Added

  // Saved Filters actions
  saveCurrentFilter: (name: string) => void;
  loadFilter: (id: string) => void;
  deleteFilter: (id: string) => void;
}

export const useSportsStore = create<SportsState>()(
  persist(
    (set, get) => ({
      selectedSport: "football",
      bettingFormat: "moneyline",
      selectedLeague: "all",
      matches: mockMatches,
      savedFilters: [],
      showOnlyValueBets: false, // ← Added

      setSport: (sport) => set({ selectedSport: sport, selectedLeague: "all" }),
      setBettingFormat: (format) => set({ bettingFormat: format }),
      setLeague: (league) => set({ selectedLeague: league }),
      setMatches: (matches) => set({ matches }),
      setShowOnlyValueBets: (value) => set({ showOnlyValueBets: value }), // ← Added

      saveCurrentFilter: (name: string) => {
        const { selectedSport, selectedLeague, bettingFormat, savedFilters } =
          get();

        const newFilter: SavedFilter = {
          id: crypto.randomUUID(),
          name: name.trim() || "Untitled Filter",
          sport: selectedSport,
          league: selectedLeague,
          bettingFormat,
          createdAt: new Date().toISOString(),
        };

        set({ savedFilters: [...savedFilters, newFilter] });
      },

      loadFilter: (id: string) => {
        const filter = get().savedFilters.find((f) => f.id === id);
        if (!filter) return;

        set({
          selectedSport: filter.sport,
          selectedLeague: filter.league,
          bettingFormat: filter.bettingFormat,
        });
      },

      deleteFilter: (id: string) => {
        set({
          savedFilters: get().savedFilters.filter((f) => f.id !== id),
        });
      },
    }),
    {
      name: "sportpulse-storage",
    }
  )
);