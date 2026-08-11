"use client";

import { Match } from "@/lib/types";
import { calculateFairProbabilities, formatProb } from "@/lib/probability";
import { format } from "date-fns";

interface MatchCardProps {
  match: Match;
}

export default function MatchCard({ match }: MatchCardProps) {
  const probs = calculateFairProbabilities(match.odds);
  const isLive = match.status === "live";

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/40 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          {match.league}
        </span>

        <div className="flex items-center gap-2">
          {isLive ? (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-red-400 bg-red-500/10 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              LIVE
            </span>
          ) : (
            <span className="text-xs text-slate-400">
              {format(new Date(match.commenceTime), "MMM d, HH:mm")}
            </span>
          )}
        </div>
      </div>

      {/* Teams & Score */}
      <div className="space-y-3 mb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold">
              {match.homeTeam.shortName}
            </div>
            <span className="font-medium">{match.homeTeam.name}</span>
          </div>
          {match.score && (
            <span className="text-xl font-bold tabular-nums">{match.score.home}</span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold">
              {match.awayTeam.shortName}
            </div>
            <span className="font-medium">{match.awayTeam.name}</span>
          </div>
          {match.score && (
            <span className="text-xl font-bold tabular-nums">{match.score.away}</span>
          )}
        </div>
      </div>

      {/* Odds + Fair Probability Bars */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        {/* Home */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400">Home ({match.odds.home.toFixed(2)})</span>
            <span className="text-emerald-400 font-medium">{formatProb(probs.fairHome)}</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${probs.fairHome * 100}%` }}
            />
          </div>
        </div>

        {/* Draw (Football only) */}
        {match.odds.draw && probs.fairDraw !== undefined && (
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Draw ({match.odds.draw.toFixed(2)})</span>
              <span className="text-amber-400 font-medium">{formatProb(probs.fairDraw)}</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${probs.fairDraw * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Away */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400">Away ({match.odds.away.toFixed(2)})</span>
            <span className="text-sky-400 font-medium">{formatProb(probs.fairAway)}</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-sky-500 rounded-full transition-all duration-500"
              style={{ width: `${probs.fairAway * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}