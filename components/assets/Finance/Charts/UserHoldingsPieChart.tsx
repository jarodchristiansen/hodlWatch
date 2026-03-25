import { currencyFormat } from "@/helpers/formatters/currency";
import React, { useMemo } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import styled from "styled-components";

interface UserHoldingsPieChartProps {
  data: BalanceObjects[];
  sum: number;
}

interface BalanceObjects {
  balance: number;
  relative_value: number;
  symbol: string;
  ticker: string;
  usd: number;
  __typename: string;
}

function HoldingsTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: BalanceObjects;
  }>;
}) {
  if (active && payload?.length) {
    const p = payload[0];
    return (
      <div
        className="custom-tooltip"
        style={{
          backgroundColor: "#ffff",
          padding: "5px",
          border: "1px solid #cccc",
        }}
      >
        <span>{`${p.name} : ${p.value.toFixed(2)}% : $${(
          p.payload.usd * p.payload.balance
        ).toFixed(2)}`}</span>
      </div>
    );
  }
  return null;
}

/**
 *
 * @param data: User holding data
 * @param sum: total user holdings combined
 * @returns UserHoldingsPieChart shows associated holdings of users connected exchange account
 */
const UserHoldingsPieChart = ({ data, sum }: UserHoldingsPieChartProps) => {
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

  const formattedData = useMemo(() => {
    if (!data.length) return [];

    const dataCopy = [...data];
    dataCopy.sort((a, b) => a.relative_value - b.relative_value);
    return dataCopy;
  }, [data]);

  return (
    <ChartContainer>
      <div>
        <h1>User Holdings Percentages</h1>

        <span className="total-span">Total - {currencyFormat(sum)}</span>
      </div>

      {!!formattedData.length && (
        <ResponsiveContainer width="95%" height={600}>
          <PieChart>
            <Pie
              data={formattedData}
              color="#000000"
              dataKey="relative_value"
              nameKey="symbol"
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              fill="#8884d8"
            >
              {formattedData.map((entry, index) => (
                <Cell
                  key={`${entry.symbol}-${entry.ticker}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={HoldingsTooltip} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
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
  text-align: center;

  h1,
  .total-span {
    font-weight: bold;
  }
`;

export default UserHoldingsPieChart;
