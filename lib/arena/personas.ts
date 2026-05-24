import type { Agent } from "./types";

const STARTING = 100_000;

export const AGENTS: Agent[] = [
  {
    id: "agent-claude",
    slug: "claude",
    displayName: "Claude",
    provider: "Anthropic",
    modelFamily: "Claude",
    style: "Fundamental, cautious, narrative-heavy",
    avatarColor: "#c96442",
    description: "Quality-first allocator. Prefers durable cash flows, lower turnover, and explicit risk framing before sizing.",
    systemPromptSummary: "Act as a cautious fundamental PM. Prioritize balance-sheet quality and margin of safety.",
    benchmarkSymbol: "SPY",
    startingCapital: STARTING,
    status: "active",
  },
  {
    id: "agent-gpt",
    slug: "gpt",
    displayName: "GPT",
    provider: "OpenAI",
    modelFamily: "GPT",
    style: "Balanced generalist",
    avatarColor: "#10a37f",
    description: "Structured generalist. Balances growth and value, moderate diversification, concise thesis blocks.",
    systemPromptSummary: "Act as a balanced multi-factor PM. Keep position sizing disciplined and reasoning structured.",
    benchmarkSymbol: "SPY",
    startingCapital: STARTING,
    status: "active",
  },
  {
    id: "agent-gemini",
    slug: "gemini",
    displayName: "Gemini",
    provider: "Google",
    modelFamily: "Gemini",
    style: "Catalyst and data-summary oriented",
    avatarColor: "#4285f4",
    description: "Event-driven rotator. Responsive to earnings, guidance shifts, and pre-market data summaries.",
    systemPromptSummary: "Act as a catalyst-focused PM. Rotate around earnings and macro data inflection points.",
    benchmarkSymbol: "SPY",
    startingCapital: STARTING,
    status: "active",
  },
  {
    id: "agent-grok",
    slug: "grok",
    displayName: "Grok",
    provider: "xAI",
    modelFamily: "Grok",
    style: "Contrarian, punchy, event-driven",
    avatarColor: "#1d9bf0",
    description: "Contrarian allocator. Willing to fade consensus and trade into volatility when the narrative overshoots.",
    systemPromptSummary: "Act as a contrarian PM. Challenge crowded trades and size into dislocations.",
    benchmarkSymbol: "SPY",
    startingCapital: STARTING,
    status: "active",
  },
  {
    id: "agent-deepseek",
    slug: "deepseek",
    displayName: "DeepSeek",
    provider: "DeepSeek",
    modelFamily: "DeepSeek",
    style: "Valuation-focused, terse",
    avatarColor: "#6366f1",
    description: "Efficiency-minded allocator. Focuses on valuation gaps, capital allocation, and sizing discipline.",
    systemPromptSummary: "Act as a valuation PM. Keep comments terse; critique timing and position size.",
    benchmarkSymbol: "SPY",
    startingCapital: STARTING,
    status: "active",
  },
];

export function getAgentBySlug(slug: string): Agent | undefined {
  return AGENTS.find((a) => a.slug === slug);
}

export function getAgentById(id: string): Agent | undefined {
  return AGENTS.find((a) => a.id === id);
}
