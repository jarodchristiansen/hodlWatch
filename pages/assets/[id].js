import React, { useEffect, useState } from "react";
import { useRouter, withRouter } from "next/router";
import FinancialAccordion from "../../components/assets/Finance/FinancialAccordion";
import { useQuery, useLazyQuery } from "@apollo/client";
import GET_ASSET_FINANCIALS, {
  GET_GECKO_HISTORY,
} from "../../helpers/queries/getAssetFinancialDetails";
import { Accordion } from "react-bootstrap";
import IndicatorAccordion from "../../components/assets/Indicators/IndicatorAccordion";
import TimeButtons from "../../components/commons/TimeButtons";
import LoadingSpinner from "../../components/commons/animations/LoadingSpinner";
import AssetDetailsHeader from "../../components/assets/AssetDetails/AssetDetailsHeader";
import PriceScreener from "../../components/commons/screener";

const AssetDetailsPage = ({ deviceType }) => {
  const [assetFinancials, setAssetFinancials] = useState();
  const [timeQuery, setTimeQuery] = useState(14);

  const router = useRouter();
  let id = router.query.id;

  const [getFinancials, { data, loading, error, refetch }] =
    useLazyQuery(GET_GECKO_HISTORY);

  const availableTimes = [14, 30, 90, 180, 365];

  useEffect(() => {
    getFinancials({
      variables: {
        symbol: id || "BTC",
        time: timeQuery,
      },
    });
  }, [timeQuery]);

  console.log({ data });

  return (
    <>
      <PriceScreener />
      <div className={"container"}>
        {loading && (
          <div className={"container text-center"}>
            <LoadingSpinner />
          </div>
        )}
        {error && <div>Error {console.log({ error })}</div>}
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
            <div className={"row flex-nowrap w-auto text-center"}>
              <TimeButtons
                setTimeQuery={setTimeQuery}
                availTimes={availableTimes}
                refetch={refetch}
              />
            </div>

            <Accordion defaultActiveKey="1">
              <FinancialAccordion
                financialData={
                  data?.getAssetFinancialDetails
                    ? data?.getAssetFinancialDetails
                    : []
                }
                id={id}
              />
              <IndicatorAccordion timeQuery={timeQuery} id={id} />
            </Accordion>
          </>
        )}
      </div>
    </>
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

export default AssetDetailsPage;
