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
import Head from "next/head";

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
      <Head>
        <title>Asset Details - {id?.toUpperCase()}</title>
      </Head>
      <PriceScreener />

      {loading && (
        <div className={"container text-center"}>
          <LoadingSpinner />
        </div>
      )}

      {!loading && (
        <div className={"container text-center"}>
          <h2>{"$" + id?.toUpperCase()}</h2>

          {error && <div>Error {console.log({ error })}</div>}

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
    </AssetDetailsPageContainer>
  );
};

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
  top: 4.6rem;
  padding: 1rem 0;

  @media ${MediaQueries.MD} {
    top: 2.85rem;
  }
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

export default AssetDetailsPage;
