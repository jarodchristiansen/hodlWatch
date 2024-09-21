import { processFinancialHistory } from "@/helpers/financial";
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
import NuplChart from "./Charts/Desktop/NuplChart";
import OBVChart from "./Charts/Desktop/OBVChart";
import RsiChart from "./Charts/Desktop/RSIChart";
import StochasticOscillatorChart from "./Charts/Desktop/StochasticOscillatorChart";
import VolumeChartDesktop from "./Charts/Desktop/VolumeChartDesktop";

const FinancialChartGrid = ({ financialData, id, time }) => {
  const [processedFinancialData, setProcessedFinancialData] = useState([]);
  const [selectedCharts, setSelectedCharts] = useState({
    fibonacci: true,
    ema: true,
    bollinger: true,
    macd: true,
    sharpe: false,
    volume: false,
    rsi: false,
    atr: false,
    obv: false,
    adx: false,
    nupl: false,
    stochastic: false,
  });

  useEffect(() => {
    if (financialData) {
      processFinancialData(financialData);
    }
  }, [financialData]);

  const processFinancialData = (financialData) => {
    const filteredData = processFinancialHistory(financialData);
    setProcessedFinancialData(filteredData);
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedCharts((prev) => ({ ...prev, [name]: checked }));
  };

  const renderCharts = () => {
    const chartData = [];

    if (selectedCharts.fibonacci && processedFinancialData?.closes?.length) {
      chartData.push(
        <FibonacciRetracementChartDesktop
          data={processedFinancialData?.closes}
          key="fib-chart"
        />
      );
    }
    if (selectedCharts.ema && processedFinancialData?.closes?.length) {
      chartData.push(
        <EMAChartDesktop
          data={processedFinancialData?.closes}
          key="ema-chart"
        />
      );
    }
    if (selectedCharts.bollinger && processedFinancialData?.closes?.length) {
      chartData.push(
        <BollingerBandChart
          data={processedFinancialData?.closes}
          key="bband-chart"
        />
      );
    }
    if (selectedCharts.macd && processedFinancialData?.closes?.length) {
      chartData.push(
        <MACDChart data={processedFinancialData?.closes} key="macd-chart" />
      );
    }
    if (selectedCharts.sharpe && processedFinancialData?.closes?.length) {
      chartData.push(
        <SharpeRatioChart
          data={processedFinancialData?.closes}
          key="sharpe-chart"
        />
      );
    }
    if (selectedCharts.volume && processedFinancialData?.volume?.length) {
      chartData.push(
        <VolumeChartDesktop
          data={processedFinancialData?.volume}
          key="volume-chart"
        />
      );
    }
    if (selectedCharts.rsi && processedFinancialData?.closes?.length) {
      chartData.push(
        <RsiChart data={processedFinancialData?.closes} key="rsi-chart" />
      );
    }
    if (selectedCharts.atr && processedFinancialData?.closes?.length) {
      chartData.push(<ATRChart data={financialData} key="atr-chart" />);
    }
    if (selectedCharts.obv && processedFinancialData?.closes?.length) {
      chartData.push(<OBVChart data={financialData} key="obv-chart" />);
    }
    if (selectedCharts.adx && processedFinancialData?.closes?.length) {
      chartData.push(<ADXChart data={financialData} key="adx-chart" />);
    }
    if (selectedCharts.nupl && processedFinancialData?.closes?.length) {
      chartData.push(<NuplChart data={financialData} key="nupl-chart" />);
    }
    if (selectedCharts.stochastic && processedFinancialData?.closes?.length) {
      chartData.push(
        <StochasticOscillatorChart
          data={processedFinancialData?.closes}
          key="stochastic-chart"
        />
      );
    }

    return chartData;
  };

  return (
    <div>
      <CheckboxContainer>
        <h3>Select Charts to Display:</h3>
        <div>
          <label>
            <input
              type="checkbox"
              name="fibonacci"
              checked={selectedCharts.fibonacci}
              onChange={handleCheckboxChange}
            />
            Fibonacci
          </label>
          <label>
            <input
              type="checkbox"
              name="ema"
              checked={selectedCharts.ema}
              onChange={handleCheckboxChange}
            />
            EMA
          </label>
          <label>
            <input
              type="checkbox"
              name="bollinger"
              checked={selectedCharts.bollinger}
              onChange={handleCheckboxChange}
            />
            Bollinger Band
          </label>
          <label>
            <input
              type="checkbox"
              name="macd"
              checked={selectedCharts.macd}
              onChange={handleCheckboxChange}
            />
            MACD
          </label>

          <label>
            <input
              type="checkbox"
              name="sharpe"
              checked={selectedCharts.sharpe}
              onChange={handleCheckboxChange}
            />
            Sharpe Ratio
          </label>

          <label>
            <input
              type="checkbox"
              name="volume"
              checked={selectedCharts.volume}
              onChange={handleCheckboxChange}
            />
            Volume
          </label>

          <label>
            <input
              type="checkbox"
              name="rsi"
              checked={selectedCharts.rsi}
              onChange={handleCheckboxChange}
            />
            RSI
          </label>

          <label>
            <input
              type="checkbox"
              name="obv"
              checked={selectedCharts.obv}
              onChange={handleCheckboxChange}
            />
            On-balance Volume
          </label>

          <label>
            <input
              type="checkbox"
              name="adx"
              checked={selectedCharts.adx}
              onChange={handleCheckboxChange}
            />
            Average Directional Index
          </label>

          <label>
            <input
              type="checkbox"
              name="nupl"
              checked={selectedCharts.nupl}
              onChange={handleCheckboxChange}
            />
            Net Unrealized Profit/Loss
          </label>

          <label>
            <input
              type="checkbox"
              name="stochastic"
              checked={selectedCharts.stochastic}
              onChange={handleCheckboxChange}
            />
            Stochastic Oscillator
          </label>
        </div>

        {/* Add more checkboxes as needed */}
      </CheckboxContainer>
      <GridContainer>
        {renderCharts().map((chart, idx) => (
          <ChartCard key={idx}>{chart}</ChartCard>
        ))}
      </GridContainer>
    </div>
  );
};

const CheckboxContainer = styled.div`
  padding: 20px;
  color: white;

  div {
    display: grid;
    padding-top: 24px;
    justify-content: center;

    gap: 10px; // Adjust as needed for spacing between checkboxes

    label {
      display: flex;
      align-items: center; // Center checkbox vertically
      cursor: pointer; // Change cursor on hover for better UX
    }

    input[type="checkbox"] {
      margin-right: 8px; // Space between checkbox and label

      /* Double-sized Checkboxes */
      -ms-transform: scale(1.5); /* IE */
      -moz-transform: scale(1.5); /* FF */
      -webkit-transform: scale(1.5); /* Safari and Chrome */
      -o-transform: scale(1.5); /* Opera */
      transform: scale(1.5);
      padding: 10px;
    }

    @media ${MediaQueries.MD} {
      grid-template-columns: repeat(auto-fit, minmax(300px, 3fr));
    }
  }
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: auto;
  grid-gap: 48px;
  width: 100%;
  padding: 24px 0;

  @media ${MediaQueries.MD} {
    padding: 24px 0;
    grid-template-columns: repeat(auto-fit, minmax(800px, 1fr));
  }
`;

const ChartCard = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  border: 1px solid white;
  border-radius: 10px;
  background-color: ${Colors.black};

  .label-row {
    color: white;
    padding: 24px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
`;

export default FinancialChartGrid;
