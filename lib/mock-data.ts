import { Match } from "./types";

export const mockMatches: Match[] = [
  // Football
  {
    id: "fb1",
    sport: "football",
    league: "Premier League",
    homeTeam: { id: "ars", name: "Arsenal", shortName: "ARS" },
    awayTeam: { id: "mci", name: "Manchester City", shortName: "MCI" },
    commenceTime: new Date(Date.now() + 3600 * 1000 * 5).toISOString(),
    status: "scheduled",
    odds: { home: 2.45, away: 2.90, draw: 3.40 },
  },
  {
    id: "fb2",
    sport: "football",
    league: "La Liga",
    homeTeam: { id: "rma", name: "Real Madrid", shortName: "RMA" },
    awayTeam: { id: "bar", name: "Barcelona", shortName: "BAR" },
    commenceTime: new Date(Date.now() + 3600 * 1000 * 28).toISOString(),
    status: "scheduled",
    odds: { home: 2.10, away: 3.40, draw: 3.50 },
  },
  {
    id: "fb3",
    sport: "football",
    league: "Premier League",
    homeTeam: { id: "liv", name: "Liverpool", shortName: "LIV" },
    awayTeam: { id: "che", name: "Chelsea", shortName: "CHE" },
    commenceTime: new Date().toISOString(),
    status: "live",
    score: { home: 1, away: 0 },
    odds: { home: 1.65, away: 5.20, draw: 4.00 },
  },

  // Basketball
  {
    id: "bb1",
    sport: "basketball",
    league: "NBA",
    homeTeam: { id: "lal", name: "Los Angeles Lakers", shortName: "LAL" },
    awayTeam: { id: "bos", name: "Boston Celtics", shortName: "BOS" },
    commenceTime: new Date(Date.now() + 3600 * 1000 * 3).toISOString(),
    status: "scheduled",
    odds: { home: 1.95, away: 1.90 },
  },
  {
    id: "bb2",
    sport: "basketball",
    league: "NBA",
    homeTeam: { id: "gsw", name: "Golden State Warriors", shortName: "GSW" },
    awayTeam: { id: "phx", name: "Phoenix Suns", shortName: "PHX" },
    commenceTime: new Date().toISOString(),
    status: "live",
    score: { home: 78, away: 82 },
    odds: { home: 2.20, away: 1.70 },
  },

  // Tennis
  {
    id: "tn1",
    sport: "tennis",
    league: "ATP",
    homeTeam: { id: "djok", name: "Novak Djokovic", shortName: "DJOK" },
    awayTeam: { id: "alca", name: "Carlos Alcaraz", shortName: "ALCA" },
    commenceTime: new Date(Date.now() + 3600 * 1000 * 2).toISOString(),
    status: "scheduled",
    odds: { home: 2.05, away: 1.80 },
  },
  {
    id: "tn2",
    sport: "tennis",
    league: "WTA",
    homeTeam: { id: "swia", name: "Iga Swiatek", shortName: "SWIA" },
    awayTeam: { id: "sab", name: "Aryna Sabalenka", shortName: "SAB" },
    commenceTime: new Date().toISOString(),
    status: "live",
    score: { home: 1, away: 0 }, // sets
    odds: { home: 1.55, away: 2.45 },
  },
];