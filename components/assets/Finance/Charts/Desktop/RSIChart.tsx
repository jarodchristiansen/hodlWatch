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

const RsiChart = ({ data }) => {
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

    for (let i = 0; i < dateData.length; i++) {
      const rsi = calculateRSI(
        closeData.slice(0, i + 1),
        showLatest14Days ? 3 : 14
      );
      emas.push({
        close: closeData[i],
        rsi: rsi,
        time: dateData[i],
      });
    }

    setEmaData(emas);
  };

  // RSI (Relative Strength Index)
  function calculateRSI(closingPrices, period = 14) {
    // if (closingPrices?.length < period) {
    //   throw new Error("Insufficient data for the specified period");
    // }

    let gains = 0;
    let losses = 0;

    for (let i = 1; i < period; i++) {
      const priceDiff = closingPrices[i] - closingPrices[i - 1];
      if (priceDiff > 0) {
        gains += priceDiff;
      } else {
        losses -= priceDiff;
      }
    }

    let avgGain = gains / period;
    let avgLoss = losses / period;

    for (let i = period; i < closingPrices.length; i++) {
      const priceDiff = closingPrices[i] - closingPrices[i - 1];
      if (priceDiff > 0) {
        avgGain = (avgGain * (period - 1) + priceDiff) / period;
        avgLoss = (avgLoss * (period - 1)) / period;
      } else {
        avgGain = (avgGain * (period - 1)) / period;
        avgLoss = (avgLoss * (period - 1) - priceDiff) / period;
      }
    }

    const relativeStrength = avgGain / avgLoss;
    const rsi = 100 - 100 / (1 + relativeStrength);

    return rsi;
  }

  return (
    <ChartContainer>
      <div className={"label-row"}>
        <h5>RSI (Relative Strength Index)</h5>

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
              dataKey="rsi"
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
              dataKey="rsi"
              stroke="#00BFBF"
              dot={false}
              strokeWidth={2}
              name="RSI"
              yAxisId="right-axis"
            />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  );
};

export default RsiChart;
