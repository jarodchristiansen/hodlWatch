import React from "react";
import styled from "styled-components";

const InfoCard = ({ headerText, bodyText }) => {
  return (
    <InfoCardContainer>
      <div className="info-card-header">
        <span className="heading-text">{headerText}</span>
      </div>

      <div className="info-card-body">
        <span className="body-text">{bodyText}</span>
      </div>
    </InfoCardContainer>
  );
};

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
`;

export default InfoCard;
