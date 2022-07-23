import { Accordion } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import FibonacciRetracementChartDesktop from "../Finance/Charts/Desktop/FibonacciRetracementChartDesktop";
import MarketDominanceChartDesktop from "../Finance/Charts/Desktop/MarketDominanceChartDesktop";
import VolatilityChart from "../Finance/Charts/Desktop/VolatilityChartDesktop";
import VolumeChartDesktop from "../Finance/Charts/Desktop/VolumeChartDesktop";
import PercentChangeChartDesktop from "../Finance/Charts/Desktop/PercentChangeChartDesktop";
import PriceBTCChartDesktop from "../Finance/Charts/Desktop/PriceBTCChartDesktop";
import { useLazyQuery } from "@apollo/client";
import GET_ASSET_FINANCIALS from "../../../helpers/queries/getAssetFinancialDetails";
import GET_DIFFICULTY_RIBBONS from "../../../helpers/queries/GetDifficultyRibbons";
import DifficultyRibbonChartDesktop from "../Indicators/Charts/Desktop/DifficultyRibbonsChartDesktop";

const IndicatorAccordion = ({ timeQuery = 90, id }) => {
  const [ribbonData, setRibbonData] = useState();

  const [getRibbon, { data, loading, error, refetch }] = useLazyQuery(
    GET_DIFFICULTY_RIBBONS
  );

  const availableTimes = [730, 365, 180, 90, 30, 14];

  useEffect(() => {
    if (id === "btc") {
      getRibbon({
        variables: {
          symbol: id || "BTC",
          cut: timeQuery,
        },
      });
    }
  }, [timeQuery]);

  const chartData = [
    data?.getDifficultyRibbons[0] && (
      <DifficultyRibbonChartDesktop data={data?.getDifficultyRibbons} />
    ),
    // filteredData?.market_dominance && (
    //     <MarketDominanceChartDesktop data={filteredData?.market_dominance} />
    // ),
    // filteredData?.volatility && (
    //     <VolatilityChart data={filteredData?.volatility} />
    // ),
    // filteredData?.volume && (
    //     <VolumeChartDesktop data={filteredData?.volume} />
    // ),
    // filteredData?.percent_change && (
    //     <PercentChangeChartDesktop data={filteredData?.percent_change} />
    // ),
    // filteredData?.price_btc && id !== "btc" && (
    //     <PriceBTCChartDesktop data={filteredData?.price_btc} />
    // ),
  ];

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
            {chartData?.map((string) => (
              <div className={"px-2 py-3"}>{string}</div>
            ))}
          </ScrollMenu>
        </Accordion.Body>
      </Accordion.Item>
    </div>
  );
};

export default IndicatorAccordion;
