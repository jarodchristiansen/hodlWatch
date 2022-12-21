import {
  Area,
  CartesianGrid,
  ComposedChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
// import FinanceChartModal from "./FinanceChartModal";
import React from "react";
import styled from "styled-components";

/**
 *
 * @param {data} data: ActiveAddress/NewAddress data
 * @returns ActiveAddressesChart shows the new/active addresses for asset BTC/ETH
 */
const ActiveAddressesChart = ({ data }) => {
  return (
    <ChartContainer>
      <div className={"flex flex-row"}>
        <h1>Active Addresses</h1>
      </div>

      {data && (
        <ComposedChart data={data} height={500} width={500}>
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis dataKey="active_addresses" yAxisId="left-axis" />
          <YAxis
            dataKey="new_addresses"
            yAxisId="right-axis"
            orientation="right"
          />
          <XAxis dataKey="time" />
          <Tooltip />
          <defs>
            <linearGradient id="active_addresses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="70%" stopColor="#8884d8" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="active_addresses"
            yAxisId="left-axis"
            stroke="#8884d8"
            dot={false}
            strokeWidth={2}
            name="Active Addresses"
            fillOpacity={1}
            fill="url(#active_addresses)"
          />
          <defs>
            <linearGradient id="new_addresses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="70%" stopColor="#00ff00" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="new_addresses"
            yAxisId="right-axis"
            stroke="#00ff00"
            dot={false}
            strokeWidth={2}
            name="new_addresses"
            fillOpacity={1}
            fill="url(#new_addresses)"
          />
        </ComposedChart>
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

export default ActiveAddressesChart;
