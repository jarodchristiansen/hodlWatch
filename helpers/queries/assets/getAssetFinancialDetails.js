import { gql } from "@apollo/client";

export const GET_BTC_MACROS = gql`
  query GetBtcMacros($symbol: String!) {
    getBTCMacros(symbol: $symbol) {
      macro_data {
        time
        high
        low
        open
        volumefrom
        volumeto
        close
        totalvolume
        VWAP
        TWAP
        returns
        rolling_sharpe
      }
    }
  }
`;

export const GET_ASSET_PAIRS_24_HOURS = gql`
  query GetAssetPairs24Hours($symbol: String!) {
    getAssetPairs(symbol: $symbol) {
      pairData {
        SYMBOL
        SUPPLY
        MKTCAPPENALTY
        FULLNAME
        NAME
        ID
        VOLUME24HOURTO
      }
    }
  }
`;

export const GET_ASSET_HISTORY = gql`
  query GetAssetHistory($symbol: String!, $time: Int) {
    getAssetHistory(symbol: $symbol, time: $time) {
      priceData {
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
      blockchainData {
        symbol
        time
        zero_balance_addresses_all_time
        unique_addresses_all_time
        new_addresses
        active_addresses
        transaction_count
        transaction_count_all_time
        large_transaction_count
        average_transaction_value
        block_height
        hashrate
        difficulty
        block_time
        block_size
        current_supply
      }
    }
  }
`;

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
