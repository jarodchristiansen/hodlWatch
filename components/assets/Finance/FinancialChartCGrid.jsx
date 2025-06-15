import { processFinancialHistory } from "@/helpers/financial";
import { Colors, MediaQueries } from "@/styles/variables";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";

import {
  chartCardStyleOverrides,
  defaultChartCardStyle,
} from "./chartCardStyleConfig";
import { chartConfig } from "./chartConfig";

const FinancialChartGrid = ({ financialData, id, time }) => {
  const [processedFinancialData, setProcessedFinancialData] = useState([]);
  // Use chartConfig to set initial selected charts
  const defaultSelected = Object.fromEntries(
    chartConfig.map((c) => [c.key, !!c.showByDefault])
  );
  const [selectedCharts, setSelectedCharts] = useState(defaultSelected);

  useEffect(() => {
    if (financialData) {
      processFinancialData(financialData);
    }
  }, [financialData]);

  const processFinancialData = (financialData) => {
    const filteredData = processFinancialHistory(financialData);
    setProcessedFinancialData(filteredData);
  };

  const handleChartSelect = (key) => {
    setSelectedCharts((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Use chartConfig for options
  const chartOptions = chartConfig.map(({ key, label }) => ({ key, label }));

  // Render charts dynamically from config
  const renderCharts = () => {
    return chartConfig
      .filter((c) => selectedCharts[c.key])
      .map((c, idx) => {
        const ChartComponent = c.component;
        const chartData = c.dataSelector(processedFinancialData);
        if (!chartData || (Array.isArray(chartData) && !chartData.length))
          return null;
        const styleOverride = chartCardStyleOverrides[c.key] || {};
        return (
          <ChartCard key={c.key} $styleOverride={styleOverride}>
            <ChartHeader>
              {c.icon && (
                <Image
                  src={c.icon}
                  alt={c.label + " icon"}
                  width={28}
                  height={28}
                />
              )}
              <h5 style={c.headerStyle}>{c.header}</h5>
            </ChartHeader>
            {c.description && (
              <ChartDescription>{c.description}</ChartDescription>
            )}
            <ChartComponent data={chartData} />
          </ChartCard>
        );
      });
  };

  return (
    <div style={{ overflowX: "hidden", width: "100%" }}>
      <HorizontalSelectorBar>
        {chartOptions.map((option) => (
          <SelectorButton
            key={option.key}
            active={selectedCharts[option.key]}
            onClick={() => handleChartSelect(option.key)}
          >
            {option.label}
          </SelectorButton>
        ))}
      </HorizontalSelectorBar>
      <GridContainer>{renderCharts()}</GridContainer>
    </div>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 32px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 0;
  min-width: 0;
  box-sizing: border-box;
  overflow-x: hidden;
  max-width: 100%;
`;

const ChartCard = styled.div.attrs((props) => ({
  style: props.$styleOverride || {},
}))`
  display: flex;
  flex-direction: column;
  text-align: center;
  min-width: 0;
  max-width: 100%;
  box-sizing: border-box;
  flex-shrink: 1;
  background: ${({ $styleOverride }) =>
    $styleOverride?.background || defaultChartCardStyle.background};
  border: ${({ $styleOverride }) =>
    $styleOverride?.border || defaultChartCardStyle.border};
  border-radius: ${({ $styleOverride }) =>
    $styleOverride?.borderRadius || defaultChartCardStyle.borderRadius};
  box-shadow: ${({ $styleOverride }) =>
    $styleOverride?.boxShadow || defaultChartCardStyle.boxShadow};
  padding: ${({ $styleOverride }) =>
    $styleOverride?.padding || defaultChartCardStyle.padding};
  color: ${({ $styleOverride }) =>
    $styleOverride?.color || defaultChartCardStyle.color};
  transition: ${defaultChartCardStyle.transition};
  &:hover {
    box-shadow: 0 8px 32px 0 rgba(80, 80, 120, 0.18);
    transform: translateY(-2px) scale(1.015);
  }
`;

const HorizontalSelectorBar = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 0.5rem;
  padding: 1rem 0.5rem 1.5rem 0.5rem;
  background: none;
  scrollbar-width: thin;
  scrollbar-color: ${Colors.primary} ${Colors.charcoal};
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  @media ${MediaQueries.MD} {
    width: 100%;
  }
  &::-webkit-scrollbar {
    height: 6px;
    background: ${Colors.charcoal};
  }
  &::-webkit-scrollbar-thumb {
    background: ${Colors.primary};
    border-radius: 4px;
  }
`;

const SelectorButton = styled.button`
  background: ${({ active }) => (active ? Colors.primary : Colors.charcoal)};
  color: ${Colors.white};
  border: 1.5px solid ${Colors.primary};
  border-radius: 8px;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  min-width: 0;
  flex-shrink: 1;
  box-sizing: border-box;
  &:hover,
  &:focus {
    background: ${Colors.accent};
    color: ${Colors.charcoal};
  }
`;

const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 0.5rem;
  h5 {
    font-size: 1.18rem;
    font-weight: 700;
    margin: 0;
    letter-spacing: 0.01em;
    line-height: 1.2;
  }
  img {
    width: 28px;
    height: 28px;
    vertical-align: middle;
  }
`;
const ChartDescription = styled.div`
  color: #bfc4d0;
  font-size: 0.98rem;
  margin-bottom: 0.5rem;
  text-align: center;
  min-height: 24px;
`;

export default FinancialChartGrid;
