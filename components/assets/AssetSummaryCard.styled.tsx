import { BorderRadius, Colors, FontFamily, FontWeight, MediaQueries, Surfaces } from "@/styles/variables";
import styled from "styled-components";

export const HeaderCard = styled.section`
  width: 95%;
  margin: 16px auto 0 auto;
  padding: 14px 14px 12px 14px;
  background: ${Surfaces.cardDark};
  border-radius: ${BorderRadius.xlarge};
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.18);
  color: ${Colors.white};

  @media ${MediaQueries.MD} {
    padding: 18px 18px 14px 18px;
    margin-top: 24px;
  }
`;

export const TopRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: flex-start;
  justify-content: space-between;

  @media ${MediaQueries.MD} {
    flex-direction: row;
    align-items: center;
    gap: 18px;
  }
`;

export const Identity = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  min-width: 0;
`;

export const IconWell = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    ${Surfaces.imageWellFrom} 60%,
    ${Surfaces.imageWellTo} 100%
  );
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;

  .asset-image {
    width: 44px;
    height: 44px;
    border-radius: 999px;
    object-fit: cover;
    border: 2px solid rgba(212, 168, 75, 0.55);
    background: ${Surfaces.cardPanelStrong};
  }
`;

export const FallbackMonogram = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${FontFamily.headline};
  font-weight: 900;
  color: ${Colors.charcoal};
  background: ${Colors.accent};
  letter-spacing: 0.02em;
`;

export const TitleBlock = styled.div`
  min-width: 0;
  h2 {
    margin: 0;
    font-family: ${FontFamily.headline};
    font-size: 1.4rem;
    font-weight: 900;
    letter-spacing: 0.01em;
    line-height: 1.15;
  }

  .meta {
    margin-top: 4px;
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
  }

  .ticker {
    font-weight: 900;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${Colors.textMutedOnDark};
    font-size: 0.92rem;
  }

  .rank {
    font-size: 0.92rem;
    font-weight: 800;
    padding: 6px 10px;
    border-radius: 999px;
    background: ${Surfaces.cardPanel};
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.88);
  }
`;

export const PrimaryMetric = styled.div`
  width: 100%;
  border-radius: ${BorderRadius.large};
  background: ${Surfaces.cardPanelStrong};
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 12px 12px;

  @media ${MediaQueries.MD} {
    width: auto;
    min-width: 320px;
  }

  .label {
    font-size: 0.78rem;
    font-weight: 900;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.65);
  }

  .value-row {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    margin-top: 6px;
  }

  .value {
    font-size: 1.35rem;
    font-weight: 900;
    letter-spacing: 0.01em;
    color: ${Colors.white};
    white-space: nowrap;
  }

  .sub {
    margin-top: 6px;
    font-size: 0.92rem;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 700;
  }
`;

export const ChangePill = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  padding: 0 12px;
  border-radius: 999px;
  font-weight: 900;
  letter-spacing: 0.01em;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(0, 0, 0, 0.18);
  color: rgba(255, 255, 255, 0.9);
  white-space: nowrap;

  &.pos {
    background: rgba(20, 209, 20, 0.12);
    border-color: rgba(20, 209, 20, 0.28);
    color: #9bff9b;
  }
  &.neg {
    background: rgba(231, 76, 60, 0.12);
    border-color: rgba(231, 76, 60, 0.28);
    color: #ffb3aa;
  }
`;

export const Divider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 14px 0 12px 0;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px 12px;

  @media (min-width: 520px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  @media ${MediaQueries.MD} {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  border-radius: ${BorderRadius.medium};
  padding: 10px 10px;
  background: ${Surfaces.cardPanel};
  border: 1px solid rgba(255, 255, 255, 0.06);

  &.span-2 {
    grid-column: span 2;
  }

  .stat-label {
    font-size: 0.78rem;
    font-weight: 900;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.6);
  }

  .stat-value {
    font-size: 1.02rem;
    font-weight: ${FontWeight.bold};
    color: rgba(255, 255, 255, 0.92);
    display: flex;
    gap: 8px;
    align-items: baseline;
    flex-wrap: wrap;
    min-width: 0;
  }

  .sep {
    opacity: 0.6;
  }

  .positive {
    color: #9bff9b;
    font-weight: ${FontWeight.bold};
  }
  .negative {
    color: #ffb3aa;
    font-weight: ${FontWeight.bold};
  }
`;
