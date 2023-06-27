import { Colors, FontWeight } from "@/styles/variables";
import styled from "styled-components";

const ChartContainer = ({ children }) => {
  return <ChartContainerCustom>{children}</ChartContainerCustom>;
};

const ChartContainerCustom = styled.div`
  background-color: ${Colors.lightGray};

  .label-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    align-items: center;
    gap: 12px;
    background: rgba(0, 0, 0, 0.1);

    h5 {
      padding-top: 8px;
      font-weight: ${FontWeight.bold};
    }
  }
`;

export default ChartContainer;
