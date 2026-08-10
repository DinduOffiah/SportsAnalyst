export type Sport = "football" | "basketball" | "tennis";

export type BettingFormat = "moneyline" | "spread" | "totals";

export interface Team {
  id: string;
  name: string;
  shortName: string;
}

export interface Odds {
  home: number;
  away: number;
  draw?: number;
}

export interface Match {
  id: string;
  sport: Sport;
  league: string;
  homeTeam: Team;
  awayTeam: Team;
  commenceTime: string;
  status: "scheduled" | "live" | "finished";
  score?: {
    home: number;
    away: number;
  };
  odds: Odds;
}

export interface Probability {
  home: number;
  away: number;
  draw?: number;
  fairHome: number;
  fairAway: number;
  fairDraw?: number;
}