import ToggleSwitch from "@/components/commons/switchers/toggle-switch";
import { currencyFormat } from "@/helpers/formatters/currency";
import boll from "bollinger-bands";
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

import ChartContainer from "./ChartContainer";

const BollingerBandChart = ({ data }) => {
  const [emaData, setEmaData] = useState();
  const [showLatest14Days, setShowLatest14Days] = useState(false);

  useEffect(() => {
    processEmas(data);
  }, [showLatest14Days]);

  const handleCheckboxChange = () => {
    setShowLatest14Days(!showLatest14Days);
  };

  const processEmas = (data) => {
    let closeData = [];
    let dateData = [];

    if (showLatest14Days) {
      data = data.slice(-30);
    }

    let time = data.length;

    for (let i of data) {
      closeData.push(i.close);
      dateData.push(i.time);
    }

    let emas = [];
    let bollingerNumbers = boll(closeData, showLatest14Days ? 3 : 30, 2);

    for (let i = 0; i < dateData.length; i++) {
      emas.push({
        close: closeData[i],
        upperBand: bollingerNumbers.upper[i],
        lowerBand: bollingerNumbers.lower[i],
        time: dateData[i],
      });
    }

    setEmaData(emas);
  };

  return (
    <ChartContainer>
      <div className={"label-row"}>
        <h5>Bollinger Bands</h5>

        <ToggleSwitch
          label={"30 days"}
          label2={"1 year"}
          toggleState={showLatest14Days}
          setToggleState={handleCheckboxChange}
        />
      </div>
      {emaData && (
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={emaData}>
            <CartesianGrid strokeDasharray="3 3" />

            <YAxis
              dataKey="close"
              domain={["auto", "auto"]}
              allowDataOverflow={true}
              // tick={{ fill: "white" }}
              width={0}
              // formatter={(value) => currencyFormat(value)}
            />
            <XAxis dataKey="time" />

            <Tooltip formatter={(value) => currencyFormat(value)} />
            {/* <Legend /> */}

            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="70%" stopColor="#806cfe" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="close"
              stroke="#806cfe"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorUv)"
              name="Closing Price"
            />

            <Line
              type="monotone"
              dataKey="upperBand"
              stroke="#00BFBF"
              dot={false}
              strokeWidth={2}
              name="Upper Band"
            />

            <Line
              type="monotone"
              dataKey="lowerBand"
              stroke="black"
              dot={false}
              name="Lower Band"
            />
            {/* <Line
            type="monotone"
            dataKey="oneHundredEma"
            stroke="blue"
            dot={false}
            name="100 Day Ema"
          />
          <Line
            type="monotone"
            dataKey="twoHundredEma"
            stroke="green"
            dot={false}
            name="200 Day Ema"
          /> */}
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  );
};

export default BollingerBandChart;
