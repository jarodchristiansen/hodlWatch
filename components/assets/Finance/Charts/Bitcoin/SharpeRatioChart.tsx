import ToggleSwitch from "@/components/commons/switchers/toggle-switch";
import { currencyFormat } from "@/helpers/formatters/currency";
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

// import FinanceChartModal from "../FinanceChartModal";
import ChartContainer from "../Desktop/ChartContainer";
import FinanceChartModal from "../FinanceChartModal";

/**
 *
 * @param {data} data: rolling_sharpe, close, time
 * @returns SharpeRatioChart shows the rolling sharpe ratio for bitcoin long-term
 */
const SharpeRatioChart = ({ data }) => {
  const [chartData, setChartData] = useState();
  const [showLatest14Days, setShowLatest14Days] = useState(false);

  const modalText = {
    modalHeader: "Sharpe Ratio",
    modalBodyText: () => (
      <div>
        <h5>What is a Sharpe Ratio?</h5>
        <p>
          The ratio describes how much excess return you receive for the extra
          volatility you endure for holding a riskier asset. The higher the
          number, the more returns you are getting for each unit of risk
          associated with the asset Remember, you need compensation for the
          additional risk you take for not holding a risk-free asset.
        </p>

        <p>
          Generally speaking, the higher the Sharpe Ratio, the higher the
          risk-adjusted performance of the portfolio.
        </p>

        <ul>
          <li>
            A negative Sharpe ratio means that the risk-free rate is higher than
            the portfolio&apos;s return. This value does not convey any
            meaningful information.
          </li>
          <li>A Sharpe ratio between 0 and 1.0 is considered sub-optimal.</li>
          <li>A Sharpe ratio greater than 1.0 is considered acceptable.</li>
          <li>A Sharpe ratio higher than 2.0 is considered very good.</li>
          <li>A Sharpe ratio of 3.0 or higher is considered excellent.</li>
        </ul>
      </div>
    ),
  };

  function calculateRollingSharpeRatio(closingPrices, windowSize) {
    const returns = [];
    const rollingSharpeRatios = [];

    // Calculate daily returns
    for (let i = 1; i < closingPrices.length; i++) {
      const prevPrice = closingPrices[i - 1];
      const currPrice = closingPrices[i];
      const returnVal = (currPrice - prevPrice) / prevPrice;
      returns.push(returnVal);
    }

    // Calculate rolling Sharpe ratios
    for (let i = windowSize; i <= returns.length; i++) {
      const returnsSlice = returns.slice(i - windowSize, i);
      const averageReturn =
        returnsSlice.reduce((a, b) => a + b, 0) / windowSize;
      const standardDeviation = Math.sqrt(
        returnsSlice
          .map((x) => Math.pow(x - averageReturn, 2))
          .reduce((a, b) => a + b, 0) / windowSize
      );
      const sharpeRatio = averageReturn / standardDeviation;

      rollingSharpeRatios.push(sharpeRatio);
    }

    return rollingSharpeRatios;
  }

  useEffect(() => {
    if (data) {
      if (showLatest14Days) {
        data = data.slice(-30);
      }

      const closingPrices = data.map((x) => x.close);

      const rollingSharpeRatios = calculateRollingSharpeRatio(
        closingPrices,
        showLatest14Days ? 2 : 14
      );
      const rollingSharpeRatiosWithTime = data.map((x, i) => {
        return {
          ...x,
          rolling_sharpe: rollingSharpeRatios[i],
          time: x.time,
        };
      });
      setChartData(rollingSharpeRatiosWithTime);
    }
  }, [data, showLatest14Days]);

  const handleCheckboxChange = () => {
    setShowLatest14Days(!showLatest14Days);
  };

  return (
    <ChartContainer>
      <div className={"label-row"}>
        <h5>Rolling Sharpe/Price </h5>

        <ToggleSwitch
          label={"30 days"}
          label2={"1 year"}
          toggleState={showLatest14Days}
          setToggleState={handleCheckboxChange}
        />
        <FinanceChartModal text={modalText} />
      </div>

      {chartData && (
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis
              dataKey=""
              yAxisId="right-axis"
              orientation="right"
              width={0}
            />
            <YAxis dataKey="close" yAxisId="left-axis" width={0} />
            <XAxis dataKey="time" />
            <Tooltip
              labelFormatter={(val) => val}
              // @ts-ignore
              formatter={(val) => (val > 20 ? currencyFormat(val) : val)}
            />
            <defs>
              <linearGradient id="close" x1="0" y1="0" x2="0" y2="1">
                <stop offset="70%" stopColor="#8884d8" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="close"
              yAxisId="left-axis"
              stroke="#8884d8"
              dot={false}
              strokeWidth={2}
              name="Closing Price"
              fillOpacity={1}
              fill="url(#close)"
            />
            <defs>
              <linearGradient id="rolling_sharpe" x1="0" y1="0" x2="0" y2="1">
                <stop offset="70%" stopColor="#00BFBF" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="rolling_sharpe"
              yAxisId="right-axis"
              stroke="#00BFBF"
              dot={false}
              strokeWidth={2}
              name="Sharpe Ratio"
              fillOpacity={1}
              fill="url(#rolling_sharpe)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  );
};

export default SharpeRatioChart;
