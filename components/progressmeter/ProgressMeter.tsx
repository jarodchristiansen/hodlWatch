import React from "react";
import styled from "styled-components";

const ProgressMeterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProgressBar = styled.div`
  width: 85%;
  height: 6px;
  background-color: #e5e7eb;
`;

const Progress = styled.div`
  height: 100%;
  background-color: #34d399;
`;

const Timeline = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  /* align-items: flex-start; */
  margin-top: 20px;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 80px;
`;

const StepMarker = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #34d399;
  margin-bottom: 8px;
`;

const StepTitle = styled.h4`
  margin: 0;
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

  const currentStep = 3;
  const progressWidth = currentStep * 25;
  return (
    <ProgressMeterContainer>
      <ProgressBar>
        <Progress style={{ width: `${progressWidth}%` }} />
      </ProgressBar>
      <Timeline>
        {steps.map((step, index) => (
          <Step key={index}>
            <StepMarker />
            <StepTitle>{step.title}</StepTitle>
          </Step>
        ))}
      </Timeline>
    </ProgressMeterContainer>
  );
};

export default ProgressMeter;
