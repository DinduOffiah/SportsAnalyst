# Sports Analyst

Real-time sports analytics dashboard that calculates **fair win probabilities** by removing bookmaker margin (vigorish) from odds.

## Features

- Multi-sport support (Football, Basketball, Tennis)
- League filtering
- Live match indicators
- Fair probability calculation (odds → implied → normalized)
- Interactive probability bars
- Comparison charts (Recharts)
- Responsive design
- Optional live odds via The Odds API

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Zustand (state management)
- Recharts
- date-fns

## Getting Started

```bash
npm install
npm run dev