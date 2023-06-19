import { FormatUnixTime } from "@/helpers/formatters/time";
import { Colors, MediaQueries } from "@/styles/variables";
import { useEffect, useState } from "react";
import styled from "styled-components";

import SharpeRatioChart from "./Charts/Bitcoin/SharpeRatioChart";
import ADXChart from "./Charts/Desktop/ADXChart";
import ATRChart from "./Charts/Desktop/ATRChart";
import BollingerBandChart from "./Charts/Desktop/BollingerBandChartDesktop";
import EMAChartDesktop from "./Charts/Desktop/EmaChartDesktop";
import FibonacciRetracementChartDesktop from "./Charts/Desktop/FibonacciRetracementChartDesktop";
import MACDChart from "./Charts/Desktop/MACDChart";
import OBVChart from "./Charts/Desktop/OBVChart";
import RsiChart from "./Charts/Desktop/RSIChart";
import StochasticOscillatorChart from "./Charts/Desktop/StochasticOscillatorChart";
import VolumeChartDesktop from "./Charts/Desktop/VolumeChartDesktop";

interface FinancailAccordionProps {
  financialData: FinancialDataType[];
  id: string;
  time?: number;
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

const FinancialChartGrid = ({
  financialData,
  id,
  time,
}: FinancailAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [processedFinancialData, setProcessedFinancialData] = useState<any>([]);
  const [chartsToDisplay, setChartsToDisplay] = useState<any>();

  useEffect(() => {
    financialData && processFinancialData(financialData);
  }, [financialData]);

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
      !!filteredData?.closes?.length && (
        <EMAChartDesktop data={filteredData?.closes} key="ema-chart" />
      ),
      !!filteredData?.closes?.length && (
        <SharpeRatioChart data={filteredData?.closes} key="sharpe-chart" />
      ),

      !!filteredData?.volume?.length && (
        <VolumeChartDesktop data={filteredData?.volume} key="volume-chart" />
      ),
      !!filteredData?.closes?.length && (
        <BollingerBandChart data={filteredData?.closes} key="bband-chart" />
      ),
      !!filteredData?.closes?.length && (
        <RsiChart data={filteredData?.closes} key="rsi-chart" />
      ),
      !!filteredData?.closes?.length && (
        <MACDChart data={filteredData?.closes} key="macd-chart" />
      ),
      !!filteredData?.closes?.length && (
        <ATRChart data={financialData} key="atr-chart" />
      ),
      !!filteredData?.closes?.length && (
        <OBVChart data={financialData} key="obv-chart" />
      ),
      !!filteredData?.closes?.length && (
        <ADXChart data={financialData} key="adx-chart" />
      ),

      !!filteredData?.closes?.length && (
        <StochasticOscillatorChart
          data={filteredData?.closes}
          key="stochastic-chart"
        />
      ),
      // !!filteredData?.market_dominance?.length && (
      //   <MarketDominanceChartDesktop
      //     data={filteredData?.market_dominance}
      //     key="market-dom-chart"
      //   />
      // ),
      // !!filteredData?.volatility?.length && (
      //   <VolatilityChart
      //     data={filteredData?.volatility}
      //     key="volatility-chart"
      //   />
      // ),

      // !!filteredData?.percent_change?.length && (
      //   <PercentChangeChartDesktop
      //     data={filteredData?.percent_change}
      //     key="percent-change-chart"
      //   />
      // ),
      // !!filteredData?.price_btc?.length && id !== "btc" && (
      //   <PriceBTCChartDesktop
      //     data={filteredData?.price_btc}
      //     key="price-btc-chart"
      //   />
      // ),
      ,
    ];

    setChartsToDisplay(chartData);
    setProcessedFinancialData(filteredData);
  };

  return (
    <GridContainer>
      {chartsToDisplay?.map((chart, idx) => (
        <ChartCard key={idx}>{chart}</ChartCard>
      ))}
    </GridContainer>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  /* grid-template-rows: 1fr 1fr 1fr; */
  grid-template-rows: auto;
  grid-gap: 24px;
  width: 100%;
  padding: 24px 0;

  @media ${MediaQueries.MD} {
    padding: 24px;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
`;

const ChartCard = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  border: 1px solid black;
  border-radius: 10px;
  padding: 1rem 1rem;
  background-color: ${Colors.lightGray};
`;

export default FinancialChartGrid;
