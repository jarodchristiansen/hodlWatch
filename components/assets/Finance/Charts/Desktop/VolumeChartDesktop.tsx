// import FinanceChartModal from "./FinanceChartModal";
import { currencyFormat } from "@/helpers/formatters/currency";
import { Colors } from "@/styles/variables";
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
        <h5>Volume Chart</h5>
      </div>

      {data && (
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis dataKey="volumeTo" yAxisId="left-axis" width={0} />
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
                <stop
                  offset="70%"
                  stopColor={Colors.elegant.accentPurple}
                  stopOpacity={0.4}
                />
                <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="volumeTo"
              yAxisId="left-axis"
              stroke={Colors.elegant.accentPurple}
              dot={false}
              strokeWidth={2}
              name="Volume from exchanges"
              fillOpacity={1}
              fill="url(#toExchange)"
            />
            <defs>
              <linearGradient id="fromExchange" x1="0" y1="0" x2="0" y2="1">
                <stop offset="70%" stopColor="#00BFBF" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="volumeFrom"
              yAxisId="right-axis"
              stroke="#00BFBF"
              dot={false}
              strokeWidth={2}
              name="Volume from exchanges"
              fillOpacity={1}
              fill="url(#fromExchange)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  );
};

const ChartContainer = styled.div``;

export default VolumeChartDesktop;
