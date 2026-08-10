import { Odds, Probability } from "./types";


 // Convert decimal odds to implied probability 
export function oddsToImplied(odds: number): number {
  return 1 / odds;
}


 //Remove bookmaker margin (vigorish) and normalize to fair probabilities
export function calculateFairProbabilities(odds: Odds): Probability {
  const homeImplied = oddsToImplied(odds.home);
  const awayImplied = oddsToImplied(odds.away);
  const drawImplied = odds.draw ? oddsToImplied(odds.draw) : 0;

  const total = homeImplied + awayImplied + drawImplied;

  return {
    home: homeImplied,
    away: awayImplied,
    draw: odds.draw ? drawImplied : undefined,
    fairHome: homeImplied / total,
    fairAway: awayImplied / total,
    fairDraw: odds.draw ? drawImplied / total : undefined,
  };
}


 // Simple format helper
export function formatProb(p: number): string {
  return `${(p * 100).toFixed(1)}%`;
}