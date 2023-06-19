// import FinanceChartModal from "./FinanceChartModal";
import { FormatUnixTime } from "@/helpers/formatters/time";
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
import styled from "styled-components";

const ATRChart = ({ data }) => {
  const [emaData, setEmaData] = useState([]);

  useEffect(() => {
    processEmas(data);
  }, []);

  const processEmas = (data) => {
    let closeData = [];
    let dateData = [];
    let highData = [];
    let lowData = [];

    let time = data.length;

    for (let i of data) {
      closeData.push(i.close);
      dateData.push(i.time);
      highData.push(i.high);
      lowData.push(i.low);
    }

    let emas = [];

    let atr = calculateATR(highData, lowData, closeData);

    for (let i = 0; i < dateData.length; i++) {
      emas.push({
        close: closeData[i],
        atr: atr[i],
        time: dateData[i],
      });
    }

    setEmaData(emas);
  };

  // ATR (Average True Range)
  function calculateATR(highPrices, lowPrices, closingPrices, period = 14) {
    // if (
    //   highPrices.length < period ||
    //   lowPrices.length < period ||
    //   closingPrices.length < period
    // ) {
    //   throw new Error("Insufficient data for the specified period");
    // }

    const trueRanges = [];
    for (let i = 1; i < period; i++) {
      const trueRange = Math.max(
        highPrices[i] - lowPrices[i],
        Math.abs(highPrices[i] - closingPrices[i - 1]),
        Math.abs(lowPrices[i] - closingPrices[i - 1])
      );
      trueRanges.push(trueRange);
    }

    const atrValues = [];
    let atrSum = trueRanges.reduce((sum, trueRange) => sum + trueRange, 0);

    for (let i = period; i < highPrices.length; i++) {
      const trueRange = Math.max(
        highPrices[i] - lowPrices[i],
        Math.abs(highPrices[i] - closingPrices[i - 1]),
        Math.abs(lowPrices[i] - closingPrices[i - 1])
      );
      trueRanges.push(trueRange);
      atrSum += trueRange;
      atrSum -= trueRanges.shift();
      const atr = atrSum / period;
      atrValues.push(atr);
    }

    return atrValues;
  }

  return (
    <ChartContainer>
      <div className={"flex flex-row"}>
        <h5>ATR (Average True Range)</h5>
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
              dataKey="atr"
              yAxisId="right-axis"
              orientation="right"
              width={0}
            />

            <XAxis
              dataKey="time"
              tickFormatter={(value) => FormatUnixTime(value)}
            />

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
              dataKey="atr"
              stroke="#00BFBF"
              dot={false}
              strokeWidth={2}
              name="ATR"
              yAxisId="right-axis"
            />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  );
};

const ChartContainer = styled.div``;

export default ATRChart;
