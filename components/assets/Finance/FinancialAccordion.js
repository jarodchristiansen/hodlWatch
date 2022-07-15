import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import MarketDominanceChartDesktop from "./Charts/Desktop/MarketDominanceChartDesktop";
import VolatilityChart from "./Charts/Desktop/VolatilityChartDesktop";
import VolumeChartDesktop from "./Charts/Desktop/VolumeChartDesktop";
import PercentChangeChartDesktop from "./Charts/Desktop/PercentChangeChartDesktop";
import FibonacciRetracementChartDesktop from "./Charts/Desktop/FibonacciRetracementChartDesktop";
import { FormatUnixTime } from "../../../helpers/formatters/time";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import PriceBTCChartDesktop from "./Charts/Desktop/PriceBTCChartDesktop";

const FinancialAccordion = ({ financialData, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [processedFinancialData, setProcessedFinancialData] = useState([]);
  const [chartsToDisplay, setChartsToDisplay] = useState();

  useEffect(() => {
    financialData && processFinancialData(financialData);
  }, []);

  const processFinancialData = (financialData) => {
    let market_dominance = [];
    let volatility = [];
    let volume = [];
    let highs = [];
    let lows = [];
    let closes = [];
    let percent_change = [];
    let price_btc = [];

    for (let i of financialData) {
      market_dominance.push({
        market_dominance: i.market_dominance,
        time: FormatUnixTime(i.time),
      });
      volatility.push({
        volatility: i.volatility,
        time: FormatUnixTime(i.time),
      });
      volume.push({
        volume: i.volume,
        time: FormatUnixTime(i.time),
      });
      percent_change.push({
        percent_change: i.percent_change_24h,
        time: FormatUnixTime(i.time),
      });
      closes.push({
        close: i.close,
        time: FormatUnixTime(i.time),
      });
      price_btc.push({
        price_btc: i.price_btc,
        time: FormatUnixTime(i.time),
      });
      highs.push(i.high);
      lows.push(i.low);
    }

    let filteredData = {
      market_dominance,
      volatility,
      volume,
      highs,
      lows,
      closes,
      percent_change,
      price_btc,
    };

    const chartData = [
      filteredData?.closes && (
        <FibonacciRetracementChartDesktop data={filteredData?.closes} />
      ),
      filteredData?.market_dominance && (
        <MarketDominanceChartDesktop data={filteredData?.market_dominance} />
      ),
      filteredData?.volatility && (
        <VolatilityChart data={filteredData?.volatility} />
      ),
      filteredData?.volume && (
        <VolumeChartDesktop data={filteredData?.volume} />
      ),
      filteredData?.percent_change && (
        <PercentChangeChartDesktop data={filteredData?.percent_change} />
      ),
      filteredData?.price_btc && id !== "btc" && (
        <PriceBTCChartDesktop data={filteredData?.price_btc} />
      ),
    ];

    setChartsToDisplay(chartData);
    setProcessedFinancialData(filteredData);
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
    <div className={"container text-center"}>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Financial Charts</Accordion.Header>
        <Accordion.Body>
          <ScrollMenu
            Footer={renderArrows}
            transitionDuration={2500}
            transitionBehavior={"smooth"}
          >
            {chartsToDisplay?.map((string) => (
              <div className={"px-2 py-3"}>{string}</div>
            ))}
          </ScrollMenu>
        </Accordion.Body>
      </Accordion.Item>
    </div>
  );
};

export default FinancialAccordion;
