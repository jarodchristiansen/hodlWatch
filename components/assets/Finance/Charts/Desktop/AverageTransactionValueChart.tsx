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
 * @param {data} data: AverageTransactionValueChart data
 * @returns AverageTransactionValueChart shows the new/active addresses for asset BTC/ETH
 */
const AverageTransactionValueChart = ({ data }) => {
  return (
    <ChartContainer>
      <div className={"flex flex-row"}>
        <h1>Average Transaction Value</h1>
      </div>

      {data && (
        <ComposedChart data={data} height={500} width={500}>
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis dataKey="average_transaction_value" yAxisId="left-axis" />
          {/* <YAxis
              dataKey="new_addresses"
              yAxisId="right-axis"
              orientation="right"
            /> */}
          <XAxis dataKey="time" />
          <Tooltip />
          <defs>
            <linearGradient
              id="average_transaction_value"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="70%" stopColor="#8884d8" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="average_transaction_value"
            yAxisId="left-axis"
            stroke="#8884d8"
            dot={false}
            strokeWidth={2}
            name={`Average Transaction Value ${data[0]?.symbol}`}
            fillOpacity={1}
            fill="url(#average_transaction_value)"
          />
          {/* <defs>
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
              /> */}
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

export default AverageTransactionValueChart;
