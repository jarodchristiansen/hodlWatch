import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { Colors } from "../../../styles/Colors";

const InfoCard = ({ headerText, bodyText, renderButtons }) => {
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
          <CustomButton onClick={routeToAuth}>Sign Up</CustomButton>
          <CustomButton onClick={routeToAuth}>Sign In</CustomButton>
        </div>
      )}
    </InfoCardContainer>
  );
};

const CustomButton = styled.button`
  background-color: ${Colors.PrimaryButtonBackground};
  color: white;
  font-size: 22px;
  border-radius: 8px;
  padding: 0 1rem;
  border: 1px solid black;

  :hover {
    background-color: white;
    color: ${Colors.PrimaryButtonBackground};
  }
`;

const InfoCardContainer = styled.div`
  animation: "fade-in";
  border-radius: 17px;
  border: 2px solid gray;
  padding: 2rem 2rem;
  margin: 2rem;
  box-shadow: 2px 4px 8px lightgray;
  min-width: 18rem;

  .info-card-header {
    border-bottom: 2px solid lightgray;
    text-align: center;
    padding: 1rem 0;
  }

  .info-card-body {
    text-align: center;
    padding: 1rem 0;
  }

  .button-container {
    display: flex;
    justify-content: center;
    gap: 2rem;
    padding: 1rem 0;
  }
`;

export default InfoCard;
