import { Match, Sport } from "./types";

const ODDS_API_KEY = process.env.NEXT_PUBLIC_ODDS_API_KEY;

// Better mapping of sports → The Odds API keys
const sportKeys: Record<Sport, string[]> = {
  football: [
    "soccer_epl",
    "soccer_spain_la_liga",
    "soccer_germany_bundesliga",
    "soccer_italy_serie_a",
    "soccer_france_ligue_one",
    "soccer_uefa_champs_league",
  ],
  basketball: ["basketball_nba"],
  tennis: ["tennis_atp", "tennis_wta"],
};

export async function fetchLiveOdds(sport: Sport): Promise<Match[]> {
  if (!ODDS_API_KEY) {
    console.warn("No API key found → using mock data");
    return [];
  }

  try {
    const keys = sportKeys[sport] || [];
    const allMatches: Match[] = [];

    // Fetch multiple leagues in parallel
    const promises = keys.map(async (key) => {
      const res = await fetch(
        `https://api.the-odds-api.com/v4/sports/${key}/odds?regions=uk,us&markets=h2h&oddsFormat=decimal&apiKey=${ODDS_API_KEY}`
      );

      if (!res.ok) return [];

      const data = await res.json();
      return data;
    });

    const results = await Promise.all(promises);

    results.flat().forEach((item: any, index: number) => {
      const homeOdds = item.bookmakers?.[0]?.markets?.[0]?.outcomes?.find(
        (o: any) => o.name === item.home_team
      )?.price;

      const awayOdds = item.bookmakers?.[0]?.markets?.[0]?.outcomes?.find(
        (o: any) => o.name === item.away_team
      )?.price;

      const drawOdds = item.bookmakers?.[0]?.markets?.[0]?.outcomes?.find(
        (o: any) => o.name === "Draw"
      )?.price;

      if (!homeOdds || !awayOdds) return;

      allMatches.push({
        id: item.id || `api-${sport}-${index}`,
        sport,
        league: item.sport_title || "Unknown League",
        homeTeam: {
          id: item.home_team,
          name: item.home_team,
          shortName: item.home_team.substring(0, 3).toUpperCase(),
        },
        awayTeam: {
          id: item.away_team,
          name: item.away_team,
          shortName: item.away_team.substring(0, 3).toUpperCase(),
        },
        commenceTime: item.commence_time,
        status: "scheduled",
        odds: {
          home: homeOdds,
          away: awayOdds,
          draw: drawOdds,
        },
      });
    });

    return allMatches;
  } catch (error) {
    console.error("Failed to fetch live odds:", error);
    return [];
  }
}