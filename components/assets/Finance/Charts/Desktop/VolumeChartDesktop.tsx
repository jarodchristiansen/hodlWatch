import ToggleSwitch from "@/components/commons/switchers/toggle-switch";
// import FinanceChartModal from "./FinanceChartModal";
import { currencyFormat } from "@/helpers/formatters/currency";
import { Colors } from "@/styles/variables";
import { useEffect, useState } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import ChartContainer from "./ChartContainer";

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
  const [chartData, setChartData] = useState<any>();
  const [showLatest14Days, setShowLatest14Days] = useState(false);

  useEffect(() => {
    if (showLatest14Days) {
      data = data.slice(-30);
    }

    setChartData(data);
  }, [showLatest14Days]);

  const handleCheckboxChange = () => {
    setShowLatest14Days(!showLatest14Days);
  };

  return (
    <ChartContainer>
      <div className="label-row">
        <h5>Volume Chart</h5>

        <ToggleSwitch
          label={"30 days"}
          label2={"1 year"}
          toggleState={showLatest14Days}
          setToggleState={handleCheckboxChange}
        />
      </div>

      {chartData && (
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={chartData}>
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
              name="Volume To Exchanges"
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
              name="Volume From Exchanges"
              fillOpacity={1}
              fill="url(#fromExchange)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  );
};

export default VolumeChartDesktop;
