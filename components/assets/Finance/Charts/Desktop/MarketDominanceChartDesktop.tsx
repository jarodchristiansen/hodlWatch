import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface MarketDominanceRow {
  time: string;
  market_dominance: number;
}

interface MarketDominanceChartDesktopProps {
  data: MarketDominanceRow[];
}

const MarketDominanceChartDesktop = ({ data }: MarketDominanceChartDesktopProps) => {
  const format = (num: number, decimals: number) =>
    num.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  return (
    <div className={"card mt-2 mx-3 text-center"}>
      <div className={"flex flex-row"}>
        <h1>Market Dominance</h1>
      </div>
      {data && (
        <LineChart data={data} height={500} width={500}>
          <CartesianGrid strokeDasharray="3 3" />

          <YAxis
            dataKey="market_dominance"
            domain={["auto", "auto"]}
            allowDataOverflow={true}
            width={0}
          />
          <XAxis dataKey="time" />

          <Tooltip formatter={(value) => format(Number(value), 2)} />
          <Legend />
          <Line
            type="monotone"
            dataKey="market_dominance"
            stroke="#8884d8"
            dot={false}
          />
        </LineChart>
      )}
    </div>
  );
};

export default MarketDominanceChartDesktop;
