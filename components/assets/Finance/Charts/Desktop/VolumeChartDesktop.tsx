// import FinanceChartModal from "./FinanceChartModal";
import { currencyFormat } from "@/helpers/formatters/currency";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";

interface VolumeChartProps {
  data: VolumeObjects[];
}

interface VolumeObjects {
  time: string;
  volumeFrom: number;
  volumeTo: number;
}

/**
 *
 * @param data: volumeData
 * @returns VolumeChart that shows to/from exchange volume of asset
 */
const VolumeChartDesktop = ({ data }: VolumeChartProps) => {
  return (
    <ChartContainer>
      <div className={"flex flex-row"}>
        <h1>Volume Chart</h1>
      </div>

      {data && (
        <ComposedChart data={data} height={500} width={500}>
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis dataKey="volumeTo" yAxisId="left-axis" />
          <YAxis
            dataKey="volumeFrom"
            yAxisId="right-axis"
            orientation="right"
            tickFormatter={(value) => currencyFormat(value)}
            width={0}
          />
          <XAxis dataKey="time" />
          <Tooltip formatter={(value) => currencyFormat(value)} />
          <defs>
            <linearGradient id="toExchange" x1="0" y1="0" x2="0" y2="1">
              <stop offset="70%" stopColor="#8884d8" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="volumeTo"
            yAxisId="left-axis"
            stroke="#8884d8"
            dot={false}
            strokeWidth={2}
            name="Volume from exchanges"
            fillOpacity={1}
            fill="url(#toExchange)"
          />
          <defs>
            <linearGradient id="fromExchange" x1="0" y1="0" x2="0" y2="1">
              <stop offset="70%" stopColor="#00ff00" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="volumeFrom"
            yAxisId="right-axis"
            stroke="#00ff00"
            dot={false}
            strokeWidth={2}
            name="Volume from exchanges"
            fillOpacity={1}
            fill="url(#fromExchange)"
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

export default VolumeChartDesktop;
