import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
// import FinanceChartModal from "./FinanceChartModal";
import React, { useEffect, useState } from "react";
import { currencyFormat } from "../../../../../helpers/formatters/currency";
import styled from "styled-components";

const FibonacciRetracementChartDesktop = ({ data }) => {
  const [fibonacciData, setFibonacciData] = useState();

  useEffect(() => {
    processFibonacciData(data);
  }, []);

  const processFibonacciData = (data) => {
    let closeData = [];
    let dateData = [];

    let time = data.length;

    for (let i of data) {
      closeData.push(i.close);
      dateData.push(i.time);
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

  return (
    <ChartContainer>
      <div className={"flex flex-row"}>
        <h1>Fibonacci Retracement</h1>
      </div>
      {fibonacciData && (
        <LineChart data={fibonacciData} height={500} width={500}>
          <CartesianGrid strokeDasharray="3 3" />

          <YAxis
            dataKey="close"
            domain={["auto", "auto"]}
            allowDataOverflow={true}
            // tick={{ fill: "white" }}
            width={0}
          />
          <XAxis dataKey="time" />

          <Tooltip formatter={(value) => currencyFormat(value)} />
          {/* <Legend /> */}
          <Line
            type="monotone"
            dataKey="min"
            stroke="#b30000"
            dot={false}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="close"
            stroke="#000000"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="fib1"
            stroke="purple"
            dot={false}
            name={"Profit 3/Topping"}
          />
          <Line
            type="monotone"
            dataKey="fib2"
            stroke="blue"
            dot={false}
            name={"Take Profit 2"}
          />
          <Line
            type="monotone"
            dataKey="fib3"
            stroke="green"
            dot={false}
            name={"Take Profit 1"}
          />
          <Line
            type="monotone"
            dataKey="fib4"
            stroke="orange"
            dot={false}
            name={"Deep Value/No Man's Land"}
          />
          <Line
            type="monotone"
            dataKey="max"
            stroke="#999900"
            name={"Max"}
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      )}
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  padding: 1rem 1rem;
`;

export default FibonacciRetracementChartDesktop;
