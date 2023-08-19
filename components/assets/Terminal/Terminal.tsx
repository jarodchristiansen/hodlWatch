import { currencyFormat } from "@/helpers/formatters/currency";
import { GET_ASSET_HISTORY } from "@/helpers/queries/assets/getAssetFinancialDetails";
import { Colors, FontWeight } from "@/styles/variables";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
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
import styled from "styled-components";

import { processFinancialHistory } from "@/helpers/financial";
import ChartContainer from "../Finance/Charts/Desktop/ChartContainer";

const Terminal = ({ id }) => {
  const [terminalView, setTerminvalView] = useState("");
  const [comparisonDuration, setComparisonDuration] = useState(0);

  const [getFirstAssetHistory, { data, loading, error, refetch }] =
    useLazyQuery(GET_ASSET_HISTORY);

  useEffect(() => {
    if (comparisonDuration) {
      getFirstAssetHistory({
        variables: {
          symbol: id || "BTC",
          time: comparisonDuration,
        },
      });
    }
  }, [comparisonDuration]);

  const handleComparisonEvents = (e) => {
    const value = e.target.value;
    const id = e.target.id;

    if (id === "years") {
      let years = parseInt(value) * 365;

      setComparisonDuration(years);
    }
  };

  const viewOptions = useMemo(() => {
    if (terminalView === "comparison") {
      return (
        <>
          <select onChange={handleComparisonEvents} id="years" defaultValue="1">
            <option value="1">1 Year</option>
            <option value="3">3 Years</option>
            <option value="5">5 Years</option>
          </select>

          <select
            onChange={handleComparisonEvents}
            id="industry"
            defaultValue={"TradFI"}
          >
            <option value="TradFI">TradFI</option>
            <option value="Crypto">Crypto</option>
          </select>

          <label htmlFor="asset-search">Test</label>
          <input
            type="text"
            id="asset-search"
            onChange={handleComparisonEvents}
          />
        </>
      );
    }
  }, [terminalView]);

  const formattedData = useMemo(() => {
    if (!data?.getAssetHistory?.priceData?.length) return null;
    let filteredData = processFinancialHistory(data?.getAssetHistory.priceData);

    return filteredData;
  }, [data]);

  console.log({ data, formattedData });

  return (
    <TerminalContainer>
      <div className="mode-row">
        <button onClick={() => setTerminvalView("comparison")}>
          Asset Comparison
        </button>
        <button>Apply Indicator</button>
        <button>Apply News</button>
      </div>

      <div className="options-row">{viewOptions}</div>

      <h2>{terminalView.toUpperCase()}</h2>

      <ChartContainer name="price-comparison-chart">
        <ResponsiveContainer width="100%" height={500}>
          <ComposedChart data={formattedData?.closes}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />

            <YAxis
              dataKey="close"
              domain={["auto", "auto"]}
              allowDataOverflow={true}
              width={0}
            />
            <XAxis
              dataKey="time"
              interval={"preserveStartEnd"}
              tick={{ fontWeight: FontWeight.bold }}
            />

            <Tooltip formatter={(value) => currencyFormat(value)} />
            <Line
              type="monotone"
              dataKey="min"
              stroke="#b30000"
              dot={false}
              strokeWidth={2}
            />

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
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartContainer>
    </TerminalContainer>
  );
};

const TerminalContainer = styled.div`
  display: flex;
  flex-direction: column;

  .mode-row {
    display: flex;
  }

  .options-row {
    display: flex;
    color: white;
  }
`;

export default Terminal;
