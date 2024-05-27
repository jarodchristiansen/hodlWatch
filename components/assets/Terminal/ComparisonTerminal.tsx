import SelectChip from "@/components/commons/buttons/SelectChip";
import { processFinancialHistory } from "@/helpers/financial";
import { currencyFormat } from "@/helpers/formatters/currency";
import { GET_ASSET_HISTORY } from "@/helpers/queries/assets/getAssetFinancialDetails";
import { Colors, FontWeight, MediaQueries } from "@/styles/variables";
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

const ComparisonTerminal = ({ id }) => {
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
      let years = Math.round(parseFloat(value) * 365);

      console.log({ years });

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
    return (
      <div className="options-row">
        <Select onChange={handleComparisonEvents} id="years" defaultValue="1">
          <option value="0.083">1 month</option>
          <option value="0.5">6 months</option>
          <option value="1">1 Year</option>
          <option value="3">3 Years</option>
          <option value="5">5 Years</option>
        </Select>

        <Select
          onChange={handleComparisonEvents}
          id="industry"
          defaultValue={"Crypto"}
        >
          <option value="Crypto">Crypto</option>
          <option value="TradFI">TradFI</option>
        </Select>

        {comparisonAssetType && selectedComparisonAssets.length < 2 && (
          <AssetSearchDropdown
            type={comparisonAssetType}
            addAssetMethod={addAssetToComparison}
          />
        )}
      </div>
    );
  }, [addAssetToComparison]);

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
    if (selectedComparisonAssets.length > 1 && selectedId !== id) {
      setSelectedComparisonAssets(
        selectedComparisonAssets.filter((asset) => asset.title !== selectedId)
      );
    }
  };

  // Calculates percentage change between two assets from first day to last
  const calculatePercentageChange = (isFirstAsset = true) => {
    if (!formattedData?.closes?.length) return null;

    if (isFirstAsset) {
      let firstClose = formattedData?.closes[0]?.close;
      let lastClose =
        formattedData?.closes[formattedData?.closes?.length - 1]?.close;

      let percentageChange = ((lastClose - firstClose) / firstClose) * 100;

      return percentageChange.toFixed(2);
    } else {
      let firstClose = formattedData?.closes[0]?.secondClose;
      let lastClose =
        formattedData?.closes[formattedData?.closes?.length - 1]?.secondClose;

      let percentageChange = ((lastClose - firstClose) / firstClose) * 100;

      return percentageChange.toFixed(2);
    }
  };

  const [firstAssetChange, secondAssetChange] = useMemo(() => {
    if (!formattedData?.closes?.length) return [null, null];

    let firstAssetChange = calculatePercentageChange(true);
    let secondAssetChange = calculatePercentageChange(false);

    return [firstAssetChange, secondAssetChange];
  }, [formattedData, selectedComparisonAssets]);

  console.log({ formattedData });

  return (
    <ComparisonContainer>
      <div>{viewOptions}</div>

      <div className="chip-row">
        {selectedComparisonAssets.map((asset) => (
          <SelectChip
            key={asset.title}
            title={asset.title}
            onClick={() => removeAssetFromComparison(asset.title)}
          />
        ))}
      </div>

      <StatsContainer>
        <div>
          <h3>{id.toUpperCase()}</h3>
          <p>Percent Change over duration: {firstAssetChange}%</p>
        </div>

        <div>
          <h3>
            {selectedComparisonAssets.length > 1 &&
              selectedComparisonAssets[1]?.title?.toUpperCase()}
          </h3>
          <p>Percent Change over duration: {secondAssetChange}%</p>
        </div>
      </StatsContainer>

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
                  stopColor={Colors.accent}
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
              name={id.toUpperCase()}
            />

            <Area
              type="monotone"
              dataKey="secondClose"
              stroke="#0088FF"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorUv)"
              yAxisId="secondAsset"
              name={
                selectedComparisonAssets.length > 1 &&
                selectedComparisonAssets[1]?.title?.toUpperCase()
              }
            />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartContainer>
    </ComparisonContainer>
  );
};

const ComparisonContainer = styled.div`
  .options-row {
    display: flex;
    gap: 12px;
    padding: 0 12px;
    align-items: end;

    @media ${MediaQueries.MD} {
      padding-left: 24px;
    }
  }

  .chip-row {
    display: flex;
    padding: 12px;
    gap: 12px;
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 8px;
  max-height: 50px;
`;

export default ComparisonTerminal;
