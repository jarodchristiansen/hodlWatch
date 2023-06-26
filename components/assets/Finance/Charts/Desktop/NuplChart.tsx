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

import ChartContainer from "./ChartContainer";

const NuplChart = ({ data }) => {
  const [nuplData, setNuplData] = useState([]);

  useEffect(() => {
    calculateNUPL(data);
  }, []);

  const calculateNUPL = (data) => {
    let closeData = [];
    let dateData = [];

    for (let i of data) {
      closeData.push(i.close);
      dateData.push(i.time);
    }

    let nuplScores = [];

    for (let i = 0; i < dateData.length; i++) {
      const nupl = calculateNUPLScore(closeData.slice(0, i + 1));
      nuplScores.push({
        close: closeData[i],
        nupl,
        time: dateData[i],
      });
    }

    setNuplData(nuplScores);
  };

  const calculateNUPLScore = (closePrices) => {
    let unrealizedProfit = 0;
    let unrealizedLoss = 0;

    for (let i = 0; i < closePrices.length; i++) {
      const priceDiff = closePrices[i] - closePrices[0];

      if (priceDiff > 0) {
        unrealizedProfit += priceDiff;
      } else {
        unrealizedLoss -= priceDiff;
      }
    }

    const nupl = unrealizedProfit / (unrealizedProfit + unrealizedLoss);
    return nupl;
  };

  return (
    <ChartContainer>
      <div className={"label-row"}>
        <h5>NUPL (Net Unrealized Profit and Loss)</h5>
      </div>
      {nuplData && (
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={nuplData}>
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
              dataKey="nupl"
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
              dataKey="nupl"
              stroke="#00BFBF"
              dot={false}
              strokeWidth={2}
              name="NUPL Score"
              yAxisId="right-axis"
            />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  );
};

export default NuplChart;
