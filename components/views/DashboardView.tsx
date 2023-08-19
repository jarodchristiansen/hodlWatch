import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse/lib";
import remarkRehype from "remark-rehype/lib";
import styled from "styled-components";

import BitcoinMacrosContainer from "../assets/BitcoinMacros/BitcoinMacrosContainer";
import FinancialChartGrid from "../assets/Finance/FinancialChartCGrid";
import PairDetailsRow from "../assets/Finance/PairDetails";
import IndicatorGrid from "../assets/Indicators/Charts/Desktop/IndicatorGrid";

const DashboardView = ({
  timeQuery,
  data,
  isBtcOrEth,
  isBtc,
  GeckoDetails,
  id,
  MacroData,
  loading,
}) => {
  return (
    <div>
      {id && (
        <PairRowContainer>
          <PairDetailsRow id={id} />
        </PairRowContainer>
      )}

      <FinancialChartGrid
        financialData={
          data?.getAssetHistory?.priceData
            ? data?.getAssetHistory.priceData
            : []
        }
        id={id}
        time={timeQuery}
      />

      {isBtcOrEth && (
        <IndicatorGrid
          timeQuery={timeQuery}
          id={id}
          blockchainData={
            data?.getAssetHistory?.blockchainData
              ? data?.getAssetHistory.blockchainData
              : []
          }
        />
      )}

      {!!GeckoDetails?.getGeckoAssetDetails?.description?.en && (
        <div className="bottom-row">
          <ReactMarkdown
            // eslint-disable-next-line react/no-children-prop
            children={GeckoDetails?.getGeckoAssetDetails?.description?.en}
            remarkPlugins={[remarkGfm, remarkParse, remarkRehype]}
            rehypePlugins={[rehypeRaw]}
            // key={markdownPiece + Math.random()}
          />
        </div>
      )}

      {!loading && isBtc && (
        <BitcoinMacrosContainer
          MacroData={MacroData?.getBTCMacros?.macro_data}
        />
      )}
    </div>
  );
};

const PairRowContainer = styled.div`
  margin-right: -0.5rem;
  margin-left: -0.5rem;
  min-width: 100%;
  text-align: center;
  padding: 1rem 0;
`;

export default DashboardView;
