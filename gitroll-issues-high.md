# GitRoll issues export

- Source: https://gitroll.io/result/repo/UaiqJ7Wr1ppaFooIZZQK
- Generated: 2026-03-24T01:00:55.667Z
- Severity filter (table column): high
- Rate limits: click delay 450 ms, page delay 1200 ms
- Dedupe: on (GitHub URL + line + title)

## 1. Refactor this function to reduce its Cognitive Complexity from 22 to the 15 allowed.

- **Type:** Smell
- **Severity:** High
- **Line:** 45
- **Tags:** brain-overload, architecture
- **GitHub:** https://github.com/jarodchristiansen/hodlWatch/blob/6c7cde63d825255463315ab5adfe854b7100bacc/components/assets/AssetCard/AssetCard.tsx#L45-L45
- **Preview iframe:** https://gitroll.io/emgithub?private=false&owner=jarodchristiansen&repo=hodlWatch&revision=6c7cde63d825255463315ab5adfe854b7100bacc&path=components%2Fassets%2FAssetCard%2FAssetCard.tsx&startLine=45&endLine=45

### Snippet

```text
(lines 33–57 of 523)

  price_change_percentage_24h?: number;
  market_cap_rank?: number;
  ath: number;
  atl: number;
  ath_change_percentage: number;
  atl_change_percentage: number;
  circulating_supply: number;
  total_supply: number;
  atl_date: any;
  ath_date: any;
};

const AssetCard = ({ asset, email, favorited, viewMode = "grid" }: AssetCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    title,
    name,
    symbol,
    image,
    current_price,
    price_change_percentage_24h,
    market_cap_rank,
    ath,
    atl,
```

## 2. Refactor this function to reduce its Cognitive Complexity from 17 to the 15 allowed.

- **Type:** Smell
- **Severity:** High
- **Line:** 34
- **Tags:** brain-overload, architecture
- **GitHub:** https://github.com/jarodchristiansen/hodlWatch/blob/6c7cde63d825255463315ab5adfe854b7100bacc/components/assets/AssetSummaryCard.tsx#L34-L34
- **Preview iframe:** https://gitroll.io/emgithub?private=false&owner=jarodchristiansen&repo=hodlWatch&revision=6c7cde63d825255463315ab5adfe854b7100bacc&path=components%2Fassets%2FAssetSummaryCard.tsx&startLine=34&endLine=34

### Snippet

```text
(lines 22–46 of 374)

  name,
  symbol,
  price,
  priceChange24h,
  image,
  genesisDate,
  communityScore,
  developerScore,
  marketCapRank,
  liquidityScore,
  sentimentUp,
  sentimentDown,
}: AssetSummaryCardProps) => {
  const hasPrice = typeof price === "number" && !Number.isNaN(price);
  const hasChange24h =
    typeof priceChange24h === "number" && !Number.isNaN(priceChange24h);
  const changeIsPositive = !!hasChange24h && (priceChange24h as number) >= 0;

  return (
    <HeaderCard data-testid="asset-summary-card">
      <TopRow>
        <Identity>
          <IconWell aria-hidden="true">
            {image ? (
              <Image
```

## 3. Unexpected var, use let or const instead.

- **Type:** Smell
- **Severity:** High
- **Line:** 32
- **Tags:** es2015, bad-practice
- **GitHub:** https://github.com/jarodchristiansen/hodlWatch/blob/6c7cde63d825255463315ab5adfe854b7100bacc/components/assets/Finance/Charts/Desktop/EmaChartDesktop.tsx#L32-L32
- **Preview iframe:** https://gitroll.io/emgithub?private=false&owner=jarodchristiansen&repo=hodlWatch&revision=6c7cde63d825255463315ab5adfe854b7100bacc&path=components%2Fassets%2FFinance%2FCharts%2FDesktop%2FEmaChartDesktop.tsx&startLine=32&endLine=32

## 4. Unexpected var, use let or const instead.

- **Type:** Smell
- **Severity:** High
- **Line:** 36
- **Tags:** es2015, bad-practice
- **GitHub:** https://github.com/jarodchristiansen/hodlWatch/blob/6c7cde63d825255463315ab5adfe854b7100bacc/components/assets/Finance/Charts/Desktop/EmaChartDesktop.tsx#L36-L36
- **Preview iframe:** https://gitroll.io/emgithub?private=false&owner=jarodchristiansen&repo=hodlWatch&revision=6c7cde63d825255463315ab5adfe854b7100bacc&path=components%2Fassets%2FFinance%2FCharts%2FDesktop%2FEmaChartDesktop.tsx&startLine=36&endLine=36

### Snippet

```text
(lines 24–48 of 169)

  const [emaData, setEmaData] = useState<any>();
  const [showLatest14Days, setShowLatest14Days] = useState(false);

  useEffect(() => {
    processEmas(data);
  }, [showLatest14Days]);

  function EMACalc(mArray, mRange) {
    var k = 2 / (mRange + 1);
    // first item is just the same as the first item in the input
    let emaArray = [mArray[0]];
    // for the rest of the items, they are computed with the previous one
    for (var i = 1; i < mArray.length; i++) {
      emaArray.push(mArray[i] * k + emaArray[i - 1] * (1 - k));
    }
    return emaArray;
  }

  const handleCheckboxChange = () => {
    setShowLatest14Days(!showLatest14Days);
  };

  const processEmas = (data) => {
    let closeData = [];
    let dateData = [];
```

## 5. Refactor this function to reduce its Cognitive Complexity from 49 to the 15 allowed.

- **Type:** Smell
- **Severity:** High
- **Line:** 446
- **Tags:** brain-overload, architecture
- **GitHub:** https://github.com/jarodchristiansen/hodlWatch/blob/6c7cde63d825255463315ab5adfe854b7100bacc/db/resolvers/assets/index.js#L446-L446
- **Preview iframe:** https://gitroll.io/emgithub?private=false&owner=jarodchristiansen&repo=hodlWatch&revision=6c7cde63d825255463315ab5adfe854b7100bacc&path=db%2Fresolvers%2Fassets%2Findex.js&startLine=446&endLine=446

### Snippet

```text
(lines 434–458 of 573)

      // }

      if (data?.priceData) {
        return data;
      } else {
        throw new Error("Asset not found");
      }
    } catch (err) {
      throw new Error(err);
    }
  },

  getGeckoAssetDetails: async (_, { name, time }) => {
    try {
      const raw = (name || "").toString().trim();
      if (!raw) throw new Error("Asset not found");

      let dbAsset = await Asset.findOne({
        name: new RegExp(`^${escapeRegex(raw)}$`, "i"),
      }).catch(() => null);

      if (!dbAsset) {
        dbAsset = await Asset.findOne({
          symbol: new RegExp(`^${escapeRegex(raw)}$`, "i"),
        }).catch(() => null);
```

## 6. Refactor this function to reduce its Cognitive Complexity from 18 to the 15 allowed.

- **Type:** Smell
- **Severity:** High
- **Line:** 3
- **Tags:** brain-overload, architecture
- **GitHub:** https://github.com/jarodchristiansen/hodlWatch/blob/6c7cde63d825255463315ab5adfe854b7100bacc/helpers/financial/index.ts#L3-L3
- **Preview iframe:** https://gitroll.io/emgithub?private=false&owner=jarodchristiansen&repo=hodlWatch&revision=6c7cde63d825255463315ab5adfe854b7100bacc&path=helpers%2Ffinancial%2Findex.ts&startLine=3&endLine=3

### Snippet

```text
(lines 1–15 of 73)

import { FormatUnixTime } from "../formatters/time";

export const processFinancialHistory = (financialData) => {
  let market_dominance = [];
  let volatility = [];
  let volume = [];
  let highs = [];
  let lows = [];
  let closes = [];
  let percent_change = [];
  let price_btc = [];

  for (let i of financialData) {
    if (i?.market_dominance) {
      market_dominance.push({
```

## 7. Exporting mutable 'let' binding, use 'const' instead.

- **Type:** Smell
- **Severity:** High
- **Line:** 11
- **Tags:** architecture
- **GitHub:** https://github.com/jarodchristiansen/hodlWatch/blob/6c7cde63d825255463315ab5adfe854b7100bacc/lib/mongodb.js#L11-L11
- **Preview iframe:** https://gitroll.io/emgithub?private=false&owner=jarodchristiansen&repo=hodlWatch&revision=6c7cde63d825255463315ab5adfe854b7100bacc&path=lib%2Fmongodb.js&startLine=11&endLine=11

### Snippet

```text
(lines 1–23 of 33)

// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
```

## 8. Unexpected var, use let or const instead.

- **Type:** Smell
- **Severity:** High
- **Line:** 14
- **Tags:** es2015, bad-practice
- **GitHub:** https://github.com/jarodchristiansen/hodlWatch/blob/6c7cde63d825255463315ab5adfe854b7100bacc/pages/api/auth/%5B...nextauth%5D.js#L14-L14
- **Preview iframe:** https://gitroll.io/emgithub?private=false&owner=jarodchristiansen&repo=hodlWatch&revision=6c7cde63d825255463315ab5adfe854b7100bacc&path=pages%2Fapi%2Fauth%2F%5B...nextauth%5D.js&startLine=14&endLine=14

## 9. Unexpected var, use let or const instead.

- **Type:** Smell
- **Severity:** High
- **Line:** 15
- **Tags:** es2015, bad-practice
- **GitHub:** https://github.com/jarodchristiansen/hodlWatch/blob/6c7cde63d825255463315ab5adfe854b7100bacc/pages/api/auth/%5B...nextauth%5D.js#L15-L15
- **Preview iframe:** https://gitroll.io/emgithub?private=false&owner=jarodchristiansen&repo=hodlWatch&revision=6c7cde63d825255463315ab5adfe854b7100bacc&path=pages%2Fapi%2Fauth%2F%5B...nextauth%5D.js&startLine=15&endLine=15

### Snippet

```text
(lines 3–27 of 105)

import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import Auth0Provider from "next-auth/providers/auth0";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"
import clientPromise from "../../../lib/mongodb";
import User from "../../../db/models/user";

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
```

## 10. Unexpected var, use let or const instead.

- **Type:** Smell
- **Severity:** High
- **Line:** 17
- **Tags:** es2015, bad-practice
- **GitHub:** https://github.com/jarodchristiansen/hodlWatch/blob/6c7cde63d825255463315ab5adfe854b7100bacc/pages/api/auth/%5B...nextauth%5D.js#L17-L17
- **Preview iframe:** https://gitroll.io/emgithub?private=false&owner=jarodchristiansen&repo=hodlWatch&revision=6c7cde63d825255463315ab5adfe854b7100bacc&path=pages%2Fapi%2Fauth%2F%5B...nextauth%5D.js&startLine=17&endLine=17

### Snippet

```text
(lines 5–29 of 105)

import TwitterProvider from "next-auth/providers/twitter";
import Auth0Provider from "next-auth/providers/auth0";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"
import clientPromise from "../../../lib/mongodb";
import User from "../../../db/models/user";

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  adapter: MongoDBAdapter(clientPromise),
  providers: [
```

## 11. Unexpected var, use let or const instead.

- **Type:** Smell
- **Severity:** High
- **Line:** 18
- **Tags:** es2015, bad-practice
- **GitHub:** https://github.com/jarodchristiansen/hodlWatch/blob/6c7cde63d825255463315ab5adfe854b7100bacc/pages/api/auth/%5B...nextauth%5D.js#L18-L18
- **Preview iframe:** https://gitroll.io/emgithub?private=false&owner=jarodchristiansen&repo=hodlWatch&revision=6c7cde63d825255463315ab5adfe854b7100bacc&path=pages%2Fapi%2Fauth%2F%5B...nextauth%5D.js&startLine=18&endLine=18

### Snippet

```text
(lines 6–30 of 105)

import Auth0Provider from "next-auth/providers/auth0";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"
import clientPromise from "../../../lib/mongodb";
import User from "../../../db/models/user";

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    /* EmailProvider({
```

## 12. Define a constant instead of duplicating this literal "$regex" 4 times.

- **Type:** Smell
- **Severity:** High
- **Line:** 63
- **Tags:** design
- **GitHub:** https://github.com/jarodchristiansen/hodlWatch/blob/6c7cde63d825255463315ab5adfe854b7100bacc/scripts/sync_coingecko_assets.py#L63-L63
- **Preview iframe:** https://gitroll.io/emgithub?private=false&owner=jarodchristiansen&repo=hodlWatch&revision=6c7cde63d825255463315ab5adfe854b7100bacc&path=scripts%2Fsync_coingecko_assets.py&startLine=63&endLine=63

### Snippet

```text
(lines 51–75 of 494)

    """
    sym = symbol.strip()
    sym_pat = f"^{re.escape(sym)}$"
    legacy_no_id: Dict[str, Any] = {
        "$or": [
            {"coingecko_id": {"$exists": False}},
            {"coingecko_id": ""},
            {"coingecko_id": None},
        ]
    }
    legacy_match: List[Dict[str, Any]] = [
        legacy_no_id,
        {"symbol": {"$regex": sym_pat, "$options": "i"}},
    ]
    name_stripped = (name or "").strip()
    if name_stripped:
        name_pat = f"^{re.escape(name_stripped)}$"
        legacy_match.append({"name": {"$regex": name_pat, "$options": "i"}})

    return {"$or": [{"coingecko_id": gecko_id}, {"$and": legacy_match}]}


def parse_iso_dt(value: Optional[str]) -> Optional[datetime]:
    if not value or not isinstance(value, str):
        return None
```

## 13. Define a constant instead of duplicating this literal "$options" 4 times.

- **Type:** Smell
- **Severity:** High
- **Line:** 63
- **Tags:** design
- **GitHub:** https://github.com/jarodchristiansen/hodlWatch/blob/6c7cde63d825255463315ab5adfe854b7100bacc/scripts/sync_coingecko_assets.py#L63-L63
- **Preview iframe:** https://gitroll.io/emgithub?private=false&owner=jarodchristiansen&repo=hodlWatch&revision=6c7cde63d825255463315ab5adfe854b7100bacc&path=scripts%2Fsync_coingecko_assets.py&startLine=63&endLine=63

### Snippet

```text
(lines 51–75 of 494)

    """
    sym = symbol.strip()
    sym_pat = f"^{re.escape(sym)}$"
    legacy_no_id: Dict[str, Any] = {
        "$or": [
            {"coingecko_id": {"$exists": False}},
            {"coingecko_id": ""},
            {"coingecko_id": None},
        ]
    }
    legacy_match: List[Dict[str, Any]] = [
        legacy_no_id,
        {"symbol": {"$regex": sym_pat, "$options": "i"}},
    ]
    name_stripped = (name or "").strip()
    if name_stripped:
        name_pat = f"^{re.escape(name_stripped)}$"
        legacy_match.append({"name": {"$regex": name_pat, "$options": "i"}})

    return {"$or": [{"coingecko_id": gecko_id}, {"$and": legacy_match}]}


def parse_iso_dt(value: Optional[str]) -> Optional[datetime]:
    if not value or not isinstance(value, str):
        return None
```

## 14. Refactor this function to reduce its Cognitive Complexity from 34 to the 15 allowed.

- **Type:** Smell
- **Severity:** High
- **Line:** 123
- **Tags:** brain-overload, architecture
- **GitHub:** https://github.com/jarodchristiansen/hodlWatch/blob/6c7cde63d825255463315ab5adfe854b7100bacc/scripts/sync_coingecko_assets.py#L123-L123
- **Preview iframe:** https://gitroll.io/emgithub?private=false&owner=jarodchristiansen&repo=hodlWatch&revision=6c7cde63d825255463315ab5adfe854b7100bacc&path=scripts%2Fsync_coingecko_assets.py&startLine=123&endLine=123

### Snippet

```text
(lines 111–135 of 494)


def _response_snippet(resp: Response, limit: int = 400) -> str:
    try:
        text = resp.text or ""
    except Exception:
        return "(no body)"
    text = text.strip().replace("\n", " ")
    if len(text) > limit:
        return text[:limit] + "…"
    return text or "(empty)"


def fetch_markets_page(
    session: requests.Session,
    base_url: str,
    page: int,
    per_page: int,
    headers: Optional[Dict[str, str]],
    max_attempts: int,
    sleep_429_sec: float,
) -> List[Dict[str, Any]]:
    """
    Up to `max_attempts` tries for this page. On 429, sleep `sleep_429_sec` (default 5 min) then retry.
    Raises RuntimeError if all attempts fail.
    """
```

## 15. Refactor this function to reduce its Cognitive Complexity from 33 to the 15 allowed.

- **Type:** Smell
- **Severity:** High
- **Line:** 376
- **Tags:** brain-overload, architecture
- **GitHub:** https://github.com/jarodchristiansen/hodlWatch/blob/6c7cde63d825255463315ab5adfe854b7100bacc/scripts/sync_coingecko_assets.py#L376-L376
- **Preview iframe:** https://gitroll.io/emgithub?private=false&owner=jarodchristiansen&repo=hodlWatch&revision=6c7cde63d825255463315ab5adfe854b7100bacc&path=scripts%2Fsync_coingecko_assets.py&startLine=376&endLine=376

### Snippet

```text
(lines 364–388 of 494)


    new_sleep = max(page_sleep, min_sleep)
    if new_sleep > page_sleep:
        print(
            f"GitHub Actions without COINGECKO_API_KEY: raising PAGE_SLEEP_SEC "
            f"{page_sleep} -> {new_sleep}s between successful API batches.",
            file=sys.stderr,
        )

    return new_pages, new_sleep


def main() -> int:
    uri = os.environ.get("MONGODB_URI", "").strip()
    if not uri:
        print("MONGODB_URI is required", file=sys.stderr)
        return 1

    db_name = os.environ.get("MONGODB_DB_NAME", "Crypto_Watch").strip()
    coll_name = os.environ.get("MONGODB_COLLECTION", "assets").strip()
    max_pages = int((os.environ.get("MAX_PAGES") or "20").strip() or "20")
    api_key = os.environ.get("COINGECKO_API_KEY", "").strip()
    on_github_free = (
        os.environ.get("GITHUB_ACTIONS", "").lower() == "true" and not api_key
    )
```
