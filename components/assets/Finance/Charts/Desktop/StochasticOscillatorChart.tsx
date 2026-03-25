import { ChartColors, ChartDimensions } from "@/styles/variables";
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

function calculateStochasticOscSeries(closingPrices: number[], period = 14) {
  if (closingPrices.length < period) {
    throw new Error("Insufficient data for the specified period");
  }

  const stochasticValues: number[] = [];

  for (let i = period - 1; i < closingPrices.length; i++) {
    const highestHigh = Math.max(
      ...closingPrices.slice(i - period + 1, i + 1)
    );
    const lowestLow = Math.min(...closingPrices.slice(i - period + 1, i + 1));

    const currentClose = closingPrices[i];

    const percentK =
      ((currentClose - lowestLow) / (highestHigh - lowestLow)) * 100;

    stochasticValues.push(percentK);
  }

  return stochasticValues;
}

const StochasticOscillatorChart = ({ data }) => {
  const [stochasticData, setStochasticData] = useState([]);

  useEffect(() => {
    if (!data?.length) return;

    const period = 14;
    const closeData: number[] = [];
    const dateData: string[] = [];

    for (const row of data) {
      closeData.push(row.close);
      dateData.push(row.time);
    }

    const stochasticValues = calculateStochasticOscSeries(closeData, period);
    const paddedStochastic = [
      ...Array(Math.max(0, period - 1)).fill(null),
      ...stochasticValues,
    ];

    const rowsOut = dateData.map((date, index) => ({
      close: closeData[index],
      stochastic: paddedStochastic[index],
      time: date,
    }));

    setStochasticData(rowsOut);
  }, [data]);

  return (
    <ChartContainer>
      <div className={"label-row"} />
      {stochasticData && (
        <ResponsiveContainer width="100%" height={ChartDimensions.height}>
          <ComposedChart data={stochasticData}>
            <CartesianGrid strokeDasharray="3 3" />

            <YAxis
              dataKey="close"
              domain={["auto", "auto"]}
              allowDataOverflow={true}
              yAxisId="left-axis"
              orientation="left"
              width={0}
            />

            <YAxis
              dataKey="stochastic"
              yAxisId="right-axis"
              orientation="right"
              width={0}
              allowDataOverflow={false}
            />

            <XAxis dataKey="time" tickFormatter={(value) => value} />

            <Tooltip formatter={(value) => value} />

            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="70%" stopColor={ChartColors.seriesMuted} stopOpacity={0.1} />
                <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="close"
              stroke={ChartColors.seriesMuted}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorUv)"
              yAxisId="left-axis"
              name="Closing Price"
            />

            <Line
              type="monotone"
              dataKey="stochastic"
              stroke={ChartColors.seriesCool}
              dot={false}
              strokeWidth={2}
              name="Stochastic Oscillator"
              yAxisId="right-axis"
            />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  );
};

export default StochasticOscillatorChart;
