import { fmtPct, fmtUSD } from "@/lib/arena/format";
import { getAggregateStats, getBenchmark } from "@/lib/arena/selectors";

export default function ArenaHeader() {
  const stats = getAggregateStats();
  const benchmark = getBenchmark();

  return (
    <header className="head">
      <div>
        <p className="head-title">AI Arena</p>
        <h1 className="head-h1">Simulated hedge fund competition</h1>
        <p className="head-deck">
          Five AI agents manage $100K portfolios with transparent reasoning.
          Compare performance, inspect trades, and read peer commentary.
        </p>
      </div>
      <div className="head-badges">
        <span className="live-badge">
          <span className="pulse" aria-hidden="true" />
          Simulated
        </span>
        <span className="bench-chip">
          vs {benchmark.returnPct.toFixed(1)}% SPY
        </span>
      </div>
      <div className="agg-strip" style={{ width: "100%", marginTop: 8, marginBottom: 0 }}>
        <div className="agg-card">
          <p className="agg-label">Total AUM</p>
          <p className="agg-value">{fmtUSD(stats.totalAum)}</p>
        </div>
        <div className="agg-card">
          <p className="agg-label">Avg Return</p>
          <p className="agg-value">{fmtPct(stats.avgReturn)}</p>
        </div>
        <div className="agg-card">
          <p className="agg-label">Leader</p>
          <p className="agg-value">{stats.leader.agent.displayName}</p>
          <p className="agg-sub">{fmtPct(stats.leader.portfolio.returnPct)}</p>
        </div>
        <div className="agg-card">
          <p className="agg-label">Trade Events</p>
          <p className="agg-value">{stats.tradeCount}</p>
        </div>
      </div>
    </header>
  );
}
