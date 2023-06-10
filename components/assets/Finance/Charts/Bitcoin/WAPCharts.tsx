import { currencyFormat } from "@/helpers/formatters/currency";
import { FormatUnixTime } from "@/helpers/formatters/time";
// import FinanceChartModal from "./FinanceChartModal";
import React from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";

import FinanceChartModal from "../FinanceChartModal";

/**
 *
 * @param {data} data: VWAP, TWAP, price
 * @returns WAPChart BTC only, shows the VWAP/TWAP for asset compared to price
 */
const WAPChart = ({ data }) => {
  const modalText = {
    modalHeader: "VWAP/TWAP",
    modalBodyText: () => (
      <div>
        <p>
          VWAP = Cumulative Typical Price x Volume/Cumulative Volume. The
          volume-weighted average price (VWAP) is a technical analysis indicator
          used on financial asset charts. It&apos;s a trading benchmark that
          represents the average price a security has traded at throughout the
          provided time range, based on both volume and price. VWAP is important
          because it provides traders with pricing insight into both the trend
          and value of a security.
        </p>

        <br />

        <p>
          TWAP stands for “time-weighted average price”. It&apos;s a pricing
          algorithm used to calculate the average price of an asset over a set
          period.
        </p>
      </div>
    ),
  };

  return (
    <ChartContainer>
      <div className={"flex flex-row"}>
        <h1>
          (V/T)WAP Chart
          <span className={"ms-3"}>
            <FinanceChartModal text={modalText} />
          </span>
        </h1>
      </div>

      {data && (
        <ResponsiveContainer width="100%" height={500}>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis dataKey="close" yAxisId="left-axis" />
            <YAxis dataKey="close" yAxisId="right-axis" orientation="right" />
            <XAxis
              dataKey="time"
              tickFormatter={(val) => FormatUnixTime(val)}
            />
            <Tooltip
              labelFormatter={(val) => FormatUnixTime(val)}
              formatter={(value) => currencyFormat(value)}
            />
            <defs>
              <linearGradient id="vwap" x1="0" y1="0" x2="0" y2="1">
                <stop offset="70%" stopColor="#8884d8" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="vwap"
              yAxisId="left-axis"
              stroke="#8884d8"
              dot={false}
              strokeWidth={2}
              name="vwap"
              fillOpacity={1}
              fill="url(#vwap)"
            />
            <defs>
              <linearGradient id="twap" x1="0" y1="0" x2="0" y2="1">
                <stop offset="70%" stopColor="#00ff00" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="twap"
              yAxisId="right-axis"
              stroke="#00ff00"
              dot={false}
              strokeWidth={2}
              name="twap"
              fillOpacity={1}
              fill="url(#twap)"
            />

            <defs>
              <linearGradient id="close" x1="0" y1="0" x2="0" y2="1">
                <stop offset="70%" stopColor="black" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="close"
              yAxisId="right-axis"
              stroke="black"
              dot={false}
              strokeWidth={2}
              name="close"
              fillOpacity={1}
              fill="url(#close)"
            />
          </ComposedChart>
        </ResponsiveContainer>
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

export default WAPChart;
