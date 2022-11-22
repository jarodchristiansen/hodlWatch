import { gql } from "@apollo/client";

export default gql`
  query GetDifficultyRibbons($symbol: String, $cut: Int) {
    getDifficultyRibbons(symbol: $symbol, cut: $cut) {
      t
      ma128
      ma14
      ma200
      ma25
      ma40
      ma60
      ma9
      ma90
    }
  }
`;
