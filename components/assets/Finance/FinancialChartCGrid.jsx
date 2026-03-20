import { processFinancialHistory } from "@/helpers/financial";
import { BorderRadius, Colors, FontFamily, MediaQueries, Surfaces } from "@/styles/variables";
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
  const [mode, setMode] = useState("overview");
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (financialData) {
      processFinancialData(financialData);
    }
  }, [financialData]);

  const processFinancialData = (financialData) => {
    const filteredData = processFinancialHistory(financialData);
    setProcessedFinancialData(filteredData);
  };

  const MODE_PRESETS = {
    overview: {
      primary: ["fibonacci", "ema", "macd", "bollinger"],
      secondary: ["volume", "rsi"],
      label: "Overview",
      description: "Key trend + momentum signals at a glance.",
    },
    momentum: {
      primary: ["macd", "rsi", "stochastic"],
      secondary: ["obv", "adx", "volume"],
      label: "Momentum",
      description: "Momentum & reversal signals for timing.",
    },
    risk: {
      primary: ["bollinger", "atr", "sharpe"],
      secondary: ["volume", "adx"],
      label: "Risk",
      description: "Volatility and risk-adjusted context.",
    },
    onchain: {
      primary: ["nupl"],
      secondary: ["volume", "obv"],
      label: "On-chain",
      description: "On-chain sentiment and participation proxies (where available).",
    },
  };

  const currentPreset = MODE_PRESETS[mode] || MODE_PRESETS.overview;
  const selectedKeys = new Set([
    ...(currentPreset.primary || []),
    ...(showMore ? currentPreset.secondary || [] : []),
  ]);

  // Render charts dynamically from config
  const renderCharts = () => {
    return chartConfig
      .filter((c) => selectedKeys.has(c.key))
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
      <DashboardTopBar>
        <div className="left">
          <ModeTabs role="tablist" aria-label="Dashboard modes">
            {Object.entries(MODE_PRESETS).map(([key, cfg]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={mode === key}
                className={mode === key ? "active" : ""}
                onClick={() => setMode(key)}
              >
                {cfg.label}
              </button>
            ))}
          </ModeTabs>
          <ModeHint>
            <span className="title">{currentPreset.label}</span>
            <span className="desc">{currentPreset.description}</span>
          </ModeHint>
        </div>

        <DepthToggle role="group" aria-label="Detail level">
          <button
            type="button"
            className={!showMore ? "active" : ""}
            onClick={() => setShowMore(false)}
          >
            Essentials
          </button>
          <button
            type="button"
            className={showMore ? "active" : ""}
            onClick={() => setShowMore(true)}
          >
            Deep dive
          </button>
        </DepthToggle>
      </DashboardTopBar>
      <GridContainer>{renderCharts()}</GridContainer>
    </div>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 0;
  min-width: 0;
  box-sizing: border-box;
  overflow-x: hidden;
  max-width: 100%;
`;

const DashboardTopBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 0 8px 0;

  .left {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  @media ${MediaQueries.MD} {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    gap: 18px;

    .left {
      max-width: 820px;
    }
  }
`;

const ModeTabs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  button {
    height: 40px;
    padding: 0 14px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(0, 0, 0, 0.18);
    color: rgba(255, 255, 255, 0.88);
    font-family: ${FontFamily.primary};
    font-weight: 900;
    cursor: pointer;
    transition: background 0.15s ease, transform 0.15s ease, color 0.15s ease;

    &:hover {
      background: rgba(245, 230, 179, 0.14);
      transform: translateY(-1px);
      color: ${Colors.white};
    }

    &.active {
      background: ${Colors.accent};
      color: ${Colors.charcoal};
      border-color: rgba(212, 168, 75, 0.65);
    }

    &:focus-visible {
      outline: 2px solid ${Colors.accent};
      outline-offset: 2px;
    }
  }
`;

const ModeHint = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 12px;
  border-radius: ${BorderRadius.large};
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.14);

  .title {
    font-weight: 900;
    letter-spacing: 0.01em;
    color: ${Colors.white};
  }
  .desc {
    color: rgba(255, 255, 255, 0.78);
    line-height: 1.4;
    font-size: 0.95rem;
  }
`;

const DepthToggle = styled.div`
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(0, 0, 0, 0.18);

  button {
    height: 40px;
    padding: 0 14px;
    border: none;
    background: transparent;
    color: rgba(255, 255, 255, 0.86);
    font-family: ${FontFamily.primary};
    font-weight: 900;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease;

    &.active {
      background: rgba(245, 230, 179, 0.14);
      color: ${Colors.white};
    }

    &:focus-visible {
      outline: 2px solid ${Colors.accent};
      outline-offset: -2px;
    }
  }
`;

const ChartCard = styled.div.attrs((props) => ({
  style: props.$styleOverride || {},
}))`
  display: flex;
  flex-direction: column;
  text-align: left;
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

const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  justify-content: flex-start;
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
  text-align: left;
  min-height: 24px;
`;

export default FinancialChartGrid;
