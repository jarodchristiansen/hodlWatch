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
import { currencyFormat } from "@/helpers/formatters/currency";
import styled from "styled-components";

const BollingerBandChart = ({ data }) => {
  const [emaData, setEmaData] = useState();

  useEffect(() => {
    processEmas(data);
  }, []);

  //   function EMACalc(mArray, mRange) {
  //     var k = 2 / (mRange + 1);
  //     // first item is just the same as the first item in the input
  //     let emaArray = [mArray[0]];
  //     // for the rest of the items, they are computed with the previous one
  //     for (var i = 1; i < mArray.length; i++) {
  //       emaArray.push(mArray[i] * k + emaArray[i - 1] * (1 - k));
  //     }
  //     return emaArray;
  //   }

  function calculateBollingerBands(closingPrices, period, numStdDev) {
    // Calculate the SMA
    let sum = 0;
    for (let i = 0; i < closingPrices.length; i++) {
      sum += closingPrices[i];
    }
    const sma = sum / closingPrices.length;

    // Calculate the standard deviation
    sum = 0;
    for (let i = 0; i < closingPrices.length; i++) {
      sum += Math.pow(closingPrices[i] - sma, 2);
    }
    const stdDev = Math.sqrt(sum / (closingPrices.length - 1));

    // Calculate the upper and lower bands
    const upperBand = sma + stdDev * numStdDev;
    const lowerBand = sma - stdDev * numStdDev;

    return { upperBand, lowerBand };
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

    for (let i = 0; i < dateData.length; i++) {
      const { upperBand, lowerBand } = calculateBollingerBands(
        closeData,
        time,
        2
      );

      emas.push({
        close: closeData[i],
        upperBand: upperBand,
        lowerBand: lowerBand,
        time: dateData[i],
      });
    }

    setEmaData(emas);
  };

  return (
    <ChartContainer>
      <div className={"flex flex-row"}>
        <h1>Bollinger Bands</h1>
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
            dataKey="upperBand"
            stroke="#b30000"
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

export default BollingerBandChart;
