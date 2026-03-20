import {
  BorderRadius,
  Colors,
  FontFamily,
  FontSize,
  Padding,
  Shadows,
} from "@/styles/variables";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

interface InfoCardProps {
  headerText: string;
  bodyText: string;
  renderButtons?: boolean;
}

const InfoCard = ({
  headerText,
  bodyText,
  renderButtons = false,
}: InfoCardProps) => {
  const router = useRouter();

  const routeToAuth = () => {
    router.push("/auth");
  };

  return (
    <InfoCardContainer>
      <div className="info-card-header">
        <span className="heading-text">{headerText}</span>
      </div>

      <div className="info-card-body">
        <span className="body-text">{bodyText}</span>
      </div>

      {!!renderButtons && (
        <div className="button-container">
          <button className="standardized-button" onClick={routeToAuth}>
            Sign Up
          </button>
          <button className="standardized-button" onClick={routeToAuth}>
            Sign In
          </button>
        </div>
      )}
    </InfoCardContainer>
  );
};

const InfoCardContainer = styled.div`
  border-radius: ${BorderRadius.large};
  border: 2px solid ${Colors.midGray};
  padding: ${Padding.xlarge};
  margin: ${Padding.xlarge};
  box-shadow: ${Shadows.card};
  min-width: 18rem;
  background: ${Colors.white};
  font-family: ${FontFamily.primary};

  .info-card-header {
    border-bottom: 2px solid ${Colors.midGray};
    text-align: center;
    padding: 1rem 0;
  }

  .heading-text {
    font-family: ${FontFamily.headline};
    font-size: ${FontSize.large};
    color: ${Colors.primary};
    font-weight: 700;
  }

  .info-card-body {
    text-align: center;
    padding: 1rem 0;
  }

  .body-text {
    font-size: ${FontSize.medium};
    color: ${Colors.charcoal};
    line-height: 1.5;
  }

  .button-container {
    display: flex;
    justify-content: center;
    gap: 2rem;
    padding: 1rem 0;
  }
`;

export default InfoCard;
