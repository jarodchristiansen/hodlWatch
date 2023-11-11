// financialMacroTypes.js
import { gql } from "apollo-server-micro";

export const financialMacroTypeDefs = gql`
  type BTCMacros {
    macro_data: [MacroData]
  }

  type MacroData {
    time: Float
    high: Float
    low: Float
    open: Float
    volumefrom: Float
    volumeto: Float
    close: Float
    totalvolume: Float
    VWAP: Float
    TWAP: Float
    norm_returns: Float
    returns: Float
    rolling_sharpe: Float
  }

  type DifficultyRibbonData {
    t: Float
    ma128: Float
    ma14: Float
    ma2FloatFloat: Float
    ma25: Float
    ma4Float: Float
    ma6Float: Float
    ma9: Float
    ma9Float: Float
  }
`;
