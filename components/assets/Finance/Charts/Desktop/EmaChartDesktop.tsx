import ToggleSwitch from "@/components/commons/switchers/toggle-switch";
import { computeEMA } from "@/helpers/finance/ema";
import { currencyFormat } from "@/helpers/formatters/currency";
import { ChartColors, ChartDimensions, Colors } from "@/styles/variables";
import { useCallback, useEffect, useState } from "react";
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

  const handleCheckboxChange = () => {
    setShowLatest14Days(!showLatest14Days);
  };

  const processEmas = useCallback(() => {
    if (!data?.length) {
      setEmaData(undefined);
      return;
    }
    let series = data;
    if (showLatest14Days) {
      series = data.slice(-30);
    }

    const closeData: number[] = [];
    const dateData: (string | number)[] = [];

    for (const i of series) {
      closeData.push(i.close);
      dateData.push(i.time);
    }

    const emas = [];

    const thirtyEma = computeEMA(closeData, 30);
    const fiftyEma = computeEMA(closeData, 50);
    const oneHundredEma = computeEMA(closeData, 100);
    const twoHundredEma = computeEMA(closeData, 200);

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
  }, [data, showLatest14Days]);

  useEffect(() => {
    processEmas();
  }, [processEmas]);

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
        <ResponsiveContainer width="100%" height={ChartDimensions.height}>
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
                  stopColor={Colors.primary}
                  stopOpacity={0.2}
                />
                <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="close"
              stroke={ChartColors.seriesMuted}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorUv)"
            />

            <Line
              type="monotone"
              dataKey="thirtyEma"
              stroke={ChartColors.negative}
              dot={false}
              strokeWidth={2}
              name="30 Day Ema"
            />

            <Line
              type="monotone"
              dataKey="fiftyEma"
              stroke="white"
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
