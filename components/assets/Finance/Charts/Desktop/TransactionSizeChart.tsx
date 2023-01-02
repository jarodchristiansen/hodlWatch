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
 * @returns TransactionSizeChart shows the new/active addresses for asset BTC/ETH
 */
const TransactionSizeChart = ({ data }) => {
  return (
    <ChartContainer>
      <div className={"flex flex-row"}>
        <h1>Transaction Counts</h1>
      </div>

      {data && (
        <ComposedChart data={data} height={500} width={500}>
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis dataKey="transaction_count" yAxisId="left-axis" />
          <YAxis
            dataKey="large_transaction_count"
            yAxisId="right-axis"
            orientation="right"
          />
          <XAxis dataKey="time" />
          <Tooltip />
          <defs>
            <linearGradient id="transaction_count" x1="0" y1="0" x2="0" y2="1">
              <stop offset="70%" stopColor="#8884d8" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="transaction_count"
            yAxisId="left-axis"
            stroke="#8884d8"
            dot={false}
            strokeWidth={2}
            name="Total Transaction Count"
            fillOpacity={1}
            fill="url(#transaction_count)"
          />
          <defs>
            <linearGradient
              id="large_transaction_count"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="70%" stopColor="#00ff00" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="large_transaction_count"
            yAxisId="right-axis"
            stroke="#00ff00"
            dot={false}
            strokeWidth={2}
            name="Large Transaction Count"
            fillOpacity={1}
            fill="url(#large_transaction_count)"
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

export default TransactionSizeChart;
