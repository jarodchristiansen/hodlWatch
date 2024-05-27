import dynamic from "next/dynamic";
import styled from "styled-components";

const CryptoCoinsHeatmapNoSSR = dynamic(
  () =>
    import("react-ts-tradingview-widgets").then((w) => w.CryptoCoinsHeatmap),
  {
    ssr: false,
  }
);

function CryptoHeatMap() {
  return (
    <Container>
      <CryptoCoinsHeatmapNoSSR
        autosize={true}
        height={600}
        copyrightStyles={false}
      />
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

export default CryptoHeatMap;
