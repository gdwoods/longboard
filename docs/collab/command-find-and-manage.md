# Command Center — `/command/find` and `/command/manage`

This doc is a practical guide to what the Command Center pages do **today**, what is still **placeholder**, and what the **next steps** should be.

---

## `/command/find` — Scanner + chart + detail drawer

### What it is

`/command/find` is the primary “market scanner” page:

- **Left column**: a live-updating movers list (gainers/losers/active/unusual) with filters.
- **Main panel**: a TradingView chart (by ticker).
- **Right rail**: supporting panels (strategies, news/streams) and a **detail side drawer** for the selected ticker.

### Core interactions

- **Pick a list**: segmented control switches between:
  - **gainers**: top % gainers (using the app’s Polygon-based movers API)
  - **losers**: top % losers
  - **active**: most active by volume
  - **unusual**: “unusual activity” ranking (implementation depends on server logic)
- **Filter the scanner**:
  - **Filters** panel supports slider-mode or typed ranges (price, % move, volume, market cap, max rows).
  - **Columns** panel lets you show/hide and reorder columns (rank, ticker, last, %, $ chg, vol, $vol, cap, prev, range, vwap).
- **Chart behavior**:
  - Chart ticker is controlled by either:
    - clicking a row, or
    - typing a ticker into the **Ticker** input and pressing **load**.
  - Chart uses TradingView widget embed (interval currently hardcoded in the widget URL).
- **Detail drawer**:
  - Clicking a row opens the **detail drawer** for that ticker.
  - Drawer includes a “Research” section that pulls enrichment data from the same backend used by `/workspace`.
- **My list + pinning**
  - **Pin (★)**: “pin” keeps tickers at the top of the table.
  - **My list (+ / ✓)**: saves tickers locally in the browser and exposes a “my list” drawer/panel.
  - These are currently **browser-local** (not tied to user auth).

### Persistence / caching

`/command/find` persists user preferences locally in the browser (via `localStorage`), including:

- selected movers list kind
- filter values and mode
- selected columns / column order
- pinned tickers
- “my list” saved tickers

The **Research** enrichment is cached locally per ticker (short TTL) and can be manually refreshed.

### Data sources (today)

- **Market snapshots (movers list)**: Polygon via `GET /api/command/movers`
- **Single-ticker snapshot**: Polygon via `GET /api/command/ticker?symbol=...` (used when needed)
- **Related news**: Polygon via command news API (and/or Research summary, depending on section)
- **Fundamentals**: Finnhub via `GET /api/command/fundamentals?symbol=...`
- **SEC filings**: SEC submissions API (preferred) with Finnhub fallback via `GET /api/command/filings?symbol=...`
- **Research enrichment** (drawer): `GET /api/research?ticker=...` (Buddy/OpenClaw pipeline)

### Placeholders / known rough edges

- **Open trades / execution**: not part of `/find` (that belongs on `/manage`), and any order/position data should stay out of this page for now.
- **TradingView interval**: interval is currently embedded in the widget URL; it’s not yet controlled by UI on `/find`.
- **“My list”** is local-only (per browser). A future version should store per-user server-side.
- **Pre-market behavior**: Polygon data can be sparse pre-market; the server logic contains “outside market hours” behavior that may still need tuning.

### Suggested next steps

- **Chart/timeframe controls**: add a 1m/3m/5m toggle (like `/manage`) and/or persist per user.
- **Drawer enrichment polish**:
  - make data sections collapsible (Market / Fundamentals / News) with saved open state
  - add source links where missing (SEC doc links, vendor attribution)
  - improve loading/error states and fallbacks per block
- **Server-side “My list”**:
  - store watchlist per user in Supabase (or existing user profile table)
  - support multiple lists and tags
- **Compliance hardening**:
  - ensure any “user-chosen symbol streaming” is gated behind the correct data plan and/or replaced with licensed data
  - document exactly which widgets/data sources are allowed under current terms

---

## `/command/manage` — Open trades + fixed chart grid

### What it is

`/command/manage` is the initial “positions and management” page, intended to show:

- **Open positions + P&L** (initially read-only)
- A **4-up chart grid** that is restricted to a shared set of symbols (see Polygon TOS constraints below)
- Future controls for **stop**, **target**, and basic position management

### Polygon TOS constraint (current implementation)

To avoid violating Polygon terms during early development, the manage charts are currently limited to **the same 4 tickers for all users**:

- The page fetches **top 4 market gainers** and renders charts for those.
- Users cannot choose arbitrary tickers on `/manage` yet.

### Timeframe control

Manage has a single timeframe toggle applied to all charts:

- **1m / 3m / 5m**

### Open trades section (today)

Currently shows an **empty-state placeholder** (“No open positions yet”).

This is where we will later render a table of:

- symbol
- quantity
- average price
- last price
- unrealized P&L

### Data sources (today)

- **Top gainers**: Polygon endpoint via `GET /api/command/manage/top-gainers`
- **Charts**: TradingView widget embed

### Placeholders / known rough edges

- **Open trades** is placeholder only until we connect brokerage / positions API.
- **Stops/targets** are not implemented yet.
- Manage is currently **auth-gated** (it redirects to `/login` if not signed in).

### Suggested next steps

- **Brokerage integration** (read-only first):
  - pull open positions from Alpaca/TradeZero (or the platform of record)
  - compute and display unrealized P&L server-side for consistency
- **Stops/targets UX**:
  - allow per-position stop + target inputs
  - validation, step sizes, and clear “arming” state
  - audit trail (who changed what, when)
- **Charts upgrade path**:
  - once the data plan/licensing is upgraded, allow users to select symbols/timeframes
  - persist layout preferences per user
- **Risk controls**:
  - global daily loss limit / kill switch integration (if present elsewhere in the app)
  - per-position max size / max loss rules

---

## Quick reference: key files

### `/command/find`

- UI: `components/command/CommandFindClient.tsx`
- Page wrapper: `app/command/find/page.tsx`
- Styles: `app/command/command.css`
- Movers API: `app/api/command/movers/route.ts`
- Ticker snapshot: `app/api/command/ticker/route.ts`
- Enrichment APIs:
  - `app/api/command/fundamentals/route.ts`
  - `app/api/command/filings/route.ts`
  - `app/api/research/route.ts`

### `/command/manage`

- UI: `components/command/CommandManageClient.tsx`
- Page wrapper: `app/command/manage/page.tsx`
- Top gainers API: `app/api/command/manage/top-gainers/route.ts`

