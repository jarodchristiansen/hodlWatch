import React, { useEffect, useState } from "react";
import { useRouter, withRouter } from "next/router";
import FinancialAccordion from "../../components/assets/Finance/FinancialAccordion";
import { useQuery, useLazyQuery } from "@apollo/client";
import GET_ASSET_FINANCIALS, {
  GET_ASSET_HISTORY,
  GET_GECKO_HISTORY,
} from "../../helpers/queries/assets/getAssetFinancialDetails";
import { Accordion } from "react-bootstrap";
import IndicatorAccordion from "../../components/assets/Indicators/IndicatorAccordion";
import TimeButtons from "../../components/commons/TimeButtons";
import LoadingSpinner from "../../components/commons/animations/LoadingSpinner";
import AssetDetailsHeader from "../../components/assets/AssetDetails/AssetDetailsHeader";
import PriceScreener from "../../components/commons/screener";
import styled from "styled-components";
import PairDetailsRow from "../../components/assets/Finance/PairDetails/index";
import { MediaQueries } from "../../styles/MediaQueries";

const AssetDetailsPage = ({ deviceType }) => {
  const [assetFinancials, setAssetFinancials] = useState();
  const [timeQuery, setTimeQuery] = useState(14);

  const router = useRouter();
  let id = router.query.id;

  const [getFinancials, { data, loading, error, refetch }] =
    useLazyQuery(GET_ASSET_HISTORY);

  const availableTimes = [14, 30, 90, 180, 365];
  const isBtcOrEth = id === "btc" || id === "eth";

  useEffect(() => {
    getFinancials({
      variables: {
        symbol: id || "BTC",
        time: timeQuery,
      },
    });
  }, [timeQuery, id]);

  return (
    <AssetDetailsPageContainer>
      <PriceScreener />
      <div className={"container text-center"}>
        <h2>{"$" + id?.toUpperCase()}</h2>
        {loading && (
          <div className={"container text-center"}>
            <LoadingSpinner />
          </div>
        )}
        {error && <div>Error {console.log({ error })}</div>}

        {id && (
          <PairRowContainer>
            <h6>Top Pairs by Volume (24 hours)</h6>
            <PairDetailsRow id={id} />
          </PairRowContainer>
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
            <StickyTimeBar>
              <h3>{timeQuery} Days</h3>
              <TimeButtons
                setTimeQuery={setTimeQuery}
                availTimes={availableTimes}
                refetch={refetch}
              />
            </StickyTimeBar>

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
    </AssetDetailsPageContainer>
  );
};

export async function getServerSideProps(context) {
  const UA = context.req.headers["user-agent"];
  const isMobile = Boolean(
    UA.match(
      /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
    )
  );

  return {
    props: {
      deviceType: isMobile ? "mobile" : "desktop",
    },
  };
}

const PairRowContainer = styled.div`
  margin-right: -0.5rem;
  margin-left: -0.5rem;
  min-width: 100%;
  text-align: center;
`;

const StickyTimeBar = styled.div`
  position: sticky;
  top: 20;
  text-align: center;
  padding: 1rem 0;
`;

const AssetDetailsPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 3rem;
`;

export default AssetDetailsPage;
