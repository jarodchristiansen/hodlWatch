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

const ADXChart = ({ data }) => {
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

    for (let i = 0; i < dateData.length; i++) {
      const adx = calculateADX(
        highData.slice(0, i + 1),
        lowData.slice(0, i + 1),
        closeData.slice(0, i + 1),
        14
      );

      emas.push({
        close: closeData[i],
        adx,
        time: dateData[i],
      });
    }

    setEmaData(emas);
  };

  // ADX (Average Directional Index)
  function calculateADX(highPrices, lowPrices, closingPrices, period = 14) {
    // if (
    //   highPrices.length < period ||
    //   lowPrices.length < period ||
    //   closingPrices.length < period
    // ) {
    //   throw new Error("Insufficient data for the specified period");
    // }

    function calculateDX(highPrices, lowPrices, closingPrices, period) {
      const upMove = [];
      const downMove = [];
      const trueRanges = [];

      for (let i = 1; i < period; i++) {
        upMove.push(highPrices[i] - highPrices[i - 1]);
        downMove.push(lowPrices[i - 1] - lowPrices[i]);
        trueRanges.push(
          Math.max(
            highPrices[i] - lowPrices[i],
            Math.abs(highPrices[i] - lowPrices[i - 1]),
            Math.abs(lowPrices[i] - highPrices[i - 1])
          )
        );
      }

      const dxValues = [];

      for (let i = period; i < highPrices.length; i++) {
        upMove.push(highPrices[i] - highPrices[i - 1]);
        downMove.push(lowPrices[i - 1] - lowPrices[i]);
        trueRanges.push(
          Math.max(
            highPrices[i] - lowPrices[i],
            Math.abs(highPrices[i] - lowPrices[i - 1]),
            Math.abs(lowPrices[i] - highPrices[i - 1])
          )
        );

        const positiveDirectionalMovement = upMove.reduce(
          (sum, value) => (value > 0 ? sum + value : sum),
          0
        );
        const negativeDirectionalMovement = downMove.reduce(
          (sum, value) => (value > 0 ? sum + value : sum),
          0
        );
        const positiveDirectionalIndex =
          (positiveDirectionalMovement / period) * 100;
        const negativeDirectionalIndex =
          (negativeDirectionalMovement / period) * 100;

        const trueRangeSum = trueRanges.reduce((sum, value) => sum + value, 0);
        const trueRangeAverage = trueRangeSum / period;

        const positiveDirectionalIndexSmoothed =
          (positiveDirectionalIndex * (period - 1) + positiveDirectionalIndex) /
          period;
        const negativeDirectionalIndexSmoothed =
          (negativeDirectionalIndex * (period - 1) + negativeDirectionalIndex) /
          period;
        const directionalMovementIndex =
          Math.abs(
            (positiveDirectionalIndexSmoothed -
              negativeDirectionalIndexSmoothed) /
              (positiveDirectionalIndexSmoothed +
                negativeDirectionalIndexSmoothed)
          ) * 100;

        dxValues.push(directionalMovementIndex);

        upMove.shift();
        downMove.shift();
        trueRanges.shift();
      }

      return dxValues;
    }

    function calculateEMA(values, period) {
      const k = 2 / (period + 1);
      let ema = values[0];

      for (let i = 1; i < values.length; i++) {
        ema = values[i] * k + ema * (1 - k);
      }

      return ema;
    }

    const dxValues = calculateDX(highPrices, lowPrices, closingPrices, period);
    const adx = calculateEMA(dxValues, period);

    return adx;
  }

  return (
    <ChartContainer>
      <div className={"flex flex-row"}>
        <h5>ADX (Average Directional Index)</h5>
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
              dataKey="adx"
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
              dataKey="adx"
              stroke="#00BFBF"
              dot={false}
              strokeWidth={2}
              name="ADX"
              yAxisId="right-axis"
            />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  );
};

const ChartContainer = styled.div``;

export default ADXChart;
