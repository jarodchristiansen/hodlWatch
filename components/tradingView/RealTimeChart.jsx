import dynamic from "next/dynamic";
import styled from "styled-components";

const AdvancedRealTimeChartSSR = dynamic(
  () =>
    import("react-ts-tradingview-widgets").then((w) => w.AdvancedRealTimeChart),
  {
    ssr: false,
  }
);

function RealTimeChartWidget() {
  return (
    <Container>
      <AdvancedRealTimeChartSSR autosize={true} height={600} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px 0;
  min-height: 500px;
`;

export default RealTimeChartWidget;
