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
  const isFinished = match.status === "finished";

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/40 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          {match.league}
        </span>

        <div className="flex items-center gap-2">
          {isLive && (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-red-400 bg-red-500/10 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
              LIVE
            </span>
          )}
          {!isLive && !isFinished && (
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

      {/* Odds + Probability */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800">
        {/* Home */}
        <div className="text-center">
          <p className="text-xs text-slate-500 mb-1">Home</p>
          <p className="text-sm font-semibold text-emerald-400">{match.odds.home.toFixed(2)}</p>
          <p className="text-xs text-slate-400 mt-1">
            {formatProb(probs.fairHome)} fair
          </p>
        </div>

        {/* Draw (only football) */}
        {match.odds.draw ? (
          <div className="text-center">
            <p className="text-xs text-slate-500 mb-1">Draw</p>
            <p className="text-sm font-semibold text-amber-400">{match.odds.draw.toFixed(2)}</p>
            <p className="text-xs text-slate-400 mt-1">
              {formatProb(probs.fairDraw!)} fair
            </p>
          </div>
        ) : (
          <div className="text-center opacity-30">
            <p className="text-xs text-slate-500 mb-1">—</p>
            <p className="text-sm">—</p>
          </div>
        )}

        {/* Away */}
        <div className="text-center">
          <p className="text-xs text-slate-500 mb-1">Away</p>
          <p className="text-sm font-semibold text-sky-400">{match.odds.away.toFixed(2)}</p>
          <p className="text-xs text-slate-400 mt-1">
            {formatProb(probs.fairAway)} fair
          </p>
        </div>
      </div>
    </div>
  );
}