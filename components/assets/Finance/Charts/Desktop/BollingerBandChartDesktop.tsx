import ToggleSwitch from "@/components/commons/switchers/toggle-switch";
import { currencyFormat } from "@/helpers/formatters/currency";
import { ChartColors, ChartDimensions } from "@/styles/variables";
import boll from "bollinger-bands";
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

export interface BollingerCandleRow {
  close: number;
  time: string;
}

interface BollingerBandChartProps {
  data: BollingerCandleRow[];
}

interface EmaRow {
  close: number;
  upperBand: number;
  lowerBand: number;
  time: string;
}

const BollingerBandChart = ({ data }: BollingerBandChartProps) => {
  const [emaData, setEmaData] = useState<EmaRow[]>();
  const [showLatest14Days, setShowLatest14Days] = useState(false);

  useEffect(() => {
    processEmas(data);
  }, [data, showLatest14Days]);

  const handleCheckboxChange = () => {
    setShowLatest14Days(!showLatest14Days);
  };

  const processEmas = (rows: BollingerCandleRow[]) => {
    const closeData: number[] = [];
    const dateData: string[] = [];

    let working = rows;
    if (showLatest14Days) {
      working = rows.slice(-30);
    }

    for (const row of working) {
      closeData.push(row.close);
      dateData.push(row.time);
    }

    const emas: EmaRow[] = [];
    const bollingerNumbers = boll(closeData, showLatest14Days ? 3 : 30, 2);

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
        <ResponsiveContainer width="100%" height={ChartDimensions.height}>
          <ComposedChart data={emaData}>
            <CartesianGrid strokeDasharray="3 3" />

            <YAxis
              dataKey="close"
              domain={["auto", "auto"]}
              allowDataOverflow={true}
              width={0}
            />
            <XAxis dataKey="time" />

            <Tooltip formatter={(value) => currencyFormat(value)} />

            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="70%" stopColor={ChartColors.seriesMuted} stopOpacity={0.1} />
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
              name="Closing Price"
            />

            <Line
              type="monotone"
              dataKey="upperBand"
              stroke={ChartColors.seriesCool}
              dot={false}
              strokeWidth={2}
              name="Upper Band"
            />

            <Line
              type="monotone"
              dataKey="lowerBand"
              stroke="white"
              dot={false}
              name="Lower Band"
            />
          </ComposedChart>
        </ResponsiveContainer>
      )}
    </ChartContainer>
  );
};

export default BollingerBandChart;
