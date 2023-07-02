import ToggleSwitch from "@/components/commons/switchers/toggle-switch";
import { useEffect, useState } from "react";
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

import ChartContainer from "./ChartContainer";

/**
 *
 * @param {data} data: ActiveAddress/NewAddress data
 * @returns TransactionSizeChart shows the new/active addresses for asset BTC/ETH
 */
const TransactionSizeChart = ({ data }) => {
  const [showLatest14Days, setShowLatest14Days] = useState(false);
  const [chartData, setChartData] = useState<any>();

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
      <div className={"label-row"}>
        <h5>Transaction Counts</h5>

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

export default TransactionSizeChart;
