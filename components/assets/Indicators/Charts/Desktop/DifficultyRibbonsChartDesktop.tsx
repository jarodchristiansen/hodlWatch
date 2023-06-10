// import { useEffect, useState } from "react-responsive";
// import { currencyFormat } from "../../helpers/formatters";
// import FinanceChartModal from "./FinanceChartModal";
import React, { useState, useEffect } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/**
 *
 * @param data: DifficultyRibbonData
 * @returns Difficulty Ribbon chart that shows the network difficulty of BTC (PoW blockchains specifically)
 */
const DifficultyRibbonChartDesktop = ({ data }: any) => {
  const format = (num, decimals) =>
    num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className={"card mt-2 mx-3 text-center"}>
      <div className={"flex flex-row"}>
        <h1>Difficulty Ribbon Chart</h1>
      </div>
      {data && (
        <LineChart data={data} height={500} width={500}>
          <CartesianGrid strokeDasharray="3 3" />

          <YAxis
            // dataKey="market_dominance"
            domain={["auto", "auto"]}
            allowDataOverflow={true}
            // tick={{ fill: "white" }}
            width={0}
          />
          <XAxis
            dataKey="t"
            tickFormatter={(value) =>
              new Date(value * 1000).toLocaleDateString()
            }
          />

          <Tooltip formatter={(value) => format(value, 2)} />
          <Legend />
          <Line
            type="monotone"
            dataKey="ma9"
            stroke="red"
            dot={false}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="ma14"
            stroke="forestgreen"
            dot={false}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="ma25"
            stroke="darkblue"
            dot={false}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="ma40"
            stroke="violet"
            dot={false}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="ma60"
            stroke="orange"
            dot={false}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="ma90"
            stroke="darkred"
            dot={false}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="ma128"
            stroke="limegreen"
            dot={false}
          />
          <Line type="monotone" dataKey="ma200" stroke="#8884d8" dot={false} />
          {/*<Line type="monotone" dataKey="close" stroke="black" dot={false} />*/}
        </LineChart>
      )}
    </div>
  );
};

export default DifficultyRibbonChartDesktop;
