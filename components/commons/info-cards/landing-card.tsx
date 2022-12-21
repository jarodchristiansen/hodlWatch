import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

interface LandingCardProps {
  headerText: string;
  header2Text: string;
  bodyText: string;
  renderSignIn: boolean;
  renderLearnMore: boolean;
}

const LandingCard = ({
  headerText,
  header2Text,
  bodyText,
  renderSignIn = false,
  renderLearnMore = false,
}: LandingCardProps) => {
  const router = useRouter();

  const routeToAuth = (string) => {
    router.push(`/auth?path=${string}`);
  };

  const routeToEducation = () => {
    router.push("/education");
  };

  return (
    <InfoCardContainer>
      <div className="info-card-header">
        <h2 className="heading-text">{headerText}</h2>
        <h2 className="subheading-text">{header2Text}</h2>
      </div>

      <div className="info-card-body">
        <span className="body-text">{bodyText}</span>
      </div>

      {!!renderSignIn && (
        <div className="button-container">
          <button
            className="secondary-button"
            onClick={() => routeToAuth("SignUp")}
          >
            Sign Up
          </button>
          <button
            className="standardized-button"
            onClick={() => routeToAuth("SignIn")}
          >
            Sign In
          </button>
        </div>
      )}

      {!!renderLearnMore && (
        <div className="button-container">
          <button
            className="standardized-button"
            onClick={() => routeToEducation()}
          >
            Our Story
          </button>
          <button
            className="secondary-button"
            onClick={() => routeToEducation()}
          >
            Web3
          </button>
        </div>
      )}
    </InfoCardContainer>
  );
};

const InfoCardContainer = styled.div`
  animation: "fade-in";
  padding: 2rem 2rem;
  margin: 2rem;
  min-width: 18rem;

  .info-card-header {
    text-align: center;
    padding: 1rem 0;

    .heading-text {
      font-size: 48px;
      padding-bottom: 1rem;
    }
  }

  .info-card-body {
    text-align: center;
    padding: 1rem 0;

    .body-text {
      font-size: 20px;
      color: gray;
    }
  }

  .button-container {
    display: flex;
    justify-content: center;
    gap: 2rem;
    padding: 1rem 0;
  }
`;

export default LandingCard;
