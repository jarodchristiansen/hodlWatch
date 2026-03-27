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
import { BorderRadius, Colors, FontFamily, MediaQueries, Surfaces } from "@/styles/variables";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styled from "styled-components";

const SIDEBAR_WIDTH_CLOSED = 56;
const SIDEBAR_WIDTH_OPEN = 220;

/** Next.js `router.query` values are `string | string[] | undefined` */
function queryAsString(value: string | string[] | undefined): string | undefined {
  if (value == null) return undefined;
  if (typeof value === "string") return value;
  if (Array.isArray(value) && value.length > 0) return value[0];
  return undefined;
}

const AssetDetailsPage = ({ session }) => {
  const [timeQuery] = useState(365);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pageView, setPageView] = useState("dashboard");
  const [aboutOpen, setAboutOpen] = useState(false);

  const router = useRouter();
  const { asPath } = router;

  const id = queryAsString(router.query?.id) ?? "";
  const name = queryAsString(router.query?.name);

  const [getFinancials, { data, loading, error }] =
    useLazyQuery(GET_ASSET_HISTORY);

  const [
    getDetails,
    { data: GeckoDetails, loading: GeckoLoading, error: GeckoError },
  ] = useLazyQuery(GET_GECKO_DETAILS);

  const [getBTCMacros, { data: MacroData, error: MacroError }] =
    useLazyQuery(GET_BTC_MACROS);

  const isBtc = id === "btc";

  // Keep view state shareable + back/forward friendly
  useEffect(() => {
    const viewFromUrl = router?.query?.view;
    if (
      typeof viewFromUrl === "string" &&
      ["dashboard", "reports", "simulator", "settings"].includes(viewFromUrl) &&
      viewFromUrl !== pageView
    ) {
      setPageView(viewFromUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.query?.view]);

  const setView = (view: string) => {
    setPageView(view);
    router.replace(
      {
        pathname: router.pathname,
        query: { ...router.query, view },
      },
      undefined,
      { shallow: true }
    );
  };

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

  useEffect(() => {
    if (id && isBtc && pageView === "dashboard") {
      getBTCMacros({
        variables: { symbol: id.toUpperCase() },
      });
    }
  }, [getBTCMacros, id, isBtc, pageView]);

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
      image:
        details?.image?.large ||
        details?.image?.small ||
        details?.image?.thumb ||
        null,
      genesisDate: details?.genesis_date,
      communityScore: details?.community_score,
      developerScore: details?.developer_score,
      marketCapRank: details?.market_cap_rank,
      liquidityScore: details?.liquidity_score,
      sentimentUp: details?.sentiment_votes_up_percentage,
      sentimentDown: details?.sentiment_votes_down_percentage,
    };
  }, [GeckoDetails, id]);

  const pageReady = !!data && !!GeckoDetails;
  const pageLoading =
    (!!id && (!pageReady && (loading || GeckoLoading))) || false;

  return (
    <AssetDetailsPageLayout>
      <SidebarV2
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        view={pageView}
        setPageView={setView}
      />
      <MainContentArea $sidebarOpen={sidebarOpen}>
        {pageLoading && (
          <LoadingSpinner overlay message="Loading asset workspace" />
        )}

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

        {(error || GeckoError || MacroError) && (
          <ErrorBanner>
            <output className="msg" aria-live="polite">
              Some sections failed to load. Try refreshing the page.
            </output>
            {process.env.NODE_ENV !== "production" && (
              <details className="details">
                <summary>Show error details (dev)</summary>
                <pre>
                  {JSON.stringify(
                    {
                      assetHistory: error?.message || error || null,
                      gecko: GeckoError?.message || GeckoError || null,
                      macros: MacroError?.message || MacroError || null,
                    },
                    null,
                    2
                  )}
                </pre>
              </details>
            )}
          </ErrorBanner>
        )}

        {!!assetDetails && (
          <AboutSection>
            <AboutHeader>
              <button
                type="button"
                onClick={() => setAboutOpen((v) => !v)}
                aria-expanded={aboutOpen}
              >
                About {summary?.name}
                <span aria-hidden="true">{aboutOpen ? "▾" : "▸"}</span>
              </button>
            </AboutHeader>
            {aboutOpen && <div>{assetDetails}</div>}
          </AboutSection>
        )}

        {pageView === "dashboard" && data && (
          <ViewContainer>
            <DashboardView
              id={id}
              MacroData={MacroData}
              data={data}
              loading={loading}
              isBtc={isBtc}
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
  background: linear-gradient(120deg, ${Colors.primary} 0%, ${Colors.charcoal} 100%);
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
  padding-top: 24px;
  text-align: left;
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
    padding-top: 32px;
    width: 90%;
  }

  @media ${MediaQueries.LG} {
    width: 85%;
  }
`;

const ErrorBanner = styled.div`
  width: 95%;
  margin: 16px auto 0 auto;
  border-radius: ${BorderRadius.large};
  padding: 12px 14px;
  background: rgba(231, 76, 60, 0.14);
  border: 1px solid rgba(231, 76, 60, 0.28);
  color: rgba(255, 255, 255, 0.92);
  font-family: ${FontFamily.primary};
  font-weight: 700;

  .msg {
    display: block;
    margin: 0;
    font: inherit;
    font-weight: 700;
  }

  .details {
    margin-top: 10px;
  }

  summary {
    cursor: pointer;
    font-weight: 900;
    color: ${Colors.white};
  }

  pre {
    margin: 10px 0 0 0;
    padding: 10px 12px;
    border-radius: 12px;
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.12);
    white-space: pre-wrap;
    word-break: break-word;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.88);
  }
`;

const AboutSection = styled.section`
  width: 95%;
  margin: 16px auto 0 auto;
  border-radius: ${BorderRadius.xlarge};
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: ${Surfaces.cardPanelStrong};
  overflow: hidden;
`;

const AboutHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  button {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: transparent;
    border: none;
    color: ${Colors.white};
    font-family: ${FontFamily.primary};
    font-weight: 900;
    cursor: pointer;
    padding: 0;

    &:focus-visible {
      outline: 2px solid ${Colors.accent};
      outline-offset: 4px;
      border-radius: 10px;
    }
  }
`;

const StyledMarkdown = styled.div`
  width: 95%;
  margin: 0 auto;
  padding: 14px 14px 16px 14px;
  background: transparent;
  color: ${Colors.white};
  font-size: 1.08rem;
  line-height: 1.7;
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
