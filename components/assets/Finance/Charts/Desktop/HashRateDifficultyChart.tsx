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
 * @returns ActiveAddressesChart shows the new/active addresses for asset BTC/ETH
 */
const HashRateDifficultyChart = ({ data }) => {
  return (
    <ChartContainer>
      <div className={"flex flex-row"}>
        <h1>Hashrate/Difficulty</h1>
      </div>

      {data && (
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis dataKey="difficulty" yAxisId="left-axis" width={0} />
            <YAxis
              dataKey="hash_rate"
              yAxisId="right-axis"
              orientation="right"
              width={0}
            />
            <XAxis dataKey="time" />
            <Tooltip />
            <defs>
              <linearGradient id="difficulty" x1="0" y1="0" x2="0" y2="1">
                <stop offset="70%" stopColor="#8884d8" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="difficulty"
              yAxisId="left-axis"
              stroke="#8884d8"
              dot={false}
              strokeWidth={2}
              name="Difficulty"
              fillOpacity={1}
              fill="url(#difficulty)"
            />
            <defs>
              <linearGradient id="hash_rate" x1="0" y1="0" x2="0" y2="1">
                <stop offset="70%" stopColor="#00BFBF" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="hash_rate"
              yAxisId="right-axis"
              stroke="#00BFBF"
              dot={false}
              strokeWidth={2}
              name="HashRate"
              fillOpacity={1}
              fill="url(#hash_rate)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  );
};

const ChartContainer = styled.div``;

export default HashRateDifficultyChart;
