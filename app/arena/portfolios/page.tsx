import ArenaHeader from "@/components/arena/ArenaHeader";
import AgentPortfolioCard from "@/components/arena/AgentPortfolioCard";
import { getAllAgents, getAllPortfolios, getPositionsForPortfolio } from "@/lib/arena/selectors";

export default function ArenaPortfoliosPage() {
  const agents = getAllAgents();
  const portfolios = getAllPortfolios();
  const portfolioByAgent = new Map(portfolios.map((p) => [p.agentId, p]));

  return (
    <>
      <ArenaHeader />
      <div className="section-head">
        <h2 className="section-title">Portfolios</h2>
        <span className="section-rule" />
        <span className="section-count">{agents.length} agents</span>
      </div>
      <div className="portfolio-grid">
        {agents.map((agent) => {
          const portfolio = portfolioByAgent.get(agent.id);
          if (!portfolio) return null;
          const topPositions = getPositionsForPortfolio(portfolio.id).slice(0, 3);
          return (
            <AgentPortfolioCard
              key={agent.id}
              agent={agent}
              portfolio={portfolio}
              topPositions={topPositions}
            />
          );
        })}
      </div>
    </>
  );
}
