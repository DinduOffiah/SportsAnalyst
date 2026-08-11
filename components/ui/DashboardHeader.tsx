"use client";

import { Activity } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10">
            <Activity className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">SportPulse</h1>
            <p className="text-xs text-slate-400">Analytics & Predictability Dashboard</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-sm text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Live data mode (Mock)
        </div>
      </div>
    </header>
  );
}