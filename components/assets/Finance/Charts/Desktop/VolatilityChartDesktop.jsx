import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// import { FaInfoCircle } from "react-icons/fa";
// import FinanceChartModal from "./FinanceChartModal";

/**
 *
 * @param {data} data: Volatility Data
 * @returns VolatilityChart that shows the total vol for current period
 */
const VolatilityChart = ({ data }) => {
  const modalText = {
    modalHeader: "Volatility",
    modalBodyText: () => (
      <div>
        <h5>What is Volatility?</h5>
        <p>
          Volatility often refers to the amount of uncertainty or risk related
          to the size of changes in a security`&apos;s value. A higher
          volatility means that a security&apos;s value can potentially be
          spread out over a larger range of values. This means that the price of
          the security can change dramatically over a short time period in
          either direction. A lower volatility means that a security&apos;s
          value does not fluctuate dramatically, and tends to be more steady.
          See -
          <a
            href={"https://portfolioslab.com/tools/sharpe-ratio?s=BTC-USD"}
            target={"#"}
            className={"ms-1"}
          >
            Sharpe Ratio
          </a>
        </p>
      </div>
    ),
  };

  return (
    <div className={"card mt-2 mx-3 text-center"}>
      <div className={"flex flex-row"}>
        <h1>
          Volatility of Asset
          <span className={"ms-3"}>
            {/*<FinanceChartModal text={modalText} />*/}
          </span>
        </h1>
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
          {/*<YAxis />*/}

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
    </div>
  );
};

export default VolatilityChart;
