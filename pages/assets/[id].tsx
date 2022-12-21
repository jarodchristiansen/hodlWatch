import FinancialAccordion from "@/components/assets/Finance/FinancialAccordion";
import PairDetailsRow from "@/components/assets/Finance/PairDetails/index";
import IndicatorAccordion from "@/components/assets/Indicators/IndicatorAccordion";
import LoadingSpinner from "@/components/commons/animations/LoadingSpinner";
import TimeButtons from "@/components/commons/TimeButtons";
import { GET_GECKO_DETAILS } from "@/helpers/queries/assets";
import { GET_ASSET_HISTORY } from "@/helpers/queries/assets/getAssetFinancialDetails";
import { MediaQueries } from "@/styles/MediaQueries";
import { useLazyQuery } from "@apollo/client";
import { getSession } from "next-auth/client";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
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
const AssetDetailsPage = () => {
  const [timeQuery, setTimeQuery] = useState(14);

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

  const availableTimes = [14, 30, 90, 180, 365];
  const isBtcOrEth = id === "btc" || id === "eth";

  useEffect(() => {
    if (id) {
      getFinancials({
        variables: {
          symbol: id || "BTC",
          time: timeQuery,
        },
      });
    }

    getDetails({
      variables: {
        name: name || id || "BTC",
        time: timeQuery,
      },
    });
  }, [timeQuery, id]);

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
      <Head>
        <link rel="icon" type="image/png" href="/images/cube-svgrepo-com.svg" />
        <title>{`Asset Details - ${id?.toUpperCase()}`}</title>
      </Head>

      {!loading && (
        <div className={"container text-center"}>
          {GeckoDetails && !loading && assetDetails}

          {id && (
            <PairRowContainer>
              <PairDetailsRow id={id} />
            </PairRowContainer>
          )}

          {data && (
            <FilterBar>
              <h3>{timeQuery} Days</h3>
              <TimeButtons
                setTimeQuery={setTimeQuery}
                availTimes={availableTimes}
                refetch={refetch}
              />
            </FilterBar>
          )}

          {data && (
            <>
              {/* <AssetDetailsHeader
       asset={id}
       time={timeQuery}
       assetData={
         data?.getAssetFinancialDetails
           ? data?.getAssetFinancialDetails
           : ""
       }
     /> */}
              <Accordion defaultActiveKey="1">
                <FinancialAccordion
                  financialData={
                    data?.getAssetHistory?.priceData
                      ? data?.getAssetHistory.priceData
                      : []
                  }
                  id={id}
                />
                {isBtcOrEth && (
                  <IndicatorAccordion
                    timeQuery={timeQuery}
                    id={id}
                    blockchainData={
                      data?.getAssetHistory?.blockchainData
                        ? data?.getAssetHistory.blockchainData
                        : []
                    }
                  />
                )}
              </Accordion>
            </>
          )}
        </div>
      )}

      {loading && (
        <div className={"container text-center"}>
          <LoadingSpinner />
        </div>
      )}
    </AssetDetailsPageContainer>
  );
};

const AssetDetailsRow = styled.div`
  padding: 0.5rem;

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
    }
  }

  .mid-row {
    display: flex;
    gap: 1rem;
    overflow-x: scroll;
    padding-right: 1rem;
    text-align: center;
    justify-content: space-between;

    div {
      display: flex;
      flex-direction: column;
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
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  min-height: 100vh;
`;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default AssetDetailsPage;
