import { gql } from "@apollo/client";

export const GET_GECKO_HISTORY = gql`
  query GetAssetFinancialDetails($symbol: String!, $time: Int) {
    getAssetFinancialDetails(symbol: $symbol, time: $time) {
      time
      high
      low
      open
      volumefrom
      volumeto
      close
      conversionType
      conversionSymbol
    }
  }
`;

export const GET_ASSET_FINANCIALS = gql`
  query GetAssetFinancialDetails($symbol: String!, $time: Int) {
    getAssetFinancialDetails(symbol: $symbol, time: $time) {
      symbol
      id
      name
      price
      price_btc
      market_cap
      percent_change_24h
      percent_change_7d
      percent_change_30d
      volume_24h
      max_supply
      categories
      timeSeries {
        asset_id
        time
        open
        close
        high
        low
        volume
        market_cap
        price_score
        correlation_rank
        galaxy_score
        volatility
        alt_rank
        alt_rank_30d
        alt_rank_hour_average
        market_cap_rank
        percent_change_24h_rank
        volume_24h_rank
        price_btc
        market_cap_global
        market_dominance
        percent_change_24h
      }
    }
  }
`;
