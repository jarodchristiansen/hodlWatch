import React, { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import FibonacciRetracementChartDesktop from "../Finance/Charts/Desktop/FibonacciRetracementChartDesktop";
// import MarketDominanceChartDesktop from "../Finance/Charts/Desktop/MarketDominanceChartDesktop";
// import VolatilityChart from "../Finance/Charts/Desktop/VolatilityChartDesktop";
// import VolumeChartDesktop from "../Finance/Charts/Desktop/VolumeChartDesktop";
// import PercentChangeChartDesktop from "../Finance/Charts/Desktop/PercentChangeChartDesktop";
// import PriceBTCChartDesktop from "../Finance/Charts/Desktop/PriceBTCChartDesktop";
// import GET_ASSET_FINANCIALS from "../../../helpers/queries/assets/getAssetFinancialDetails";
import { FormatUnixTime } from "@/helpers/formatters/time";
import ActiveAddressesChart from "../Finance/Charts/Desktop/ActiveAddressesChart";

const IndicatorAccordion = ({ timeQuery = 90, id, blockchainData }) => {
  const [ribbonData, setRibbonData] = useState();
  const [chartData, setChartData] = useState();

  // const [getRibbon, { data, loading, error, refetch }] = useLazyQuery(
  //   GET_DIFFICULTY_RIBBONS
  // );

  const availableTimes = [730, 365, 180, 90, 30, 14];

  useEffect(() => {
    formatData();

    // if (id === "btc") {
    //   getRibbon({
    //     variables: {
    //       symbol: id || "BTC",
    //       cut: timeQuery,
    //     },
    //   });
    // }
  }, [timeQuery]);

  const formatData = () => {
    if (!blockchainData) return [];

    let addresses = [];

    for (let i of blockchainData) {
      addresses.push({
        new_addresses: i.new_addresses,
        active_addresses: i.active_addresses,
        time: FormatUnixTime(i.time),
      });
    }

    const formatData = {
      addresses,
    };

    const charts = [
      formatData?.addresses && (
        <ActiveAddressesChart data={formatData.addresses} />
      ),
    ];

    setChartData(charts);
    return charts;
  };

  const renderArrows = () => {
    const { isFirstItemVisible, scrollPrev } =
      React.useContext(VisibilityContext);
    const { isLastItemVisible, scrollNext } =
      React.useContext(VisibilityContext);

    return (
      <div className={"container"}>
        <FaArrowLeft
          size={24}
          color={"black"}
          className={"pointer-link me-4"}
          disabled={isFirstItemVisible}
          onClick={() => scrollPrev()}
        />

        <FaArrowRight
          size={24}
          color={"black"}
          className={"pointer-link ms-4"}
          disabled={isLastItemVisible}
          onClick={() => scrollNext()}
        />
      </div>
    );
  };

  return (
    <div className={"text-center w-100 accordion-container"}>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Indicator Panel</Accordion.Header>
        <Accordion.Body>
          <ScrollMenu
            Footer={renderArrows}
            transitionDuration={2500}
            transitionBehavior={"smooth"}
          >
            {chartData?.map((string, idx) => (
              <div className={"px-2 py-3"} key={idx}>
                {string}
              </div>
            ))}
          </ScrollMenu>
        </Accordion.Body>
      </Accordion.Item>
    </div>
  );
};

export default IndicatorAccordion;
