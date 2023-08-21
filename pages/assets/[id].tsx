import AssetTopBar from "@/components/assets/TopBar";
import LoadingSpinner from "@/components/commons/animations/LoadingSpinner";
import ScrollToTop from "@/components/commons/scroll-to-top/ScrollToTop";
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
import styled from "styled-components";

/**
 *
 * @returns AssetDetailsPage that includes the financial/social/details for digital asset
 */
const AssetDetailsPage = ({ session }) => {
  const [timeQuery, setTimeQuery] = useState(365);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pageView, setPageView] = useState("dashboard");

  const router = useRouter();

  let id = "";

  if (router?.query?.id) {
    id = router.query.id as string;
  }

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
    // getMarketMetrics({
    //   variables: {
    //     symbol: id || "BTC",
    //     time: timeQuery,
    //   },
    // });
  }, [timeQuery, id]);

  // useEffect(() => {
  //   if (isBtc) {
  //     // fetch btcMacrosQuery
  //     getBTCMacros({
  //       variables: {
  //         symbol: id,
  //       },
  //     });
  //   }
  // }, [isBtc]);

  const assetDetails = useMemo(() => {
    if (!GeckoDetails?.getGeckoAssetDetails) return [];

    let data = GeckoDetails?.getGeckoAssetDetails;

    return (
      <div className={"w-100"}>
        <AssetDetailsRow>
          <div className="top-row">
            <div>
              <h5>Name</h5>
              <span>{data?.name}</span>
            </div>

            <div>
              <h5>Symbol</h5>
              <span>{data?.symbol.toUpperCase()}</span>
            </div>

            <div>
              <h5>Geneis Date</h5>
              <span>{data?.genesis_date}</span>
            </div>

            <div>
              <h5>Community Score</h5>
              <span>{data?.community_score}</span>
            </div>
          </div>

          <div className="mid-row">
            <div>
              <h5>Developer Score</h5>
              <span>{data?.developer_score}</span>
            </div>

            <div>
              <h5>Liquidity Score</h5>
              <span>{data?.liquidity_score}</span>
            </div>

            <div>
              <h5>Market Cap Rank</h5>
              <span>{data?.market_cap_rank}</span>
            </div>

            <div>
              <h5>Community Sentiment</h5>
              <span className="negative">
                {data?.sentiment_votes_down_percentage + "%"}
              </span>
              /
              <span className="positive">
                {data?.sentiment_votes_up_percentage + "%"}
              </span>
            </div>
          </div>
        </AssetDetailsRow>
      </div>
    );
  }, [GeckoDetails?.getGeckoAssetDetails]);

  return (
    <AssetDetailsPageContainer>
      <AssetTopBar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        view={pageView}
        setPageView={setPageView}
      />

      <ScrollToTop scrollThreshold={90} />

      {loading && (
        <div className={"container text-center"}>
          <LoadingSpinner />
        </div>
      )}

      {pageView === "dashboard" && data && (
        <ViewContainer>
          <h2>Indicators</h2>
          {GeckoDetails && !loading && assetDetails}

          <DashboardView
            id={id}
            MacroData={MacroData}
            GeckoDetails={GeckoDetails}
            timeQuery={timeQuery}
            data={data}
            loading={loading}
            isBtc
            isBtcOrEth
          />
        </ViewContainer>
      )}

      {pageView === "reports" && data && (
        <ViewContainer>
          <h2>News & Reports</h2>
          <ReportsView id={id} />
        </ViewContainer>
      )}

      {pageView === "simulator" && data && (
        <ViewContainer>
          <h2>Simulator & Analysis</h2>

          <SimulationView id={id} />
        </ViewContainer>
      )}

      {pageView === "settings" && data && (
        <ViewContainer>
          <h2>Settingss</h2>
        </ViewContainer>
      )}

      {/* 
      {!loading && (
        <div className={"container text-center"}>

          {!GeckoLoading && GeckoDetails && (
            <CollectiveStatsHodler>
              <CollectiveStatsId
                favoriteCount={
                  GeckoDetails?.getGeckoAssetDetails?.favorite_count || 0
                }
                id={id}
              />
            </CollectiveStatsHodler>
          )}

        </div>
      )}

    */}
    </AssetDetailsPageContainer>
  );
};

const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 10px auto;
  padding-top: 64px;
  text-align: center;

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

const AssetDetailsRow = styled.div`
  padding: 24px;
  background-color: ${Colors.lightGray};
  border-radius: 12px;
  margin: auto;
  text-align: center;
  border: 2px solid ${Colors.modern.accentBlue};

  @media ${MediaQueries.MD} {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 48px;
    max-width: 95%;
  }

  button {
    max-width: 25rem;
    margin: auto;
  }

  .top-row, .mid-row {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 48px;


    div {
      padding: 12px;
      border-bottom: 1px solid ${Colors.modern.accentBlue};

      @media ${MediaQueries.MD} {
         border-bottom: none;
      }
    }

    @media ${MediaQueries.MD} {
      flex-direction: row;
      border-bottom: none;
    }
  }

  .mid-row {
    padding-top: 48px;

    div {
      &:last-child {
        border-bottom: none;
      }
    }

  }

    .positive {
      color: green;
      padding: 0 0.5rem;
    }

    .negative {
      color: red;
      padding: 0 0.5rem;
    }

    ::-webkit-scrollbar {
      display: none;
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    }
  }
`;

const AssetDetailsPageContainer = styled.div`
  @media ${MediaQueries.MD} {
    display: flex;
    flex-direction: column;
  }
`;

// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/auth",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: { session },
//   };
// }

export default AssetDetailsPage;
