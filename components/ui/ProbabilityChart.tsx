"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useSportsStore } from "@/store/useSportsStore";
import { calculateFairProbabilities } from "@/lib/probability";

export default function ProbabilityChart() {
  const { selectedSport, selectedLeague, matches } = useSportsStore();

  const filtered = matches.filter((m) => {
    const sportMatch = m.sport === selectedSport;
    const leagueMatch = selectedLeague === "all" || m.league === selectedLeague;
    return sportMatch && leagueMatch;
  });

  const chartData = filtered.map((match) => {
    const probs = calculateFairProbabilities(match.odds);
    return {
      name: `${match.homeTeam.shortName} vs ${match.awayTeam.shortName}`,
      Home: Number((probs.fairHome * 100).toFixed(1)),
      Away: Number((probs.fairAway * 100).toFixed(1)),
      ...(probs.fairDraw !== undefined && {
        Draw: Number((probs.fairDraw * 100).toFixed(1)),
      }),
    };
  });

  if (chartData.length === 0) return null;

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4">Fair Win Probability Comparison</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              angle={-35}
              textAnchor="end"
              height={70}
            />
            <YAxis
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              unit="%"
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #1e293b",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar dataKey="Home" fill="#10b981" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Away" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            {selectedSport === "football" && (
              <Bar dataKey="Draw" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}