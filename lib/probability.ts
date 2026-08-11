import { Odds, Probability } from "./types";

/**
 * Convert decimal odds to implied probability
 */
export function oddsToImplied(odds: number): number {
  return 1 / odds;
}

/**
 * Remove bookmaker margin (vigorish) and return fair probabilities
 */
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

/**
 * Format probability as percentage
 */
export function formatProb(p: number): string {
  return `${(p * 100).toFixed(1)}%`;
}

/**
 * Detect Value Bets
 * Returns which outcomes have positive expected value
 */
export function detectValueBets(odds: Odds) {
  const probs = calculateFairProbabilities(odds);

  const homeImplied = oddsToImplied(odds.home);
  const awayImplied = oddsToImplied(odds.away);
  const drawImplied = odds.draw ? oddsToImplied(odds.draw) : 0;

  return {
    home: probs.fairHome > homeImplied,
    away: probs.fairAway > awayImplied,
    draw: odds.draw ? probs.fairDraw! > drawImplied : false,
    // How strong is the value? (difference in percentage points)
    homeEdge: (probs.fairHome - homeImplied) * 100,
    awayEdge: (probs.fairAway - awayImplied) * 100,
    drawEdge: odds.draw ? (probs.fairDraw! - drawImplied) * 100 : 0,
  };
}