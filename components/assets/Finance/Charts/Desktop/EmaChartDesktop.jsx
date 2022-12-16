import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  Area,
  ComposedChart,
} from "recharts";
// import FinanceChartModal from "./FinanceChartModal";
import React, { useEffect, useState } from "react";
import { currencyFormat } from "../../../../../helpers/formatters/currency";
import styled from "styled-components";

const EMAChartDesktop = ({ data }) => {
  const [emaData, setEmaData] = useState();

  useEffect(() => {
    processEmas(data);
  }, []);

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

  const processEmas = (data) => {
    let closeData = [];
    let dateData = [];

    let time = data.length;

    for (let i of data) {
      closeData.push(i.close);
      dateData.push(i.time);
    }

    let emas = [];

    let threeEma = EMACalc(closeData, 3);

    let fiftyEma = EMACalc(closeData, 50);
    let oneHundredEma = EMACalc(closeData, 100);
    let twoHundredEma = EMACalc(closeData, 200);

    for (let i = 0; i < dateData.length; i++) {
      emas.push({
        close: closeData[i],
        threeEma: threeEma[i],
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
      <div className={"flex flex-row"}>
        <h1>EMA Chart</h1>
      </div>
      {emaData && (
        <ComposedChart data={emaData} height={500} width={500}>
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
          />

          <Line
            type="monotone"
            dataKey="threeEma"
            stroke="#b30000"
            dot={false}
            strokeWidth={2}
            name="3 Day Ema"
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
      )}
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  padding: 1rem 1rem;
  background-color: white;
  box-shadow: 2px 4px 8px lightgray;
`;

export default EMAChartDesktop;
