import { Colors } from "@/styles/variables";
import styled from "styled-components";

interface UnderlineProps {
  selected: boolean;
}

const TimeSwitcher = ({ showNDays, onChange }: any) => {
  return (
    <TimeSwitcherWrapper>
      <TimeOption
        className={showNDays === 14 && "selected"}
        onClick={() => onChange(14)}
      >
        14 days
      </TimeOption>
      <TimeOption
        className={showNDays === 30 && "selected"}
        onClick={() => onChange(30)}
      >
        30 days
      </TimeOption>
      <TimeOption
        className={showNDays === 90 && "selected"}
        onClick={() => onChange(90)}
      >
        3 months
      </TimeOption>
      <TimeOption
        className={showNDays === 180 && "selected"}
        onClick={() => onChange(180)}
      >
        6 months
      </TimeOption>
      <TimeOption
        className={showNDays === 365 && "selected"}
        onClick={() => onChange(365)}
      >
        1 year
      </TimeOption>
    </TimeSwitcherWrapper>
  );
};

export default TimeSwitcher;

const TimeSwitcherWrapper = styled.div`
  position: relative;
  display: flex;
  /* background-color: #f2f2f2; */
  background-color: black;
  color: white;
  /* max-width: 380px; */
  border-radius: 12px;
  justify-content: space-evenly;
`;

const TimeOption = styled.span`
  position: relative;
  padding: 10px 10px;
  background-color: transparent;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: color 0.3s ease;
  color: white;
  min-width: 65px;

  &:hover {
    background-color: #575656;
  }

  &.selected {
    color: ${Colors.black};
    background-color: white;
    border: 1px solid white;
  }
`;

const Underline = styled.div<UnderlineProps>`
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: ${Colors.accent};
  transform: scaleX(${(props) => (props.selected ? 0.5 : 0.5)});
  transform-origin: ${(props) => (props.selected ? "left" : "right")};
  transition: transform 5.3s ease;
`;
