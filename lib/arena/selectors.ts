import { AGENTS, getAgentById, getAgentBySlug } from "./personas";
import {
  BENCHMARK,
  COMMENTS,
  PERFORMANCE_SNAPSHOTS,
  PORTFOLIOS,
  POSITIONS,
  TRADE_EVENTS,
} from "./mock-data";
import type {
  AgentDetail,
  FeedItem,
  LeaderboardRow,
  PerformanceSnapshot,
  Portfolio,
  Position,
  TradeEvent,
} from "./types";

export function getAllAgents() {
  return AGENTS;
}

export function getAllPortfolios(): Portfolio[] {
  return PORTFOLIOS;
}

export function getPortfolioByAgentSlug(slug: string): Portfolio | undefined {
  const agent = getAgentBySlug(slug);
  if (!agent) return undefined;
  return PORTFOLIOS.find((p) => p.agentId === agent.id);
}

export function getPortfolioByAgentId(agentId: string): Portfolio | undefined {
  return PORTFOLIOS.find((p) => p.agentId === agentId);
}

export function getPositionsForPortfolio(portfolioId: string): Position[] {
  return POSITIONS.filter((p) => p.portfolioId === portfolioId).sort(
    (a, b) => b.weightPct - a.weightPct,
  );
}

export function getPositionsForAgent(slug: string): Position[] {
  const portfolio = getPortfolioByAgentSlug(slug);
  if (!portfolio) return [];
  return getPositionsForPortfolio(portfolio.id);
}

export function getFeed(): FeedItem[] {
  const sorted = [...TRADE_EVENTS].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return sorted.map((event) => {
    const agent = getAgentById(event.agentId)!;
    const eventComments = COMMENTS.filter((c) => c.eventId === event.id).sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
    const commentAuthors = eventComments
      .map((c) => getAgentById(c.authorAgentId))
      .filter(Boolean) as typeof AGENTS;

    return { event, agent, comments: eventComments, commentAuthors };
  });
}

export function getLeaderboard(): LeaderboardRow[] {
  const rows = AGENTS.map((agent) => {
    const portfolio = getPortfolioByAgentId(agent.id)!;
    const events = TRADE_EVENTS.filter((e) => e.agentId === agent.id);
    const lastTrade = events.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )[0];

    return {
      rank: 0,
      agent,
      portfolio,
      lastTradeAt: lastTrade?.createdAt ?? null,
    };
  });

  rows.sort((a, b) => b.portfolio.returnPct - a.portfolio.returnPct);
  return rows.map((row, i) => ({ ...row, rank: i + 1 }));
}

export function getAgentDetail(slug: string): AgentDetail | null {
  const agent = getAgentBySlug(slug);
  if (!agent) return null;

  const portfolio = getPortfolioByAgentId(agent.id);
  if (!portfolio) return null;

  const positions = getPositionsForPortfolio(portfolio.id);
  const recentEvents = TRADE_EVENTS.filter((e) => e.agentId === agent.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const snapshots = PERFORMANCE_SNAPSHOTS.filter((s) => s.portfolioId === portfolio.id).sort(
    (a, b) => new Date(a.asOf).getTime() - new Date(b.asOf).getTime(),
  );

  return { agent, portfolio, positions, recentEvents, snapshots };
}

export function getBenchmark() {
  return BENCHMARK;
}

export function getSnapshotsForAgent(slug: string): PerformanceSnapshot[] {
  const portfolio = getPortfolioByAgentSlug(slug);
  if (!portfolio) return [];
  return PERFORMANCE_SNAPSHOTS.filter((s) => s.portfolioId === portfolio.id).sort(
    (a, b) => new Date(a.asOf).getTime() - new Date(b.asOf).getTime(),
  );
}

export function getRecentEventsForAgent(slug: string, limit = 5): TradeEvent[] {
  const agent = getAgentBySlug(slug);
  if (!agent) return [];
  return TRADE_EVENTS.filter((e) => e.agentId === agent.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export function getAggregateStats() {
  const leaderboard = getLeaderboard();
  const totalAum = PORTFOLIOS.reduce((sum, p) => sum + p.currentValue, 0);
  const avgReturn = PORTFOLIOS.reduce((sum, p) => sum + p.returnPct, 0) / PORTFOLIOS.length;
  const leader = leaderboard[0]!;

  return {
    totalAum,
    avgReturn,
    benchmarkReturn: BENCHMARK.returnPct,
    agentCount: AGENTS.length,
    tradeCount: TRADE_EVENTS.length,
    leader,
  };
}
