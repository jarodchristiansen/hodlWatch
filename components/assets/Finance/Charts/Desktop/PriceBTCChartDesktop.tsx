import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface PriceBtcRow {
  time: string;
  price_btc: number;
}

interface PriceBtcProcessedRow {
  price_btc: number;
  fib1: number;
  fib2: number;
  fib3: number;
  fib4: number;
  time: string;
  min: number;
  max: number;
}

interface PriceBTCChartDesktopProps {
  data: PriceBtcRow[];
}

const PriceBTCChartDesktop = ({ data }: PriceBTCChartDesktopProps) => {
  const [processedData, setProcessedData] = useState<PriceBtcProcessedRow[]>([]);

  function processFibonacciData(rows: PriceBtcRow[]) {
    const closeData: number[] = [];
    const dateData: string[] = [];

    for (const row of rows) {
      closeData.push(row.price_btc);
      dateData.push(row.time);
    }

    const n = closeData.length;

    const priceMin = Math.min(...closeData);
    const priceMax = Math.max(...closeData);
    const diff = priceMax - priceMin;

    const level1 = priceMax - 0.236 * diff;
    const level2 = priceMax - 0.382 * diff;
    const level3 = priceMax - 0.5 * diff;
    const level4 = priceMax - 0.618 * diff;

    const fib1 = new Array(n).fill(level1).flat();
    const fib2 = new Array(n).fill(level2).flat();
    const fib3 = new Array(n).fill(level3).flat();
    const fib4 = new Array(n).fill(level4).flat();
    const minArray = new Array(n).fill(priceMin).flat();
    const maxArray = new Array(n).fill(priceMax).flat();

    const fibData: PriceBtcProcessedRow[] = [];

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
  }

  useEffect(() => {
    if (!data?.length) return;
    processFibonacciData(data);
  }, [data]);

  return (
    <div className={"card mt-2 mx-3 text-center"}>
      <div className={"flex flex-row"}>
        <h1>Price Vs BTC</h1>
      </div>
      {processedData.length > 0 && (
        <LineChart data={processedData} height={500} width={500}>
          <CartesianGrid strokeDasharray="3 3" />

          <YAxis
            dataKey="price_btc"
            domain={["auto", "auto"]}
            allowDataOverflow={true}
            width={0}
          />
          <XAxis dataKey="time" />

          <Tooltip />
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
