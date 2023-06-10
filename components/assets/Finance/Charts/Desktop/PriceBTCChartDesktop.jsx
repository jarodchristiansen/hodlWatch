// import FinanceChartModal from "./FinanceChartModal";
import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const PriceBTCChartDesktop = ({ data }) => {
  const [processedData, setProcessedData] = useState([]);

  useEffect(() => {
    processFibonacciData(data);
  });

  const processFibonacciData = (data) => {
    let closeData = [];
    let dateData = [];

    let time = data.length;

    for (let i of data) {
      closeData.push(i.price_btc);
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
        price_btc: closeData[i],
        fib1: fib1[i],
        fib2: fib2[i],
        fib3: fib3[i],
        fib4: fib4[i],
        time: dateData[i],
        min: minArray[i],
        max: maxArray[i],
      });
    }

    setProcessedData(fibData);
  };

  return (
    <div className={"card mt-2 mx-3 text-center"}>
      <div className={"flex flex-row"}>
        <h1>Price Vs BTC</h1>
      </div>
      {processedData && (
        <LineChart data={processedData} height={500} width={500}>
          <CartesianGrid strokeDasharray="3 3" />

          <YAxis
            dataKey="price_btc"
            domain={["auto", "auto"]}
            allowDataOverflow={true}
            width={0}
          />
          <XAxis dataKey="time" />

          <Tooltip
          // formatter={(value) => currencyFormat(value)}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="price_btc"
            stroke="#8884d8"
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
        </LineChart>
      )}
    </div>
  );
};

export default PriceBTCChartDesktop;
