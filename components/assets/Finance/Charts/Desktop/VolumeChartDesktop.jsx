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
import styled from "styled-components";

const VolumeChartDesktop = ({ data }) => {
  return (
    <ChartContainer>
      <div className={"flex flex-row"}>
        <h1>
          Volume Chart
          {/*<span className={"ms-3"}>*/}
          {/*  <FinanceChartModal />*/}
          {/*</span>*/}
        </h1>
      </div>
      {data && (
        <LineChart data={data} height={500} width={500}>
          <CartesianGrid strokeDasharray="3 3" />

          <YAxis
            dataKey="volume"
            domain={["auto", "auto"]}
            allowDataOverflow={true}
            width={0}
          />
          <XAxis dataKey="time" />

          <Tooltip
          // formatter={(value) => currencyFormat(value)}
          />

          <Line
            type="monotone"
            dataKey="volume"
            stroke="#8884d8"
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      )}
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  padding: 1rem 1rem;
`;

export default VolumeChartDesktop;
