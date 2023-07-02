import { FontWeight } from "@/styles/variables";
import styled from "styled-components";

const ChartContainer = ({ children }) => {
  return <ChartContainerCustom>{children}</ChartContainerCustom>;
};

const ChartContainerCustom = styled.div`
  background-color: transparent;
  position: relative;

  .label-row {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    gap: 12px;
    background: rgba(194, 191, 191, 0.1);

    h5 {
      padding-top: 8px;
      font-weight: ${FontWeight.bold};
    }
  }
`;

export default ChartContainer;
