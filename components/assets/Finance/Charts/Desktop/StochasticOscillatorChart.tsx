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

const StochasticOscillatorChart = ({ data }) => {
  const [stochasticData, setStochasticData] = useState([]);

  useEffect(() => {
    processStochastic(data);
  }, []);

  const processStochastic = (data) => {
    let closeData = [];
    let dateData = [];
    let highData = [];
    let lowData = [];

    for (let i of data) {
      closeData.push(i.close);
      dateData.push(i.time);
      highData.push(i.high);
      lowData.push(i.low);
    }

    const stochasticValues = calculateStochasticOscillator(closeData);

    const stochasticData = dateData.map((date, index) => ({
      close: closeData[index],
      stochastic: stochasticValues[index],
      time: date,
    }));

    setStochasticData(stochasticData);
  };

  function calculateStochasticOscillator(closingPrices, period = 14) {
    if (closingPrices.length < period) {
      throw new Error("Insufficient data for the specified period");
    }

    const stochasticValues = [];

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
  return (
    <ChartContainer>
      <div className={"label-row"}>
        <h5>Stochastic Oscillator</h5>
      </div>
      {stochasticData && (
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={stochasticData}>
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
              dataKey="stochastic"
              yAxisId="right-axis"
              orientation="right"
              width={0}
              allowDataOverflow={false}
            />

            <XAxis dataKey="time" tickFormatter={(value) => value} />

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
              dataKey="stochastic"
              stroke="#00BFBF"
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
