import ToggleSwitch from "@/components/commons/switchers/toggle-switch";
import { currencyFormat } from "@/helpers/formatters/currency";
import { Colors, FontWeight } from "@/styles/variables";
import Link from "next/link";
// import FinanceChartModal from "./FinanceChartModal";
import { useEffect, useState } from "react";
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

interface FibonacciProps {
  data: CloseData[];
}

interface CloseData {
  close: number;
  time: string;
}

const PriceComparativeChart = ({ data }: FibonacciProps) => {
  const [fibonacciData, setFibonacciData] = useState<any>();
  const [showLatest14Days, setShowLatest14Days] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  // const [originalData, setOriginalData] = useState([]);

  const handleCheckboxChange = () => {
    setShowLatest14Days(!showLatest14Days);
  };

  useEffect(() => {
    processFibonacciData(data);
  }, [showLatest14Days]);

  const processFibonacciData = (data) => {
    if (showLatest14Days) {
      data = data.slice(-30);
    }

    let closeData = [];
    let dateData = [];
    let highData = [];
    let lowData = [];

    let time = data.length;

    for (let i of data) {
      closeData.push(i.close);
      dateData.push(i.time);
      highData.push(i.high);
      lowData.push(i.low);
    }

    // let priceMin = Math.min(...closeData);
    // let priceMax = Math.max(...closeData);
    // let diff = priceMax - priceMin;

    // let level1 = priceMax - 0.236 * diff;
    // let level2 = priceMax - 0.382 * diff;
    // let level3 = priceMax - 0.5 * diff;
    // let level4 = priceMax - 0.618 * diff;

    // let fib1 = new Array(time).fill(level1).flat();
    // let fib2 = new Array(time).fill(level2).flat();
    // let fib3 = new Array(time).fill(level3).flat();
    // let fib4 = new Array(time).fill(level4).flat();
    // let minArray = new Array(time).fill(priceMin).flat();
    // let maxArray = new Array(time).fill(priceMax).flat();

    let fibData = [];

    for (let i = 0; i < dateData.length; i++) {
      fibData.push({
        high: highData[i],
        low: lowData[i],
        close: closeData[i],
        // fib1: fib1[i],
        // fib2: fib2[i],
        // fib3: fib3[i],
        // fib4: fib4[i],
        time: dateData[i],
        // min: minArray[i],
        // max: maxArray[i],
      });
    }

    setFibonacciData(fibData);
  };

  const modalText = {
    modalHeader: "Fibonacci Retracement",
    modalBodyText: () => (
      <div>
        <p>
          Fibonacci retracement levels—stemming from the Fibonacci sequence—are
          horizontal lines that indicate where support and resistance are likely
          to occur. Each level is associated with a percentage. The percentage
          is how much of a prior move the price has retraced. The Fibonacci
          retracement levels are 23.6%, 38.2%, 61.8%, and 78.6%. While not
          officially a Fibonacci ratio, 50% is also used. The indicator is
          useful because it can be drawn between any two significant price
          points, such as a high and a low. The indicator will then create the
          levels between those two points. Suppose the price of a stock rises
          $10 and then drops $2.36. In that case, it has retraced 23.6%, which
          is a Fibonacci number. Fibonacci numbers are found throughout nature.
          Therefore, many traders believe that these numbers also have relevance
          in financial markets.
        </p>

        <br />

        <p>
          (In our case, the target indicators should signify that the closing
          value is within a weighted range of a fibonacci level.)
        </p>

        <br />

        <Link target="#" href="/education/fibonacci-retracement-indicator">
          See more
        </Link>
      </div>
    ),
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
              // tick={{ fill: "white" }}
              width={0}
              // formatter={(value) => currencyFormat(value)}
            />
            <XAxis
              dataKey="time"
              interval={"preserveStartEnd"}
              tick={{ fontWeight: FontWeight.bold }}
            />

            <Tooltip formatter={(value) => currencyFormat(value)} />
            {/* <Legend /> */}

            <Line
              type="monotone"
              dataKey="min"
              stroke="#b30000"
              dot={false}
              // dot={{ stroke: "#b30000", strokeWidth: 2 }}
              strokeWidth={2}
            />

            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="70%"
                  stopColor={Colors.elegant.accentPurple}
                  stopOpacity={0.2}
                />
                <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="close"
              stroke="#806cfe"
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
