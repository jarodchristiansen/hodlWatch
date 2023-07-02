import ToggleSwitch from "@/components/commons/switchers/toggle-switch";
import { currencyFormat } from "@/helpers/formatters/currency";
import { Colors } from "@/styles/variables";
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

/**
 *
 * @param data: CLosing data/time period for asset
 * @returns EmaChart showing 30/50/100/200 Ema chart for asset over the given time period.
 */
const EMAChartDesktop = ({ data }) => {
  const [emaData, setEmaData] = useState<any>();
  const [showLatest14Days, setShowLatest14Days] = useState(false);

  useEffect(() => {
    processEmas(data);
  }, [showLatest14Days]);

  function EMACalc(mArray, mRange) {
    var k = 2 / (mRange + 1);
    // first item is just the same as the first item in the input
    let emaArray = [mArray[0]];
    // for the rest of the items, they are computed with the previous one
    for (var i = 1; i < mArray.length; i++) {
      emaArray.push(mArray[i] * k + emaArray[i - 1] * (1 - k));
    }
    return emaArray;
  }

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

    let thirtyEma = EMACalc(closeData, 30);

    let fiftyEma = EMACalc(closeData, 50);
    let oneHundredEma = EMACalc(closeData, 100);
    let twoHundredEma = EMACalc(closeData, 200);

    for (let i = 0; i < dateData.length; i++) {
      emas.push({
        close: closeData[i],
        thirtyEma: thirtyEma[i],
        fiftyEma: fiftyEma[i],
        oneHundredEma: oneHundredEma[i],
        twoHundredEma: twoHundredEma[i],
        time: dateData[i],
      });
    }

    setEmaData(emas);
  };

  return (
    <ChartContainer>
      <div className={"label-row"}>
        <h5>EMA Chart</h5>

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
              width={0}
              // @ts-ignore
              formatter={(value: any) => currencyFormat(value.toString)}
            />
            <XAxis dataKey="time" />

            <Tooltip formatter={(value) => currencyFormat(value)} />

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
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorUv)"
            />

            <Line
              type="monotone"
              dataKey="thirtyEma"
              stroke="#b30000"
              dot={false}
              strokeWidth={2}
              name="30 Day Ema"
            />

            <Line
              type="monotone"
              dataKey="fiftyEma"
              stroke="black"
              dot={false}
              name="50 Day Ema"
            />
            <Line
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
            />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  );
};

export default EMAChartDesktop;
