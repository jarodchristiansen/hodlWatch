import {
  Area,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
// import FinanceChartModal from "./FinanceChartModal";
import React from "react";
import styled from "styled-components";
import { FormatUnixTime } from "@/helpers/formatters/time";
import { currencyFormat } from "@/helpers/formatters/currency";
// import FinanceChartModal from "../FinanceChartModal";
import FinanceChartModal from "../FinanceChartModal";

/**
 *
 * @param {data} data: rolling_sharpe, close, time
 * @returns SharpeRatioChart shows the rolling sharpe ratio for bitcoin long-term
 */
const SharpeRatioChart = ({ data }) => {
  const modalText = {
    modalHeader: "Sharpe Ratio",
    modalBodyText: () => (
      <div>
        <h5>What is a Sharpe Ratio?</h5>
        <p>
          The ratio describes how much excess return you receive for the extra
          volatility you endure for holding a riskier asset. The higher the
          number, the more returns you are getting for each unit of risk
          associated with the asset Remember, you need compensation for the
          additional risk you take for not holding a risk-free asset.
        </p>

        <p>
          Generally speaking, the higher the Sharpe Ratio, the higher the
          risk-adjusted performance of the portfolio.
        </p>

        <ul>
          <li>
            A negative Sharpe ratio means that the risk-free rate is higher than
            the portfolio's return. This value does not convey any meaningful
            information.
          </li>
          <li>A Sharpe ratio between 0 and 1.0 is considered sub-optimal.</li>
          <li>A Sharpe ratio greater than 1.0 is considered acceptable.</li>
          <li>A Sharpe ratio higher than 2.0 is considered very good.</li>
          <li>A Sharpe ratio of 3.0 or higher is considered excellent.</li>
        </ul>
      </div>
    ),
  };

  return (
    <ChartContainer>
      <div className={"flex flex-row"}>
        <h1>
          Rolling Sharpe/Price{" "}
          <span className={"ms-3"}>
            <FinanceChartModal text={modalText} />
          </span>
        </h1>
      </div>

      {data && (
        <ResponsiveContainer width="100%" height={500}>
          <ComposedChart data={data} height={500} width={800}>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis dataKey="" yAxisId="right-axis" orientation="right" />
            <YAxis dataKey="close" yAxisId="left-axis" />
            <XAxis
              dataKey="time"
              tickFormatter={(val) => FormatUnixTime(val)}
            />
            <Tooltip
              labelFormatter={(val) => FormatUnixTime(val)}
              formatter={(val) => (val > 20 ? currencyFormat(val) : val)}
            />
            <defs>
              <linearGradient id="close" x1="0" y1="0" x2="0" y2="1">
                <stop offset="70%" stopColor="#8884d8" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="close"
              yAxisId="left-axis"
              stroke="#8884d8"
              dot={false}
              strokeWidth={2}
              name="close"
              fillOpacity={1}
              fill="url(#close)"
            />
            <defs>
              <linearGradient id="rolling_sharpe" x1="0" y1="0" x2="0" y2="1">
                <stop offset="70%" stopColor="#00ff00" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="rolling_sharpe"
              yAxisId="right-axis"
              stroke="#00ff00"
              dot={false}
              strokeWidth={2}
              name="rolling_sharpe"
              fillOpacity={1}
              fill="url(#rolling_sharpe)"
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

export default SharpeRatioChart;
