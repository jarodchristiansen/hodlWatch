import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface VolatilityRow {
  time: string;
  volatility: number;
}

interface VolatilityChartProps {
  data: VolatilityRow[];
}

/**
 * Volatility over time for the current period.
 */
const VolatilityChart = ({ data }: VolatilityChartProps) => {
  return (
    <div className={"card mt-2 mx-3 text-center"}>
      <div className={"flex flex-row"}>
        <h1>Volatility of Asset</h1>
      </div>

      {data && (
        <LineChart data={data} height={500} width={500}>
          <CartesianGrid strokeDasharray="3 3" />

          <YAxis
            dataKey="volatility"
            domain={["auto", "auto"]}
            allowDataOverflow={true}
            width={0}
          />
          <XAxis dataKey="time" tick={{ fill: "black" }} height={50} />

          <Tooltip />
          <Legend />
          <Line
            type="linear"
            dataKey="volatility"
            stroke="#8884d8"
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      )}

      <p className="mt-3 text-start px-3 small">
        See{" "}
        <a
          href="https://portfolioslab.com/tools/sharpe-ratio?s=BTC-USD"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sharpe Ratio
        </a>{" "}
        for related context.
      </p>
    </div>
  );
};

export default VolatilityChart;
