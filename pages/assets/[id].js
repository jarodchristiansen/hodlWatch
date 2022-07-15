import React, { useEffect, useState } from "react";
import { useRouter, withRouter } from "next/router";
import FinancialAccordion from "../../components/assets/Finance/FinancialAccordion";
import { useQuery, useLazyQuery } from "@apollo/client";
import GET_ASSET_FINANCIALS from "../../helpers/queries/getAssetFinancialDetails";
import { Accordion } from "react-bootstrap";
import IndicatorAccordion from "../../components/assets/Indicators/IndicatorAccordion";
import TimeButtons from "../../components/commons/TimeButtons";

const AssetDetailsPage = ({ deviceType }) => {
  const [assetFinancials, setAssetFinancials] = useState();
  const [timeQuery, setTimeQuery] = useState(365);

  const router = useRouter();
  let id = router.query.id;

  const [getFinancials, { data, loading, error, refetch }] =
    useLazyQuery(GET_ASSET_FINANCIALS);

  const availableTimes = [730, 365, 180, 90, 30, 14];

  useEffect(() => {
    getFinancials({
      variables: {
        symbol: id || "BTC",
        time: timeQuery,
      },
    });
  }, [timeQuery]);

  return (
    <div className={"container"}>
      Asset Details Page
      {loading && <div>Loading...</div>}
      {error && <div>Error {console.log({ error })}</div>}
      {data && (
        <>
          <h3>{id}</h3>
          <h2>{timeQuery} - Days</h2>
          <TimeButtons
            setTimeQuery={setTimeQuery}
            availTimes={availableTimes}
            refetch={refetch}
          />

          <Accordion defaultActiveKey="1">
            <FinancialAccordion
              financialData={data?.getAssetFinancialDetails[0]?.timeSeries}
              id={id}
            />
            <IndicatorAccordion />
          </Accordion>
        </>
      )}
    </div>
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
