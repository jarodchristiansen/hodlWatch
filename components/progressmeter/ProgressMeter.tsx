import { Colors, FontWeight, MediaQueries } from "@/styles/variables";
import { useMemo, useState } from "react";
import styled from "styled-components";

interface ProgressProps {
  progressWidth: number;
}

const ProgressMeterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;

  @media ${MediaQueries.MD} {
    padding: 32px 28px;
  }
`;

const ProgressBar = styled.div`
  width: 85%;
  height: 8px;
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 0 24px 0 8px;

  p {
    color: ${Colors.white};
    font-weight: ${FontWeight.light};
  }

  @media ${MediaQueries.MD} {
    width: 90%;
    padding: 16px 24px 16px 4px;
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 120px;

  @media ${MediaQueries.MD} {
    max-width: 150px;
  }
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
  color: ${Colors.white};
`;

const MESH_ROADMAP_STEPS = [
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
] as const;

const ProgressMeter = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const progressWidth = currentStep === 3 ? 100 : currentStep * 30 || 2;

  const BarComponent = useMemo(() => {
    return (
      <>
        <Timeline>
          {MESH_ROADMAP_STEPS.map((step, index) => {
            if (index === 0 || index === 2) {
              return <Step key={`timeline-a-${step.title}`}>{""}</Step>;
            }
            return (
              <Step key={`timeline-a-${step.title}`}>
                <StepMarker />
                <StepTitle>{step.title}</StepTitle>
                <p>{step.description}</p>
              </Step>
            );
          })}
        </Timeline>

        <ProgressBar>
          <Progress progressWidth={progressWidth} />
        </ProgressBar>
        <Timeline>
          {MESH_ROADMAP_STEPS.map((step, index) => {
            if (index === 1 || index === 3) {
              return <Step key={`timeline-b-${step.title}`}>{""}</Step>;
            }
            return (
              <Step key={`timeline-b-${step.title}`}>
                <StepMarker />
                <StepTitle>{step.title}</StepTitle>
                <p>{step.description}</p>
              </Step>
            );
          })}
        </Timeline>
      </>
    );
  }, [currentStep, progressWidth]);

  return <ProgressMeterContainer>{BarComponent}</ProgressMeterContainer>;
};

export default ProgressMeter;
