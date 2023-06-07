import { MediaQueries } from "@/styles/variables";
import React, { useMemo, useState } from "react";
import styled from "styled-components";

interface ProgressProps {
  progressWidth: number;
}

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

const Progress = styled.div<ProgressProps>`
  height: 100%;
  background-color: #34d399;
  width: ${(props) =>
    props.progressWidth === 2 ? props.progressWidth * 5 : props.progressWidth}%;

  @media ${MediaQueries.MD} {
    width: ${(props) => props.progressWidth}%;
  }
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
  max-width: 120px;
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
      title: "Building",
      description: "MVP development, and initial funding for Mesh.",
      completed: false,
    },
    {
      title: "Alpha release",
      description: "The first version of Mesh will be released to the public.",
      completed: false,
    },
    {
      title: "Beta release",
      description: "The second version of Mesh will be released to the public",
      completed: false,
    },
    {
      title: "Main release",
      description: "The final version of Mesh will be released to the public.",
      completed: false,
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const progressWidth = currentStep === 3 ? 100 : currentStep * 30 || 2;

  const updateStep = () => {
    if (currentStep >= 3) {
      console.log({ currentStep }, "in top conditional");
      setCurrentStep(0);
    } else {
      console.log({ currentStep }, "in bottom conditional");
      setCurrentStep(currentStep + 1);
    }
  };

  const BarComponent = useMemo(() => {
    return (
      <>
        <Timeline>
          {steps.map((step, index) => {
            if (index === 0 || index === 2) {
              return <Step key={index}>{""}</Step>;
            } else {
              return (
                <Step key={index}>
                  <StepMarker />
                  <StepTitle>{step.title}</StepTitle>
                  <p>{step.description}</p>
                </Step>
              );
            }
          })}
        </Timeline>

        <ProgressBar>
          <Progress progressWidth={progressWidth} />
        </ProgressBar>
        <Timeline>
          <Timeline>
            {steps.map((step, index) => {
              if (index === 1 || index === 3) {
                return <Step key={index}>{""}</Step>;
              } else {
                return (
                  <Step key={index}>
                    <StepMarker />
                    <StepTitle>{step.title}</StepTitle>
                    <p>{step.description}</p>
                  </Step>
                );
              }
            })}
          </Timeline>
        </Timeline>
      </>
    );
  }, [currentStep]);

  return <ProgressMeterContainer>{BarComponent}</ProgressMeterContainer>;
};

export default ProgressMeter;
