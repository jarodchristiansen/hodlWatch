import ToggleSwitch from "@/components/commons/switchers/toggle-switch";
// import FinanceChartModal from "./FinanceChartModal";
import { FormatUnixTime } from "@/helpers/formatters/time";
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

const OBVChart = ({ data }) => {
  const [emaData, setEmaData] = useState([]);
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
    let volumeData = [];

    if (showLatest14Days) {
      data = data.slice(-30);
    }

    let time = data.length;

    for (let i of data) {
      closeData.push(i.close);
      dateData.push(i.time);
      volumeData.push(i.volumeto + i.volumefrom);
    }

    let emas = [];

    let obv = calculateOBV(closeData, volumeData);

    for (let i = 0; i < dateData.length; i++) {
      emas.push({
        close: closeData[i],
        obv: obv[i],
        time: dateData[i],
      });
    }

    setEmaData(emas);
  };

  // OBV (On-Balance Volume)
  function calculateOBV(closingPrices, volume) {
    if (
      closingPrices.length !== volume.length ||
      closingPrices.length === 0 ||
      volume.length === 0
    ) {
      throw new Error("Invalid data");
    }

    let obv = 0;
    const obvValues = [];

    for (let i = 0; i < closingPrices.length; i++) {
      if (i === 0) {
        obvValues.push(obv);
        continue;
      }

      if (closingPrices[i] > closingPrices[i - 1]) {
        obv += volume[i];
      } else if (closingPrices[i] < closingPrices[i - 1]) {
        obv -= volume[i];
      }

      obvValues.push(obv);
    }

    return obvValues;
  }

  return (
    <ChartContainer>
      <div className={"label-row"}>
        <h5>OBV (On-balance Volume)</h5>

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
              yAxisId="left-axis"
              orientation="left"
              // tick={{ fill: "white" }}
              width={0}
              // formatter={(value) => currencyFormat(value)}
            />

            <YAxis
              dataKey="obv"
              yAxisId="right-axis"
              orientation="right"
              width={0}
            />

            <XAxis
              dataKey="time"
              tickFormatter={(value) => FormatUnixTime(value)}
            />

            <Tooltip formatter={(value) => value} />
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
              yAxisId="left-axis"
              name="Closing Price"
            />

            <Line
              type="monotone"
              dataKey="obv"
              stroke="#00BFBF"
              dot={false}
              strokeWidth={2}
              name="OBV"
              yAxisId="right-axis"
            />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  );
};

export default OBVChart;
