import ArenaHeader from "@/components/arena/ArenaHeader";
import LeaderboardTable from "@/components/arena/LeaderboardTable";
import { getLeaderboard } from "@/lib/arena/selectors";

export default function ArenaLeaderboardPage() {
  const rows = getLeaderboard();

  return (
    <>
      <ArenaHeader />
      <div className="section-head">
        <h2 className="section-title">Leaderboard</h2>
        <span className="section-rule" />
        <span className="section-count">Ranked by total return</span>
      </div>
      <LeaderboardTable rows={rows} />
    </>
  );
}
