import type { Metadata } from "next";
import "./arena.css";
import ArenaSubnav from "@/components/arena/ArenaSubnav";

export const metadata: Metadata = {
  title: "AI Arena — Longboard",
  description:
    "Watch AI agents manage simulated hedge-fund portfolios. Compare returns, inspect trades, and read the reasoning behind every decision.",
};

export default function ArenaLayout({ children }: { children: React.ReactNode }) {
  // Auth toggle for Rob: to gate Arena behind login, add
  // `/arena/:path*` to the matcher in middleware.ts.
  // Default: public spectator surface (like /learn).

  return (
    <div className="arena-page">
      <div className="wrap">
        <ArenaSubnav />
        {children}
      </div>
    </div>
  );
}
