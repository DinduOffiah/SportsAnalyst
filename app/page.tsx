"use client";

import { useEffect, useState } from "react";
import DashboardHeader from "@/components/ui/DashboardHeader";
import SportToggle from "@/components/ui/SportToggle";
import Filters from "@/components/ui/Filters";
import MatchCard from "@/components/ui/MatchCard";
import SummaryStats from "@/components/ui/SummaryStats";
import ProbabilityChart from "@/components/ui/ProbabilityChart";
import Footer from "@/components/ui/Footer";
import SavedFilters from "@/components/ui/SavedFilters";
import { useSportsStore } from "@/store/useSportsStore";
import { fetchLiveOdds } from "@/lib/api";
import { detectValueBets } from "@/lib/probability";
import { RefreshCw } from "lucide-react";

export default function HomePage() {
  const {
    selectedSport,
    selectedLeague,
    matches,
    setMatches,
    showOnlyValueBets,
    setShowOnlyValueBets,
  } = useSportsStore();

  const [isLoading, setIsLoading] = useState(false);
  const [usingRealData, setUsingRealData] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadData = async () => {
    setIsLoading(true);
    const realMatches = await fetchLiveOdds(selectedSport);

    if (realMatches.length > 0) {
      setMatches(realMatches);
      setUsingRealData(true);
      setLastUpdated(new Date());
    } else {
      setUsingRealData(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [selectedSport]);

  // Main filtering logic (including Value Bets)
  const filteredMatches = matches.filter((match) => {
    const sportMatch = match.sport === selectedSport;
    const leagueMatch =
      selectedLeague === "all" || match.league === selectedLeague;

    if (!sportMatch || !leagueMatch) return false;

    if (showOnlyValueBets) {
      const value = detectValueBets(match.odds);
      return value.home || value.away || value.draw;
    }

    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
          <SportToggle />
          <Filters />
        </div>

        {/* Data Source + Value Toggle + Saved Filters + Refresh */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          {/* Left side - Status */}
          <div className="text-sm text-slate-400">
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                Loading live data...
              </span>
            ) : usingRealData ? (
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Live odds data
                {lastUpdated && (
                  <span className="text-xs text-slate-500">
                    • Updated {lastUpdated.toLocaleTimeString()}
                  </span>
                )}
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                Demo (mock) data
              </span>
            )}
          </div>

          {/* Right side - Controls */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Show only Value Bets Toggle */}
            <button
              onClick={() => setShowOnlyValueBets(!showOnlyValueBets)}
              className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition ${
                showOnlyValueBets
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-300"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  showOnlyValueBets ? "bg-white" : "bg-emerald-500"
                }`}
              />
              {showOnlyValueBets ? "Showing Value Bets" : "Show only Value Bets"}
            </button>

            <SavedFilters />

            <button
              onClick={loadData}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-slate-800 hover:bg-slate-700 rounded-lg transition disabled:opacity-50"
            >
              <RefreshCw
                className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>
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
            {showOnlyValueBets && " with Value"}
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
              {showOnlyValueBets
                ? "No value bets found with the current filters."
                : "Try changing the sport or league filter."}
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