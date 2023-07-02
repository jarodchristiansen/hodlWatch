import ToggleSwitch from "@/components/commons/switchers/toggle-switch";
// import FinanceChartModal from "./FinanceChartModal";
import { useEffect, useState } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import ChartContainer from "./ChartContainer";

const MACDChart = ({ data }) => {
  const [emaData, setEmaData] = useState([]);
  const [showLatest14Days, setShowLatest14Days] = useState(false);

  useEffect(() => {
    processEmas(data);
  }, [showLatest14Days]);

  const handleCheckboxChange = () => {
    setShowLatest14Days(!showLatest14Days);
  };

  const processEmas = (data) => {
    let closeData = [];
    let dateData = [];

    if (showLatest14Days) {
      data = data.slice(-30);
    }

    let time = data.length;

    for (let i of data) {
      closeData.push(i.close);
      dateData.push(i.time);
    }

    let emas = [];

    const { macdLine, signalLine, histogram } = calculateMACD(
      closeData.slice(0, time),
      showLatest14Days ? 3 : 12,
      showLatest14Days ? 4 : 26,
      showLatest14Days ? 2 : 9
    );

    for (let i = 0; i < dateData.length; i++) {
      emas.push({
        close: closeData[i],
        macdLine: macdLine[i],
        signalLine: signalLine[i],
        histogram: histogram[i],
        time: dateData[i],
      });
    }

    setEmaData(emas);
  };

  // MACD (Moving Average Convergence Divergence)
  function calculateMACD(
    closingPrices,
    shortPeriod = 12,
    longPeriod = 26,
    signalPeriod = 9
  ) {
    function calculateEMA(values, period) {
      const k = 2 / (period + 1);
      let ema = values[0];

      for (let i = 1; i < values.length; i++) {
        ema = values[i] * k + ema * (1 - k);
      }

      return ema;
    }

    const shortEMAs = [];
    const longEMAs = [];
    const macdLines = [];
    const signalLines = [];
    const histograms = [];

    for (let i = longPeriod - 1; i < closingPrices.length; i++) {
      const shortEMA = calculateEMA(
        closingPrices.slice(i - shortPeriod + 1, i + 1),
        shortPeriod
      );
      const longEMA = calculateEMA(
        closingPrices.slice(i - longPeriod + 1, i + 1),
        longPeriod
      );

      shortEMAs.push(shortEMA);
      longEMAs.push(longEMA);
      macdLines.push(shortEMA - longEMA);
    }

    for (let i = signalPeriod - 1; i < macdLines.length; i++) {
      const signalLine = calculateEMA(
        macdLines.slice(i - signalPeriod + 1, i + 1),
        signalPeriod
      );

      signalLines.push(signalLine);
      histograms.push(macdLines[i] - signalLine);
    }

    return {
      macdLine: macdLines,
      signalLine: signalLines,
      histogram: histograms,
    };
  }
  return (
    <ChartContainer>
      <div className={"label-row"}>
        <h5>MACD (Moving Average Convergence/Divergence)</h5>

        <ToggleSwitch
          label={"30 days"}
          label2={"1 year"}
          toggleState={showLatest14Days}
          setToggleState={handleCheckboxChange}
        />
      </div>
      {emaData && (
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={emaData}>
            <CartesianGrid strokeDasharray="3 3" />

            <YAxis
              dataKey="close"
              domain={["auto", "auto"]}
              allowDataOverflow={true}
              yAxisId="left-axis"
              orientation="left"
              // tick={{ fill: "white" }}
              width={0}
              // formatter={(value) => currencyFormat(value)}
            />

            <YAxis
              dataKey="macdLine"
              yAxisId="right-axis"
              orientation="right"
              width={0}
            />

            <XAxis dataKey="time" />

            <Tooltip formatter={(value) => value} />
            {/* <Legend /> */}

            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="70%" stopColor="#806cfe" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="close"
              stroke="#806cfe"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorUv)"
              yAxisId="left-axis"
              name="Closing Price"
            />

            <Line
              type="monotone"
              dataKey="macdLine"
              stroke="#00BFBF"
              dot={false}
              strokeWidth={2}
              name="MACD Line"
              yAxisId="right-axis"
            />

            <Line
              type="monotone"
              dataKey="signalLine"
              stroke="red"
              dot={false}
              strokeWidth={2}
              name="Signal Line"
              yAxisId="right-axis"
            />

            <Line
              type="monotone"
              dataKey="histogram"
              stroke="black"
              dot={false}
              strokeWidth={2}
              name="Histogram"
              yAxisId="right-axis"
            />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  );
};

export default MACDChart;
