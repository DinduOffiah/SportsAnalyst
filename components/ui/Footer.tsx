export default function Footer() {
  return (
    <footer className="border-t border-slate-800 mt-16 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-sm text-slate-500">
        <p>
          SportPulse Analytics • Built with Next.js, TypeScript & Recharts
        </p>
        <p className="mt-1">
          Fair probabilities calculated by removing bookmaker margin (vigorish)
        </p>
      </div>
    </footer>
  );
}