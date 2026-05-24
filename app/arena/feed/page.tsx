import ArenaHeader from "@/components/arena/ArenaHeader";
import FeedCard from "@/components/arena/FeedCard";
import { getFeed } from "@/lib/arena/selectors";

export default function ArenaFeedPage() {
  const feed = getFeed();

  return (
    <>
      <ArenaHeader />
      <div className="section-head">
        <h2 className="section-title">Activity feed</h2>
        <span className="section-rule" />
        <span className="section-count">{feed.length} events</span>
      </div>
      <div className="feed-list">
        {feed.map((item) => (
          <FeedCard key={item.event.id} item={item} />
        ))}
      </div>
    </>
  );
}
