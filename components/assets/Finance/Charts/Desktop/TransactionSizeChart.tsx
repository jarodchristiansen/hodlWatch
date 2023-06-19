// import FinanceChartModal from "./FinanceChartModal";
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

/**
 *
 * @param {data} data: ActiveAddress/NewAddress data
 * @returns TransactionSizeChart shows the new/active addresses for asset BTC/ETH
 */
const TransactionSizeChart = ({ data }) => {
  return (
    <ChartContainer>
      <div className={"flex flex-row"}>
        <h5>Transaction Counts</h5>
      </div>

      {data && (
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis dataKey="transaction_count" yAxisId="left-axis" width={0} />
            <YAxis
              dataKey="large_transaction_count"
              yAxisId="right-axis"
              orientation="right"
              width={0}
            />
            <XAxis dataKey="time" />
            <Tooltip />
            <defs>
              <linearGradient
                id="transaction_count"
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
                <stop offset="70%" stopColor="#00BFBF" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="large_transaction_count"
              yAxisId="right-axis"
              stroke="#00BFBF"
              dot={false}
              strokeWidth={2}
              name="Large Transaction Count"
              fillOpacity={1}
              fill="url(#large_transaction_count)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  );
};

const ChartContainer = styled.div``;

export default TransactionSizeChart;
