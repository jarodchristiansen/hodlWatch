import React from "react";
import styled from "styled-components";

const ProgressMeterContainer = styled.div`
  display: flex;
  /* align-items: center; */
  flex-direction: column;
`;

const ProgressTrack = styled.div`
  position: relative;
  width: 6px;
  height: 100%;
  background-color: #0055ff;
`;

const ProgressBar = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 3px;
  height: 100%;
  background-color: #ee0000;
`;

const StepContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const StepMarker = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #34d399;
  margin-right: 12px;
`;

const StepContent = styled.div`
  width: 50%;
  padding: 16px;
  background-color: #f3f4f6;
  border-radius: 8px;
`;

const Title = styled.h3`
  margin-top: 0;
`;

const Description = styled.p`
  margin: 8px 0;
`;

const ProgressMeter = () => {
  const steps = [
    {
      title: "Alpha release",
      description:
        "The first version of Mesh will be released to the public. This will include the ability to track your favorite assets, and view the latest news.",
      completed: false,
    },
    {
      title: "Beta release",
      description:
        "The second version of Mesh will be released to the public. This will include the ability to track your portfolio metrics, and build communities around your favorite assets",
      completed: false,
    },
    {
      title: "Alpha release",
      description:
        "The first version of Mesh will be released to the public. This will include the ability to track your favorite assets, and view the latest news.",
      completed: false,
    },
    {
      title: "Beta release",
      description:
        "The second version of Mesh will be released to the public. This will include the ability to track your portfolio metrics, and build communities around your favorite assets",
      completed: false,
    },
  ];

  const currentStep = 1;

  return (
    <ProgressMeterContainer>
      <ProgressTrack>
        <ProgressBar
          style={{ height: `${(currentStep / steps?.length || 1) * 100}%` }}
        />
      </ProgressTrack>
      {steps.map((step, index) => (
        <StepContainer key={index}>
          <StepMarker />
          <StepContent>
            <Title>{step.title}</Title>
            <Description>{step.description}</Description>
          </StepContent>
        </StepContainer>
      ))}
    </ProgressMeterContainer>
  );
};

export default ProgressMeter;
