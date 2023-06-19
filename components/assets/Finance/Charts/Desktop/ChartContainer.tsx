import styled from "styled-components";

const ChartContainer = ({ children }) => {
  return <ChartContainerCustom>{children}</ChartContainerCustom>;
};

const ChartContainerCustom = styled.div`
  .label-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
    align-items: center;
    gap: 12px;

    h5 {
      padding-top: 8px;
    }
  }
`;

export default ChartContainer;
