"use client";

import { Match } from "@/lib/types";
import {
  calculateFairProbabilities,
  formatProb,
  detectValueBets,
} from "@/lib/probability";
import { format } from "date-fns";

interface MatchCardProps {
  match: Match;
}

export default function MatchCard({ match }: MatchCardProps) {
  const probs = calculateFairProbabilities(match.odds);
  const value = detectValueBets(match.odds);
  const isLive = match.status === "live";

  const hasAnyValue = value.home || value.away || value.draw;

  return (
    <div
      className={`
        relative bg-slate-900/70 border rounded-2xl p-5 transition-all duration-300
        ${hasAnyValue ? "border-emerald-500/60 shadow-lg shadow-emerald-900/20" : "border-slate-800 hover:border-emerald-500/40"}
      `}
    >
      {/* Value Bet Badge */}
      {hasAnyValue && (
        <div className="absolute -top-3 right-4">
          <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            VALUE BET
          </span>
        </div>
      )}

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

      {/* Odds + Probability Bars + Value Indicators */}
      <div className="space-y-3 pt-4 border-t border-slate-800">
        {/* Home */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400 flex items-center gap-1.5">
              Home ({match.odds.home.toFixed(2)})
              {value.home && (
                <span className="text-emerald-400 font-semibold">
                  +{value.homeEdge.toFixed(1)}% EV
                </span>
              )}
            </span>
            <span className={`font-medium ${value.home ? "text-emerald-400" : "text-slate-300"}`}>
              {formatProb(probs.fairHome)}
            </span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                value.home ? "bg-emerald-400" : "bg-emerald-600"
              }`}
              style={{ width: `${probs.fairHome * 100}%` }}
            />
          </div>
        </div>

        {/* Draw (Football only) */}
        {match.odds.draw && probs.fairDraw !== undefined && (
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400 flex items-center gap-1.5">
                Draw ({match.odds.draw.toFixed(2)})
                {value.draw && (
                  <span className="text-emerald-400 font-semibold">
                    +{value.drawEdge.toFixed(1)}% EV
                  </span>
                )}
              </span>
              <span className={`font-medium ${value.draw ? "text-emerald-400" : "text-slate-300"}`}>
                {formatProb(probs.fairDraw)}
              </span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  value.draw ? "bg-amber-400" : "bg-amber-500"
                }`}
                style={{ width: `${probs.fairDraw * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Away */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-slate-400 flex items-center gap-1.5">
              Away ({match.odds.away.toFixed(2)})
              {value.away && (
                <span className="text-emerald-400 font-semibold">
                  +{value.awayEdge.toFixed(1)}% EV
                </span>
              )}
            </span>
            <span className={`font-medium ${value.away ? "text-emerald-400" : "text-slate-300"}`}>
              {formatProb(probs.fairAway)}
            </span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                value.away ? "bg-sky-400" : "bg-sky-500"
              }`}
              style={{ width: `${probs.fairAway * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}