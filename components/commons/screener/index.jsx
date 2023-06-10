import { MediaQueries } from "@/styles/variables";
import { TradingViewEmbed, widgetType } from "react-tradingview-embed";
import styled from "styled-components";

const PriceScreener = () => {
  return (
    <ScreenerContainer>
      <TradingViewEmbed
        widgetType={widgetType.TICKER_TAPE}
        widgetConfig={{
          showSymbolLogo: true,
          isTransparent: false,
          displayMode: "adaptive",
          colorTheme: "dark",
          autosize: true,
          symbols: [
            {
              proName: "BITSTAMP:BTCUSD",
              title: "BTC/USD",
            },
            {
              proName: "BITSTAMP:ETHUSD",
              title: "ETH/USD",
            },
            {
              proName: "BINANCE:BNBUSDT",
              title: "BNB/USDT",
            },
            {
              proName: "BITSTAMP:XRPUSD",
              title: "XRP/USD",
            },
            {
              proName: "BITSTAMP:ADAUSD",
              title: "ADA/USD",
            },
            {
              proName: "BINANCE:DOGEUSDT",
              title: "DOGE/USDT",
            },
            {
              proName: "COINBASE:MATICUSD",
              title: "MATIC/USDT",
            },
            {
              proName: "COINBASE:DOTUSD",
              title: "DOT/USD",
            },
            {
              proName: "COINBASE:SOLUSD",
              title: "SOL/USDT",
            },
          ],
        }}
      />
    </ScreenerContainer>
  );
};

const ScreenerContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 4.5rem;

  @media ${MediaQueries.MD} {
    height: 3rem;
  }
`;

export default PriceScreener;
