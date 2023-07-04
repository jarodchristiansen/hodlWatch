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

const CustomizedDot = (props) => {
  const { cx, cy, stroke, payload, value } = props;

  let { close, high, low } = payload;

  let upperWeight;
  let lowerWeight;

  if (close > 10000) {
    upperWeight = 1.0005;
    lowerWeight = 0.9995;
  } else {
    upperWeight = 1.003;
    lowerWeight = 0.997;
  }

  let upperBound = value * upperWeight;
  let lowerBound = value * lowerWeight;

  let renderPoint = close > lowerBound && close < upperBound;

  // console.log({ close, value, renderPoint });

  // const { cx, cy, stroke, payload, value, is14Days } = props;
  // const { close, high, low } = payload;

  // let upperWeight;
  // let lowerWeight;

  // if (close > 10000) {
  //   upperWeight = 1.0005;
  //   lowerWeight = 0.9995;
  // } else {
  //   upperWeight = 1.003;
  //   lowerWeight = 0.997;
  // }

  // const upperBound = high * upperWeight;
  // const lowerBound = low * lowerWeight;

  // const upperDistance = Math.abs(value - upperBound);
  // const lowerDistance = Math.abs(value - lowerBound);

  // const proximityThreshold = is14Days ? 5 : 2; // Adjust this threshold as needed

  // const renderPoint =
  //   upperDistance < proximityThreshold || lowerDistance < proximityThreshold;

  if (renderPoint) {
    return (
      <svg
        x={cx - 15}
        y={cy - 15}
        width={60}
        height={60}
        fill={stroke}
        viewBox="0 0 1024 1024"
      >
        <g>
          <path
            d="M7.32,255.207c7.1,1.7,14.3,3.6,21.5,3.4c7.4-0.2,14.8-1.1,22.1-2.1c0.3,15.1,2.5,30.4,6.7,45.1
		c6.6,23.7,18.1,46.2,33.6,65.7s34.9,36.1,56.9,48.2l16.9,8.3c5.9,2.3,11.8,4.4,17.7,6.6c6,1.8,12.2,3.3,18.3,4.9
		c6.3,1.3,13,2.1,19.5,3.1l2.5,0.3h0.1c-1.4,12.9-1.6,25.8,2.2,38.7c1.2,3.9,5.8,7.1,14.8,6.8c8.3-0.3,14.4-3,15.3-7
		c1.7-7.2,3.6-14.4,3.4-21.6c-0.2-5.6-0.7-11.1-1.4-16.7l4.6-0.3c1.6-0.2,3.1-0.4,4.7-0.7l9.4-1.4c6.3-0.7,12.3-2.7,18.4-4.2
		c24.3-6.7,47.3-18.2,67.2-33.6c20-15.3,37-34.4,49.9-56c1.6-2.7,3.4-5.3,4.8-8.1l4.1-8.5c1.3-2.9,2.9-5.6,4-8.5l3.3-8.8
		c1.1-3,2.3-5.9,3.2-8.9l2.4-9.1l2.4-9.1l1.6-9.8c0.7-3.5,0.7-7.2,0.4-10.8c14.4,1.9,28.9-0.7,43.2,1c0.9,0.1,2.4-3.4,2.9-5.8
		c0.9-4.9-0.3-9-2-12.1c-5.8-10.3-12.9-14.8-20.2-16c-11.6-1.9-23.1-4.5-34.8-5c0-0.1,0-0.1,0-0.2c0.5-5.6,0.7-12.3,0.2-19.9
		c-0.5-3.8-1.2-7.7-2-11.9c-0.4-2.1-0.8-4.2-1.4-6.4c-0.7-2.1-1.4-4.3-2.1-6.5c-4.8-16-12.7-30.9-21.5-45.1
		c-4.9-6.8-9.5-13.9-15.2-20c-2.8-3.1-5.4-6.5-8.5-9.4l-9.2-8.7c-12.8-11-26.7-21-42.1-28.1c-7.5-4.1-15.6-6.7-23.5-9.7
		c-4-1.4-8.2-2.3-12.3-3.4c-4.1-1-8.1-2.3-12.6-2.8l-10.6-1.5l-5.3-0.7h-0.3c2.6-15.2-0.3-30.5,1.4-45.7c0.1-0.9-3.4-2.4-5.8-2.9
		c-4.9-0.9-9,0.3-12.1,2c-10.3,5.8-14.8,12.9-16,20.1c-1.5,8.9-3.3,17.8-4.4,26.7c-2.6,0.2-5.1,0.5-7.7,1c-6.7,1.1-13.5,2-20,4
		c-26.4,6.7-51.2,19.1-72.3,36s-38.8,38.1-50.9,62.1c-2.7,6.1-5.9,12.1-8.2,18.4l-3.3,9.5l-1.7,4.8c-0.5,1.6-0.8,3.3-1.2,4.9
		c-1.5,6.6-3.5,12.8-4.2,19.9c-0.6,4.7-1.4,9.6-1.8,14.2c-1.5-0.3-3-0.6-4.5-0.7c-13.7-1.7-27.4-2.2-41,1.9
		c-3.9,1.2-7.1,5.8-6.8,14.8C0.62,248.107,3.32,254.207,7.32,255.207z M86.02,214.007c2.8-16.1,8-32.7,15.6-47.8
		c8.5-14.5,19.2-27.6,31.4-39c24.6-23.1,56.6-37.3,89.7-41.3c-1.2,12.1-1.2,24.2,2.5,36.2c1.2,3.9,5.8,7.1,14.8,6.8
		c8.3-0.3,14.4-3,15.3-7c1.7-7.1,3.6-14.4,3.4-21.5c-0.2-5-0.6-9.9-1.2-14.9c7.5,0.7,14.9,1.9,22.2,3.8l9.5,2.4l9.2,3.3l4.6,1.6
		c1.5,0.6,3,1.4,4.5,2.1l8.9,4.2c11.4,6.4,22.7,13.4,32.4,22.4c10.1,8.5,18.6,18.7,26.5,29.4c3.5,5.6,7.5,10.9,10.3,17
		c1.5,3,3.2,5.8,4.6,8.9l3.8,9.2c5.1,12.3,8.4,24.3,11.4,33.7c-0.7-0.1-1.5-0.3-2.2-0.3c-13.7-1.7-27.4-2.2-41.1,1.9
		c-3.9,1.2-7.1,5.8-6.8,14.8c0.3,8.3,3,14.4,7,15.3c7.2,1.7,14.4,3.6,21.6,3.4c11.6-0.4,23.1-2.4,34.7-3.7c1.4,0.8,2.7,1.4,4.1,2
		c-0.6,1.8-1.1,3.7-1.7,5.7c-8,25-20.5,49.7-37.8,71.8c-8.9,10.8-18.6,21.3-29.8,30.1c-5.3,4.8-11.4,8.6-17.3,12.7
		c-2.9,2.1-6.2,3.6-9.3,5.5c-3.1,1.7-6.1,3.7-9.5,5.1c-15.4,7.9-32.3,12.5-49.3,14.9c-2.3,0.2-4.5,0.6-6.8,0.9
		c2.5-15.1-0.4-30.3,1.3-45.4c0.1-0.9-3.4-2.4-5.8-2.9c-4.9-0.9-9,0.3-12.1,2c-10.3,5.9-14.8,13-16,20.2c-1.4,8.4-3.1,16.9-4.2,25.3
		c-0.6-0.1-1.2-0.2-1.8-0.3l-6-1.1l-6-1c-2-0.4-4.1-1.1-6.1-1.7c-4.1-1.3-8.3-2-12.2-3.7l-11.9-4.6l-11.4-5.7
		c-14.9-8.2-28.4-18.5-40.2-30.7c-11.7-12.2-21.2-26.4-28.6-41.4l-2.7-5.7l-1.4-2.8l-1.1-3l-4.3-11.9l-3.1-12.2
		c-0.6-2-1-4.1-1.2-6.2l-0.9-6.2l-0.5-3.1c13.6,1.4,27.4-0.8,41,0.8c0.9,0.1,2.4-3.4,2.8-5.8c0.9-4.9-0.3-9-2-12.1
		c-5.8-10.3-12.9-14.8-20.1-16c-7.4-1.2-14.7-2.7-22.1-3.8C85.02,220.807,85.62,217.507,86.02,214.007z"
          />
        </g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
      </svg>
    );
  }
};

interface FibonacciProps {
  data: CloseData[];
}

interface CloseData {
  close: number;
  time: string;
}

const FibonacciRetracementChartDesktop = ({ data }: FibonacciProps) => {
  const [fibonacciData, setFibonacciData] = useState<any>();
  const [showLatest14Days, setShowLatest14Days] = useState(false);
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

    let priceMin = Math.min(...closeData);
    let priceMax = Math.max(...closeData);
    let diff = priceMax - priceMin;

    let level1 = priceMax - 0.236 * diff;
    let level2 = priceMax - 0.382 * diff;
    let level3 = priceMax - 0.5 * diff;
    let level4 = priceMax - 0.618 * diff;

    let fib1 = new Array(time).fill(level1).flat();
    let fib2 = new Array(time).fill(level2).flat();
    let fib3 = new Array(time).fill(level3).flat();
    let fib4 = new Array(time).fill(level4).flat();
    let minArray = new Array(time).fill(priceMin).flat();
    let maxArray = new Array(time).fill(priceMax).flat();

    let fibData = [];

    for (let i = 0; i < dateData.length; i++) {
      fibData.push({
        high: highData[i],
        low: lowData[i],
        close: closeData[i],
        fib1: fib1[i],
        fib2: fib2[i],
        fib3: fib3[i],
        fib4: fib4[i],
        time: dateData[i],
        min: minArray[i],
        max: maxArray[i],
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
    <ChartContainer>
      <div className={"label-row"}>
        <h5>Fibonacci Retracement</h5>

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

            <Line
              type="monotone"
              dataKey="fib1"
              stroke="black"
              dot={<CustomizedDot is14Days={showLatest14Days} />}
              name={"Profit 3/Topping"}
            />
            <Line
              type="monotone"
              dataKey="fib2"
              stroke="blue"
              dot={<CustomizedDot is14Days={showLatest14Days} />}
              name={"Take Profit 2"}
            />
            <Line
              type="monotone"
              dataKey="fib3"
              stroke="green"
              dot={<CustomizedDot is14Days={showLatest14Days} />}
              name={"Take Profit 1"}
            />
            <Line
              type="monotone"
              dataKey="fib4"
              stroke="orange"
              name={"Deep Value/No Man's Land"}
              dot={<CustomizedDot is14Days={showLatest14Days} />}
            />
            <Line
              type="monotone"
              dataKey="max"
              stroke="#999900"
              name={"Max"}
              strokeWidth={2}
              dot={false}
              // dot={{ stroke: "#999900", strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  );
};

export default FibonacciRetracementChartDesktop;
