import SelectChip from "@/components/commons/buttons/SelectChip";
import { processFinancialHistory } from "@/helpers/financial";
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

import AssetSearchDropdown from "../AssetSearchDropdown/AssetSearchDropdown";
import ChartContainer from "../Finance/Charts/Desktop/ChartContainer";

const Terminal = ({ id }) => {
  const [terminalView, setTerminvalView] = useState("");
  const [comparisonDuration, setComparisonDuration] = useState(0);
  const [selectedComparisonAssets, setSelectedComparisonAssets] = useState([
    { title: id },
  ]);
  const [comparisonAssetType, setComparisonAssetType] = useState("Crypto");

  const [getFirstAssetHistory, { data, loading, error, refetch }] =
    useLazyQuery(GET_ASSET_HISTORY);

  const [
    getSecondAssetHistory,
    {
      data: secondAssetData,
      loading: secondAssetLoading,
      error: secondAssetError,
      refetch: secondAssetRefetch,
    },
  ] = useLazyQuery(GET_ASSET_HISTORY);

  useEffect(() => {
    if (comparisonDuration) {
      getFirstAssetHistory({
        variables: {
          symbol: id || "BTC",
          time: comparisonDuration,
        },
      });

      if (selectedComparisonAssets.length > 1) {
        getSecondAssetHistory({
          variables: {
            symbol: selectedComparisonAssets[1].title,
            time: comparisonDuration,
          },
        });
      }
    }
  }, [comparisonDuration, selectedComparisonAssets]);

  const handleComparisonEvents = (e) => {
    const value = e.target.value;
    const id = e.target.id;

    if (id === "years") {
      let years = parseInt(value) * 365;

      setComparisonDuration(years);
    } else if (id === "industry") {
      setComparisonAssetType(value);
    }
  };

  const addAssetToComparison = (selectedId) => {
    console.log("add", { selectedId });

    if (selectedComparisonAssets.length < 2) {
      setSelectedComparisonAssets([
        ...selectedComparisonAssets,
        { title: selectedId },
      ]);
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
            defaultValue={"Crypto"}
          >
            <option value="Crypto">Crypto</option>
            <option value="TradFI">TradFI</option>
          </select>

          {comparisonAssetType && selectedComparisonAssets.length < 2 && (
            <AssetSearchDropdown
              type={comparisonAssetType}
              addAssetMethod={addAssetToComparison}
            />
          )}

          {/* <label htmlFor="asset-search">Test</label>
          <input
            type="text"
            id="asset-search"
            onChange={handleComparisonEvents}
          /> */}
        </>
      );
    }
  }, [terminalView, addAssetToComparison]);

  // Handles processing data for comparison chart, may need abstraction
  const formattedData = useMemo(() => {
    if (
      !data?.getAssetHistory?.priceData?.length ||
      !selectedComparisonAssets.length
    )
      return null;

    let filteredData = processFinancialHistory(data?.getAssetHistory.priceData);

    if (
      !secondAssetData?.getAssetHistory?.priceData?.length ||
      selectedComparisonAssets.length < 2
    ) {
      return filteredData;
    }

    let secondFilteredData = processFinancialHistory(
      secondAssetData.getAssetHistory.priceData
    );

    for (let i = 0; i < filteredData.closes.length; i++) {
      filteredData.closes[i].secondClose =
        secondFilteredData.closes[i]?.close || 0;
    }

    return filteredData;
  }, [data, secondAssetData, selectedComparisonAssets]);

  const removeAssetFromComparison = (selectedId) => {
    console.log("remove", { selectedId });

    if (selectedComparisonAssets.length > 1 && selectedId !== id) {
      setSelectedComparisonAssets(
        selectedComparisonAssets.filter((asset) => asset.title !== selectedId)
      );
    }
  };

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

      {terminalView === "comparison" && (
        <div className="options-row">
          {selectedComparisonAssets.map((asset) => (
            <SelectChip
              key={asset.title}
              title={asset.title}
              onClick={() => removeAssetFromComparison(asset.title)}
            />
          ))}
        </div>
      )}

      <h3>{terminalView.toUpperCase()}</h3>

      <ChartContainer name="price-comparison-chart">
        <ResponsiveContainer width="100%" height={500}>
          <ComposedChart data={formattedData?.closes}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />

            <YAxis
              dataKey="close"
              domain={["auto", "auto"]}
              allowDataOverflow={true}
              width={0}
              yAxisId="firstAsset"
            />

            <YAxis
              dataKey="secondClose"
              domain={["auto", "auto"]}
              allowDataOverflow={true}
              width={0}
              yAxisId="secondAsset"
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
              yAxisId="firstAsset"
            />

            <Area
              type="monotone"
              dataKey="secondClose"
              stroke="#0088FF"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorUv)"
              yAxisId="secondAsset"
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
  background-color: white;

  .mode-row {
    display: flex;
  }

  .options-row {
    display: flex;
  }
`;

export default Terminal;
