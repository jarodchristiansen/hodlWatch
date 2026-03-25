import ToggleSwitch from "@/components/commons/switchers/toggle-switch";
import { currencyFormat } from "@/helpers/formatters/currency";
import { ChartColors, Colors, FontWeight } from "@/styles/variables";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import FinanceChartModal from "../FinanceChartModal";
import ChartContainer from "./ChartContainer";

interface CloseData {
  close: number;
  time: string;
  high?: number;
  low?: number;
}

interface FibonacciProps {
  data: CloseData[];
}

function FibonacciModalBody() {
  return (
    <div>
      <p>
        Fibonacci retracement levels—stemming from the Fibonacci sequence—are
        horizontal lines that indicate where support and resistance are likely
        to occur. Each level is associated with a percentage. The percentage is
        how much of a prior move the price has retraced. The Fibonacci
        retracement levels are 23.6%, 38.2%, 61.8%, and 78.6%. While not
        officially a Fibonacci ratio, 50% is also used. The indicator is useful
        because it can be drawn between any two significant price points, such
        as a high and a low. The indicator will then create the levels between
        those two points. Suppose the price of a stock rises $10 and then drops
        $2.36. In that case, it has retraced 23.6%, which is a Fibonacci
        number. Fibonacci numbers are found throughout nature. Therefore, many
        traders believe that these numbers also have relevance in financial
        markets.
      </p>

      <br />

      <p>
        (In our case, the target indicators should signify that the closing
        value is within a weighted range of a fibonacci level.)
      </p>

      <br />

      <Link href="/education/fibonacci-retracement-indicator">See more</Link>
    </div>
  );
}

const PriceComparativeChart = ({ data }: FibonacciProps) => {
  const [fibonacciData, setFibonacciData] = useState<any>();
  const [showLatest14Days, setShowLatest14Days] = useState(false);

  const handleCheckboxChange = () => {
    setShowLatest14Days(!showLatest14Days);
  };

  const processFibonacciData = useCallback(
    (input: CloseData[]) => {
      const series = showLatest14Days ? input.slice(-30) : input;

      const closeData: number[] = [];
      const dateData: string[] = [];
      const highData: number[] = [];
      const lowData: number[] = [];

      for (const row of series) {
        closeData.push(row.close);
        dateData.push(row.time);
        highData.push(row.high ?? row.close);
        lowData.push(row.low ?? row.close);
      }

      const fibData = [];

      for (let i = 0; i < dateData.length; i++) {
        fibData.push({
          high: highData[i],
          low: lowData[i],
          close: closeData[i],
          time: dateData[i],
        });
      }

      setFibonacciData(fibData);
    },
    [showLatest14Days]
  );

  useEffect(() => {
    processFibonacciData(data);
  }, [data, processFibonacciData]);

  const modalText = {
    modalHeader: "Fibonacci Retracement",
    modalBodyText: () => <FibonacciModalBody />,
  };

  return (
    <ChartContainer name="price-comparison-chart">
      <div className={"label-row"}>
        <h5>Price Comparative</h5>

        <FinanceChartModal text={modalText} />

        <ToggleSwitch
          label={"30 days"}
          label2={"1 year"}
          toggleState={showLatest14Days}
          setToggleState={handleCheckboxChange}
        />
      </div>
      {fibonacciData && (
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={fibonacciData}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />

            <YAxis
              dataKey="close"
              domain={["auto", "auto"]}
              allowDataOverflow={true}
              width={0}
            />
            <XAxis
              dataKey="time"
              interval={"preserveStartEnd"}
              tick={{ fontWeight: FontWeight.bold }}
            />

            <Tooltip formatter={(value) => currencyFormat(value)} />

            <Line
              type="monotone"
              dataKey="min"
              stroke={ChartColors.negative}
              dot={false}
              strokeWidth={2}
            />

            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="70%"
                  stopColor={Colors.accent}
                  stopOpacity={0.2}
                />
                <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="close"
              stroke={ChartColors.seriesMuted}
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  );
};

export default PriceComparativeChart;
