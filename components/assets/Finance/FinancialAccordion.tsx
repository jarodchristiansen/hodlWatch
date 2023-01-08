import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import MarketDominanceChartDesktop from "./Charts/Desktop/MarketDominanceChartDesktop";
import VolatilityChart from "./Charts/Desktop/VolatilityChartDesktop";
import VolumeChartDesktop from "./Charts/Desktop/VolumeChartDesktop";
import PercentChangeChartDesktop from "./Charts/Desktop/PercentChangeChartDesktop";
import FibonacciRetracementChartDesktop from "./Charts/Desktop/FibonacciRetracementChartDesktop";
import { FormatUnixTime } from "@/helpers/formatters/time";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import PriceBTCChartDesktop from "./Charts/Desktop/PriceBTCChartDesktop";
import EMAChartDesktop from "./Charts/Desktop/EmaChartDesktop";
import BollingerBandChart from "./Charts/Desktop/BollingerBandChartDesktop";
const vwap = require("vwap");

interface FinancailAccordionProps {
  financialData: FinancialDataType[];
  id: string;
}

interface FinancialDataType {
  close: number;
  conversionSymbol: string;
  conversionType: string;
  high: number;
  low: number;
  open: number;
  time: number;
  volumefrom: number;
  volumeto: number;
  __typename: string;
}

const FinancialAccordion = ({ financialData, id }: FinancailAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [processedFinancialData, setProcessedFinancialData] = useState<any>([]);
  const [chartsToDisplay, setChartsToDisplay] = useState<any>();

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
    let vwapData = [];

    for (let i of financialData) {
      if (i?.market_dominance) {
        market_dominance.push({
          market_dominance: i.market_dominance,
          time: FormatUnixTime(i.time),
        });
      }
      if (i?.volatility) {
        volatility.push({
          volatility: i.volatility,
          time: FormatUnixTime(i.time),
        });
      }
      if (i.volumeto && i.volumefrom) {
        volume.push({
          volumeTo: i.volumeto,
          volumeFrom: i.volumefrom,
          time: FormatUnixTime(i.time),
        });
      }
      if (i?.percent_change_24h) {
        percent_change.push({
          percent_change: i.percent_change_24h,
          time: FormatUnixTime(i.time),
        });
      }
      if (i?.close) {
        closes.push({
          close: i.close,
          time: FormatUnixTime(i.time),
        });
      }
      if (i?.price_btc) {
        price_btc.push({
          price_btc: i.price_btc,
          time: FormatUnixTime(i.time),
        });
      }
      if (i?.high) {
        highs.push(i.high);
      }
      if (i?.low) {
        lows.push(i.low);
      }
    }

    if (volume.length) {
      let vwapResults = [];

      for (let i = 0; i < volume.length; i++) {
        let slice = volume.slice(0, i);

        console.log({ slice });

        vwapResults.push({
          vwap: vwap(slice),
          time: volume[i].time,
        });
      }

      // volume.push({
      //   volumeTo: i.volumeto,
      //   volumeFrom: i.volumefrom,
      //   time: FormatUnixTime(i.time),
      // });
      console.log({ vwapResults });
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
      !!filteredData?.closes?.length && (
        <FibonacciRetracementChartDesktop
          data={filteredData?.closes}
          key="fib-chart"
        />
      ),

      // !!filteredData?.closes?.length && (
      //   <BollingerBandChart data={filteredData?.closes} key="bband-chart" />
      // ),

      !!filteredData?.closes?.length && (
        <EMAChartDesktop data={filteredData?.closes} key="ema-chart" />
      ),

      !!filteredData?.market_dominance?.length && (
        <MarketDominanceChartDesktop
          data={filteredData?.market_dominance}
          key="market-dom-chart"
        />
      ),
      !!filteredData?.volatility?.length && (
        <VolatilityChart
          data={filteredData?.volatility}
          key="volatility-chart"
        />
      ),
      !!filteredData?.volume?.length && (
        <VolumeChartDesktop data={filteredData?.volume} key="volume-chart" />
      ),
      !!filteredData?.percent_change?.length && (
        <PercentChangeChartDesktop
          data={filteredData?.percent_change}
          key="percent-change-chart"
        />
      ),
      !!filteredData?.price_btc?.length && id !== "btc" && (
        <PriceBTCChartDesktop
          data={filteredData?.price_btc}
          key="price-btc-chart"
        />
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
          onClick={() => scrollPrev()}
        />

        <FaArrowRight
          size={24}
          color={"black"}
          className={"pointer-link ms-4"}
          onClick={() => scrollNext()}
        />
      </div>
    );
  };

  return (
    <div className={"text-center w-100"}>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Financial Charts</Accordion.Header>
        <Accordion.Body>
          <ScrollMenu
            Footer={renderArrows}
            transitionDuration={2500}
            transitionBehavior={"smooth"}
          >
            {chartsToDisplay?.map((chart, idx) => (
              <div className={"px-1 py-2"} key={idx}>
                {chart}
              </div>
            ))}
          </ScrollMenu>
        </Accordion.Body>
      </Accordion.Item>
    </div>
  );
};

export default FinancialAccordion;
