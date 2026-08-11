"use client";

import { useEffect, useState } from "react";
import DashboardHeader from "@/components/ui/DashboardHeader";
import SportToggle from "@/components/ui/SportToggle";
import Filters from "@/components/ui/Filters";
import MatchCard from "@/components/ui/MatchCard";
import SummaryStats from "@/components/ui/SummaryStats";
import ProbabilityChart from "@/components/ui/ProbabilityChart";
import Footer from "@/components/ui/Footer";
import { useSportsStore } from "@/store/useSportsStore";
import { fetchLiveOdds } from "@/lib/api";
import { Match } from "@/lib/types";

export default function HomePage() {
  const {
    selectedSport,
    selectedLeague,
    matches,
    setMatches, // We will add this to the store
  } = useSportsStore();

  const [isLoading, setIsLoading] = useState(false);
  const [usingRealData, setUsingRealData] = useState(false);

  // Load real data when sport changes
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);

      const realMatches = await fetchLiveOdds(selectedSport);

      if (realMatches.length > 0) {
        setMatches(realMatches);
        setUsingRealData(true);
      } else {
        // Fallback to mock data (already in the store)
        setUsingRealData(false);
      }

      setIsLoading(false);
    }

    loadData();
  }, [selectedSport, setMatches]);

  const filteredMatches = matches.filter((match) => {
    const sportMatch = match.sport === selectedSport;
    const leagueMatch =
      selectedLeague === "all" || match.league === selectedLeague;
    return sportMatch && leagueMatch;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
          <SportToggle />
          <Filters />
        </div>

        {/* Data Source Indicator */}
        <div className="mb-4 text-sm text-slate-400">
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              Loading live data...
            </span>
          ) : usingRealData ? (
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Using live odds data
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-500"></span>
              Using demo (mock) data
            </span>
          )}
        </div>

        {/* Summary Stats */}
        <SummaryStats />

        {/* Probability Chart */}
        <ProbabilityChart />

        {/* Explanation Box */}
        <div className="mb-8 p-5 rounded-2xl bg-slate-900/50 border border-slate-800">
          <h3 className="font-semibold mb-2">How Fair Probability Works</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Bookmakers build a margin (vigorish) into their odds. We convert
            decimal odds into implied probabilities, then remove the margin so
            the probabilities sum to 100%. This gives a clearer view of the
            market’s true expected outcomes.
          </p>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold">
            {filteredMatches.length} Match
            {filteredMatches.length !== 1 ? "es" : ""}
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Showing fair probabilities (bookmaker margin removed)
          </p>
        </div>

        {/* Match Grid */}
        {isLoading ? (
          <div className="text-center py-20 text-slate-400">
            Loading matches...
          </div>
        ) : filteredMatches.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">📭</div>
            <h3 className="text-xl font-semibold mb-2">No matches found</h3>
            <p className="text-slate-400">
              Try changing the sport or league filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}