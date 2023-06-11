import FinancialChartGrid from "@/components/assets/Finance/FinancialChartCGrid";
import PairDetailsRow from "@/components/assets/Finance/PairDetails";
import IndicatorGrid from "@/components/assets/Indicators/Charts/Desktop/IndicatorGrid";
import LoadingSpinner from "@/components/commons/animations/LoadingSpinner";
import SidebarV2 from "@/components/commons/sidebar-nav/SidebarV2";
import { GET_GECKO_DETAILS } from "@/helpers/queries/assets";
import {
  GET_ASSET_HISTORY,
  GET_BTC_MACROS,
} from "@/helpers/queries/assets/getAssetFinancialDetails";
import { MediaQueries } from "@/styles/variables";
import { useLazyQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { Accordion } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import styled from "styled-components";

/**
 *
 * @returns AssetDetailsPage that includes the financial/social/details for digital asset
 */
const AssetDetailsPage = ({ session }) => {
  const [timeQuery, setTimeQuery] = useState(180);
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

  const availableTimes = [30, 90, 180, 365, 730];

  // const availableTimes = [14, 30, 90, 180, 365];
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
    }
    // getMarketMetrics({
    //   variables: {
    //     symbol: id || "BTC",
    //     time: timeQuery,
    //   },
    // });
    // getDetails({
    //   variables: {
    //     name: name || id || "BTC",
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
        <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="1">
            <Accordion.Header>Asset Details</Accordion.Header>
            <Accordion.Body>
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
                </div>

                <div className="mid-row">
                  <div>
                    <h5>Geneis Date</h5>
                    <span>{data?.genesis_date}</span>
                  </div>

                  <div>
                    <h5>Community Score</h5>
                    <span>{data?.community_score}</span>
                  </div>

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

                {!!data?.description?.en && (
                  <div className="bottom-row">
                    <ReactMarkdown
                      // eslint-disable-next-line react/no-children-prop
                      children={data?.description?.en}
                      remarkPlugins={[remarkGfm, remarkParse, remarkRehype]}
                      rehypePlugins={[rehypeRaw]}
                      // key={markdownPiece + Math.random()}
                    />
                  </div>
                )}
              </AssetDetailsRow>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    );
  }, [GeckoDetails?.getGeckoAssetDetails]);

  return (
    <AssetDetailsPageContainer>
      <SidebarV2 open={sidebarOpen} setOpen={setSidebarOpen} view={pageView} />

      {loading && (
        <div className={"container text-center"}>
          <LoadingSpinner />
        </div>
      )}

      {pageView === "dashboard" && data && (
        <ViewContainer>
          {id && (
            <PairRowContainer>
              <PairDetailsRow id={id} />
            </PairRowContainer>
          )}

          <FinancialChartGrid
            financialData={
              data?.getAssetHistory?.priceData
                ? data?.getAssetHistory.priceData
                : []
            }
            id={id}
          />

          {isBtcOrEth && (
            <IndicatorGrid
              timeQuery={timeQuery}
              id={id}
              blockchainData={
                data?.getAssetHistory?.blockchainData
                  ? data?.getAssetHistory.blockchainData
                  : []
              }
            />
          )}
        </ViewContainer>
      )}

      {/* 
      {!loading && (
        <div className={"container text-center"}>
          {GeckoDetails && !loading && assetDetails}

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



          <BitcoinMacrosContainer
            MacroData={MacroData?.getBTCMacros?.macro_data}
          />
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
  margin: 0 auto;

  @media ${MediaQueries.SM} {
    width: 95%;
  }

  @media ${MediaQueries.MD} {
    width: 90%;
  }

  @media ${MediaQueries.LG} {
    width: 85%;
  }
`;

const CollectiveStatsHodler = styled.div`
  padding: 2rem 0;

  @media ${MediaQueries.MD} {
    margin-right: unset;
    margin-left: unset;
    padding: 2rem;
  }
`;

const AssetDetailsRow = styled.div`
  padding: 0.5rem;
  margin-right: -2rem;
  margin-left: -0.5rem;

  @media ${MediaQueries.MD} {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 70rem;
    padding: 2rem;
    margin: auto;
  }
  button {
    max-width: 25rem;
    margin: auto;
  }

  .top-row {
    display: flex;
    justify-content: center;
    gap: 1rem;

    div {
      display: flex;
      flex-direction: column;
      text-align: center;
      justify-content: center;
      border: 1px solid black;
      border-radius: 12px;
      padding: 1rem;
      background-color: #f6f3f7;
      box-shadow: 2px 4px 8px lightgray;
    }
  }

  .mid-row {
    display: flex;
    gap: 1rem;
    overflow-x: scroll;
    padding-right: 1rem;
    text-align: center;
    justify-content: space-between;
    padding-top: 1rem;
    padding-bottom: 1rem;

    div {
      display: flex;
      flex-direction: column;
      background-color: #f6f3f7;
      border-radius: 12px;
      justify-content: center;
      padding: 1rem;
      border: 1px solid black;
      box-shadow: 2px 4px 8px lightgray;

      span {
        font-weight: bold;
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

  .bottom-row {
    text-align: center;
  }
`;

const PairRowContainer = styled.div`
  margin-right: -0.5rem;
  margin-left: -0.5rem;
  min-width: 100%;
  text-align: center;
  padding: 1rem 0;
`;

const FilterBar = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  text-align: center;
  justify-content: center;
  background-color: white;
  z-index: 100;
  top: 0;
  padding: 1rem 0;
`;

const AssetDetailsPageContainer = styled.div`
  @media ${MediaQueries.MD} {
    display: flex;
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
