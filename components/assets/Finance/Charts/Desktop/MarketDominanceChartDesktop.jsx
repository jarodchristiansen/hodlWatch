// import { useMediaQuery } from "react-responsive";
// import { currencyFormat } from "../../helpers/formatters";
// import FinanceChartModal from "./FinanceChartModal";
import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MarketDominanceChartDesktop = ({ data }) => {
  const format = (num, decimals) =>
    num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className={"card mt-2 mx-3 text-center"}>
      <div className={"flex flex-row"}>
        <h1>Market Dominance</h1>
      </div>
      {data && (
        <LineChart data={data} height={500} width={500}>
          <CartesianGrid strokeDasharray="3 3" />

          <YAxis
            dataKey="market_dominance"
            domain={["auto", "auto"]}
            allowDataOverflow={true}
            // tick={{ fill: "white" }}
            width={0}
          />
          <XAxis dataKey="time" />

          <Tooltip formatter={(value) => format(value)} />
          <Legend />
          <Line
            type="linear"
            dataKey="market_dominance"
            stroke="#8884d8"
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      )}
    </div>
  );
};

export default MarketDominanceChartDesktop;
