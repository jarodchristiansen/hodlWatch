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
import { Colors, FontWeight, MediaQueries } from "@/styles/variables";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

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
  }, [timeQuery, id]);

  const assetDetails = useMemo(() => {
    if (!GeckoDetails?.getGeckoAssetDetails) return null;

    const data = GeckoDetails?.getGeckoAssetDetails;

    return (
      <>
        <AssetDetailsTable>
          <tbody>
            <tr>
              <td>Name</td>

              <td>Symbol</td>

              <td>Geneis Date</td>

              <td>Community Score</td>
            </tr>
            <tr>
              <td>{data?.name}</td>
              <td>{data?.symbol.toUpperCase()}</td>
              <td>{data?.genesis_date}</td>

              <td>{data?.community_score}</td>
            </tr>
            <tr>
              <td>Developer Score</td>
              <td>Market Cap Rank</td>
              <td>Liquidity Score</td>
              <td>Community Sentiment</td>
            </tr>
            <tr>
              <td>{data?.developer_score}</td>

              <td>{data?.market_cap_rank}</td>
              <td>{data?.liquidity_score}</td>

              <td>
                <span className="negative">
                  {data?.sentiment_votes_down_percentage + "% Down Votes"}
                </span>
                {" / "}
                <span className="positive">
                  {data?.sentiment_votes_up_percentage + "% Up Votes"}
                </span>
              </td>
            </tr>
            {/* <tr>
              <td colSpan={4}>
                Categories:
                {data?.categories?.map((category, index) => (
                  <span key={index}>{category}</span>
                ))}
              </td>
            </tr> */}
          </tbody>
        </AssetDetailsTable>
        <AssetDescription>{data?.description?.en}</AssetDescription>
      </>
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

      <div>{GeckoDetails && !loading && assetDetails}</div>

      {loading && (
        <div className="container text-center">
          <LoadingSpinner />
        </div>
      )}
      {pageView === "dashboard" && data && (
        <ViewContainer>
          <h2>Indicators</h2>

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

const AssetDetailsTable = styled.table`
  width: 95%;
  border-collapse: collapse;
  border: 2px solid ${Colors.primary};
  border-radius: 12px;
  color: ${Colors.white};
  margin: auto;

  th,
  td {
    border: 1px solid ${Colors.primary};
    padding: 18px;
    text-align: left;
  }

  tr:nth-child(odd) {
    /* color: black; */
    /* background-color: ${Colors.white}; */
    background-color: ${Colors.secondary};
    font-weight: ${FontWeight.bold};
  }

  .negative {
    color: red;
  }

  .positive {
    color: #14d114;
  }
`;

const AssetDescription = styled.div`
  width: 95%;
  padding: 24px;
  background-color: ${Colors.secondary};
  border: 2px solid lightgray;
  color: ${Colors.white};
  /* font-weight: 700; */
  margin: auto;
  text-align: center;
`;

const AssetDetailsPageContainer = styled.div`
  @media ${MediaQueries.MD} {
    display: flex;
    flex-direction: column;
  }
`;

export default AssetDetailsPage;
