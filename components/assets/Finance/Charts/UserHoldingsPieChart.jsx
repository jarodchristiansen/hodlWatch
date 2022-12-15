import { Tooltip, PieChart, Pie, Cell, Legend } from "recharts";
import React from "react";
import styled from "styled-components";

const UserHoldingsPieChart = ({ data }) => {
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

  const CustomToolTip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#ffff",
            padding: "5px",
            border: "1px solid #cccc",
          }}
        >
          <label>{`${payload[0].name} : ${payload[0].value.toFixed(
            2
          )}%`}</label>
        </div>
      );
    }
  };

  return (
    <ChartContainer>
      <div className={"flex flex-row"}>
        <h1>User Holdings Percentages</h1>
      </div>

      {data && (
        <PieChart width={730} height={600}>
          <Pie
            data={data}
            color="#000000"
            dataKey="relative_value"
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
          <Tooltip content={CustomToolTip} />
          <Legend />
        </PieChart>
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
