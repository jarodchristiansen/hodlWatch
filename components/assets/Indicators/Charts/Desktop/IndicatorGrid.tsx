import { buildIndicatorChartSlots } from "@/components/assets/Indicators/buildIndicatorChartSlots";
import type { IndicatorAccordionProps } from "@/components/assets/Indicators/indicatorTypes";
import { Colors, MediaQueries } from "@/styles/variables";
import { useMemo } from "react";
import styled from "styled-components";

const IndicatorGrid = ({
  timeQuery: _timeQuery = 90,
  id: _id,
  blockchainData,
}: IndicatorAccordionProps) => {
  const chartSlots = useMemo(() => {
    if (!blockchainData?.length) return [];
    return buildIndicatorChartSlots(blockchainData);
  }, [blockchainData]);

  return (
    <GridContainer>
      {chartSlots.map((slot) => (
        <ChartCard key={slot.id}>{slot.node}</ChartCard>
      ))}
    </GridContainer>
  );
};

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: auto;
  grid-gap: 24px;
  width: 100%;
  padding: 24px 0;

  @media ${MediaQueries.MD} {
    padding: 24px 0;
    grid-template-columns: repeat(auto-fit, minmax(800px, 1fr));
  }
`;

const ChartCard = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  border: 1px solid black;
  border-radius: 10px;
  background-color: ${Colors.black};

  .label-row {
    color: white;
    padding: 24px;
    background-color: ${Colors.primary};
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
`;

export default IndicatorGrid;
