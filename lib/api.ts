import { Match, Sport } from "./types";

const ODDS_API_KEY = process.env.NEXT_PUBLIC_ODDS_API_KEY;

// Map our sports to The Odds API keys
const sportKeys: Record<Sport, string> = {
  football: "soccer_epl",
  basketball: "basketball_nba",
  tennis: "tennis_atp_aus_open_singles",
};

export async function fetchLiveOdds(sport: Sport): Promise<Match[]> {
  if (!ODDS_API_KEY) {
    console.warn("No API key found. Using mock data.");
    return [];
  }

  try {
    const res = await fetch(
      `https://api.the-odds-api.com/v4/sports/${sportKeys[sport]}/odds?regions=uk,us&markets=h2h&oddsFormat=decimal&apiKey=${ODDS_API_KEY}`
    );

    if (!res.ok) throw new Error("Failed to fetch odds");

    const data = await res.json();

    // Transform API response into our Match type (simplified)
    return data.slice(0, 12).map((item: any, index: number) => ({
      id: item.id || `api-${index}`,
      sport,
      league: item.sport_title || "Unknown League",
      homeTeam: {
        id: item.home_team,
        name: item.home_team,
        shortName: item.home_team.slice(0, 3).toUpperCase(),
      },
      awayTeam: {
        id: item.away_team,
        name: item.away_team,
        shortName: item.away_team.slice(0, 3).toUpperCase(),
      },
      commenceTime: item.commence_time,
      status: "scheduled" as const,
      odds: {
        home: item.bookmakers?.[0]?.markets?.[0]?.outcomes?.find(
          (o: any) => o.name === item.home_team
        )?.price || 2.0,
        away: item.bookmakers?.[0]?.markets?.[0]?.outcomes?.find(
          (o: any) => o.name === item.away_team
        )?.price || 2.0,
        draw: item.bookmakers?.[0]?.markets?.[0]?.outcomes?.find(
          (o: any) => o.name === "Draw"
        )?.price,
      },
    }));
  } catch (error) {
    console.error("API Error:", error);
    return [];
  }
}