import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
// import FinanceChartModal from "./FinanceChartModal";
import React from "react";

const PercentChangeChartDesktop = ({ data }) => {
  return (
    <div className={"card mt-2 mx-3 text-center"}>
      <div className={"flex flex-row"}>
        <h1>Percent Change Chart</h1>
      </div>
      {data && (
        <LineChart data={data} height={500} width={500}>
          <CartesianGrid strokeDasharray="3 3" />

          <YAxis
            dataKey="percent_change"
            domain={["auto", "auto"]}
            allowDataOverflow={true}
            width={0}
          />
          <XAxis dataKey="time" />

          <Tooltip
          // formatter={(value) => currencyFormat(value)}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="percent_change"
            stroke="#8884d8"
            dot={false}
          />
        </LineChart>
      )}
    </div>
  );
};

export default PercentChangeChartDesktop;
