import AssetSummaryCard from "@/components/assets/AssetSummaryCard";
import LoadingSpinner from "@/components/commons/animations/LoadingSpinner";
import ScrollToTop from "@/components/commons/scroll-to-top/ScrollToTop";
import SidebarV2 from "@/components/commons/sidebar-nav/SidebarV2";
import DashboardView from "@/components/views/DashboardView";
import ReportsView from "@/components/views/ReportsView";
import SimulationView from "@/components/views/SimulationView";
import { GET_GECKO_DETAILS } from "@/helpers/queries/assets";
import {
  GET_ASSET_HISTORY,
  GET_BTC_MACROS,
} from "@/helpers/queries/assets/getAssetFinancialDetails";
import { Colors, MediaQueries } from "@/styles/variables";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styled from "styled-components";

const SIDEBAR_WIDTH_CLOSED = 56;
const SIDEBAR_WIDTH_OPEN = 220;

const AssetDetailsPage = ({ session }) => {
  const [timeQuery, setTimeQuery] = useState(365);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pageView, setPageView] = useState("dashboard");

  const router = useRouter();
  const { asPath } = router;

  let id = router?.query?.id || "";
  let symbol = router.query?.symbol;
  let name = router.query?.name;

  const [getFinancials, { data, loading, error, refetch }] =
    useLazyQuery(GET_ASSET_HISTORY);

  const [
    getDetails,
    { data: GeckoDetails, loading: GeckoLoading, error: GeckoError },
  ] = useLazyQuery(GET_GECKO_DETAILS);

  const [
    getBTCMacros,
    { data: MacroData, loading: MacroLoading, error: MacroError },
  ] = useLazyQuery(GET_BTC_MACROS);

  const isBtcOrEth = id === "btc" || id === "eth";
  const isBtc = id === "btc";

  useEffect(() => {
    if (id) {
      getFinancials({
        variables: {
          symbol: id || "BTC",
          time: timeQuery,
        },
      });

      getDetails({
        variables: {
          name: name || id || "BTC",
          time: timeQuery,
        },
      });
    }
  }, [timeQuery, id, getDetails, getFinancials, name]);

  const assetDetails = useMemo(() => {
    if (!GeckoDetails?.getGeckoAssetDetails) return null;

    const data = GeckoDetails?.getGeckoAssetDetails;

    if (!data?.description?.en) return null;

    return (
      <StyledMarkdown>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {data.description.en}
        </ReactMarkdown>
      </StyledMarkdown>
    );
  }, [GeckoDetails?.getGeckoAssetDetails]);

  // Extract summary info for AssetSummaryCard
  const summary = useMemo(() => {
    const details = GeckoDetails?.getGeckoAssetDetails;
    return {
      name: details?.name || id,
      symbol: details?.symbol || id,
      price: details?.market_data?.current_price?.usd,
      priceChange24h: details?.market_data?.price_change_percentage_24h,
      image: details?.image?.large || details?.image,
      genesisDate: details?.genesis_date,
      communityScore: details?.community_score,
      developerScore: details?.developer_score,
      marketCapRank: details?.market_cap_rank,
      liquidityScore: details?.liquidity_score,
      sentimentUp: details?.sentiment_votes_up_percentage,
      sentimentDown: details?.sentiment_votes_down_percentage,
    };
  }, [GeckoDetails, id]);

  return (
    <AssetDetailsPageLayout>
      <SidebarV2
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        view={pageView}
        setPageView={setPageView}
      />
      <MainContentArea $sidebarOpen={sidebarOpen}>
        <AssetSummaryCard
          name={summary.name}
          symbol={summary.symbol}
          price={summary.price}
          priceChange24h={summary.priceChange24h}
          image={summary.image}
          genesisDate={summary.genesisDate}
          communityScore={summary.communityScore}
          developerScore={summary.developerScore}
          marketCapRank={summary.marketCapRank}
          liquidityScore={summary.liquidityScore}
          sentimentUp={summary.sentimentUp}
          sentimentDown={summary.sentimentDown}
        />
        <ScrollToTop scrollThreshold={90} />
        <div>{GeckoDetails && !loading && assetDetails}</div>
        {loading && (
          <div className="container text-center">
            <LoadingSpinner />
          </div>
        )}
        {pageView === "dashboard" && data && (
          <ViewContainer>
            <DashboardView
              id={id}
              MacroData={MacroData}
              GeckoDetails={GeckoDetails}
              timeQuery={timeQuery}
              data={data}
              loading={loading}
              isBtc={isBtc}
              isBtcOrEth={isBtcOrEth}
            />
          </ViewContainer>
        )}
        {pageView === "reports" && data && (
          <ViewContainer>
            <ReportsView id={id} />
          </ViewContainer>
        )}
        {pageView === "simulator" && data && (
          <ViewContainer>
            <SimulationView id={id} />
          </ViewContainer>
        )}
        {pageView === "settings" && data && (
          <ViewContainer>
            <h2>Settings</h2>
          </ViewContainer>
        )}
      </MainContentArea>
    </AssetDetailsPageLayout>
  );
};

const AssetDetailsPageLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  @media ${MediaQueries.MD} {
    flex-direction: row;
  }
`;

const MainContentArea = styled.div<{ $sidebarOpen?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 0.5rem;
  margin-left: 0;
  transition: margin-left 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  @media ${MediaQueries.MD} {
    padding: 2rem 2.5rem 2rem 0.5rem;
    margin-left: ${({ $sidebarOpen }) =>
      $sidebarOpen ? `${SIDEBAR_WIDTH_OPEN}px` : `${SIDEBAR_WIDTH_CLOSED}px`};
  }
`;

const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px auto;
  padding-top: 64px;
  text-align: center;
  gap: 48px;

  h2 {
    color: white;
    padding: 24px;
  }

  .bottom-row {
    padding: 24px;
    background-color: white;
    text-align: center;
    border-radius: 12px;
  }

  @media ${MediaQueries.SM} {
    width: 95%;
  }

  @media ${MediaQueries.MD} {
    padding-top: 48px;
    width: 90%;
  }

  @media ${MediaQueries.LG} {
    width: 85%;
  }
`;

const AssetDescription = styled.div`
  display: none;
  width: 95%;
  padding: 24px;
  background-color: ${Colors.secondary};
  border: 2px solid lightgray;
  color: ${Colors.white};
  /* font-weight: 700; */
  margin: auto;
  text-align: center;

  @media ${MediaQueries.MD} {
    display: block;
  }
`;

const StyledMarkdown = styled.div`
  width: 95%;
  margin: 2rem auto 0 auto;
  padding: 2rem 1.5rem;
  background: linear-gradient(
    90deg,
    ${Colors.charcoal} 0%,
    ${Colors.primary} 100%
  );
  border-radius: 14px;
  border: 1.5px solid ${Colors.primary};
  color: ${Colors.white};
  font-size: 1.08rem;
  line-height: 1.7;
  box-shadow: 0 2px 12px 0 rgba(20, 20, 40, 0.1);
  text-align: left;
  word-break: break-word;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${Colors.accent};
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    font-weight: 700;
  }

  p,
  ul,
  ol {
    margin-bottom: 1rem;
  }

  ul,
  ol {
    padding-left: 1.5rem;
  }

  a {
    color: ${Colors.accent};
    text-decoration: underline;

    &:hover {
      color: ${Colors.secondary};
    }
  }

  code {
    background: ${Colors.secondary};
    color: ${Colors.accent};
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-size: 0.98em;
  }

  blockquote {
    border-left: 4px solid ${Colors.accent};
    background: rgba(255, 255, 255, 0.04);
    padding: 0.5em 1em;
    margin: 1em 0;
    color: ${Colors.accent};
    font-style: italic;
  }
`;

export default AssetDetailsPage;
