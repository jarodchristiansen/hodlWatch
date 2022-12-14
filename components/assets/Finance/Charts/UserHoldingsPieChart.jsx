import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  ComposedChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
// import FinanceChartModal from "./FinanceChartModal";
import React from "react";
import styled from "styled-components";
import { Colors } from "../../../../styles/Colors";

const UserHoldingsPieChart = ({ data }) => {
  console.log({ data });

  const COLORS = [
    "#8884d8",
    "#82ca9d",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
  ];

  return (
    <ChartContainer>
      <div className={"flex flex-row"}>
        <h1>
          User Holdings Percentages
          {/*<span className={"ms-3"}>*/}
          {/*  <FinanceChartModal />*/}
          {/*</span>*/}
        </h1>
      </div>

      {data && (
        <PieChart width={730} height={600}>
          <Pie
            data={data}
            color="#000000"
            dataKey="balance"
            nameKey="symbol"
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>

        // <PieChart width={500} height={500}>
        //   <Pie
        //     data={data}
        //     dataKey={"usd"}
        //     // cx={120}
        //     // cy={200}
        //     // innerRadius={60}
        //     outerRadius={200}
        //     fill="#8884d8"
        //     // paddingAngle={5}
        //   >
        //     {data?.map((entry, index) => (
        //       <Cell fill={Colors[index % Colors.length]} />
        //     ))}
        //   </Pie>
        //   {/* <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label /> */}
        // </PieChart>

        // <ComposedChart data={data} height={500} width={500}>
        //   <CartesianGrid strokeDasharray="3 3" />
        //   <YAxis
        //     dataKey="volumeTo"
        //     yAxisId="left-axis"
        //     // domain={["auto", "auto"]}
        //     // allowDataOverflow={true}
        //     // width={0}
        //   />
        //   <YAxis
        //     dataKey="volumeFrom"
        //     yAxisId="right-axis"
        //     orientation="right"
        //     tickFormatter={(value) => currencyFormat(value)}
        //     // domain={["auto", "auto"]}
        //     // allowDataOverflow={true}
        //     width={0}
        //   />
        //   <XAxis dataKey="time" />
        //   <Tooltip formatter={(value) => currencyFormat(value)} />
        //   <defs>
        //     <linearGradient id="toExchange" x1="0" y1="0" x2="0" y2="1">
        //       <stop offset="70%" stopColor="#8884d8" stopOpacity={0.4} />
        //       <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
        //     </linearGradient>
        //   </defs>
        //   <Area
        //     type="monotone"
        //     dataKey="volumeTo"
        //     yAxisId="left-axis"
        //     stroke="#8884d8"
        //     dot={false}
        //     strokeWidth={2}
        //     name="Volume from exchanges"
        //     fillOpacity={1}
        //     fill="url(#toExchange)"
        //   />
        //   <defs>
        //     <linearGradient id="fromExchange" x1="0" y1="0" x2="0" y2="1">
        //       <stop offset="70%" stopColor="#00ff00" stopOpacity={0.1} />
        //       <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
        //     </linearGradient>
        //   </defs>
        //   <Area
        //     type="monotone"
        //     dataKey="volumeFrom"
        //     yAxisId="right-axis"
        //     stroke="#00ff00"
        //     dot={false}
        //     strokeWidth={2}
        //     name="Volume from exchanges"
        //     fillOpacity={1}
        //     fill="url(#fromExchange)"
        //   />
        // </ComposedChart>
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

export default UserHoldingsPieChart;
