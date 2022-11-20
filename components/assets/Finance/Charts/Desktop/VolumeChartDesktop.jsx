import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
} from "recharts";
// import FinanceChartModal from "./FinanceChartModal";
import React from "react";
import styled from "styled-components";
import { currencyFormat } from "../../../../../helpers/formatters/currency";

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

          {/* <YAxis
            // dataKey="volumeTo"
            domain={["auto", "auto"]}
            allowDataOverflow={true}
            width={0}
          /> */}

          <YAxis
            dataKey="volumeTo"
            yAxisId="left-axis"
            // domain={["auto", "auto"]}
            // allowDataOverflow={true}
            // width={0}
          />

          <YAxis
            dataKey="volumeFrom"
            yAxisId="right-axis"
            orientation="right"
            // domain={["auto", "auto"]}
            // allowDataOverflow={true}
            // width={0}
          />

          <XAxis dataKey="time" />

          <Tooltip formatter={(value) => currencyFormat(value)} />

          <Line
            type="monotone"
            dataKey="volumeTo"
            yAxisId="left-axis"
            stroke="#8884d8"
            dot={false}
            strokeWidth={2}
            name="Volume to exchanges"
          />

          <Line
            type="monotone"
            dataKey="volumeFrom"
            yAxisId="right-axis"
            stroke="#00ff00"
            dot={false}
            strokeWidth={2}
            name="Volume from exchanges"
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
  background-color: white;
  box-shadow: 2px 4px 8px lightgray;
`;

export default VolumeChartDesktop;
