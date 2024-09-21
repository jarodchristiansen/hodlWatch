import styled from "styled-components";

import BitcoinMacrosContainer from "../assets/BitcoinMacros/BitcoinMacrosContainer";
import FinancialChartGrid from "../assets/Finance/FinancialChartCGrid";
import PairDetailsRow from "../assets/Finance/PairDetails";

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
      <FinancialChartGrid
        financialData={
          data?.getAssetHistory?.priceData
            ? data?.getAssetHistory.priceData
            : []
        }
        id={id}
        time={timeQuery}
      />

      {id && (
        <PairRowContainer>
          <PairDetailsRow id={id} />
        </PairRowContainer>
      )}

      {/* {isBtcOrEth && (
        <IndicatorGrid
          timeQuery={timeQuery}
          id={id}
          blockchainData={
            data?.getAssetHistory?.blockchainData
              ? data?.getAssetHistory.blockchainData
              : []
          }
        />
      )} */}

      {/* {!!GeckoDetails?.getGeckoAssetDetails?.description?.en && (
        <div className="bottom-row">
          <ReactMarkdown
            // eslint-disable-next-line react/no-children-prop
            children={GeckoDetails?.getGeckoAssetDetails?.description?.en}
            remarkPlugins={[remarkGfm, remarkParse, remarkRehype]}
            rehypePlugins={[rehypeRaw]}
            // key={markdownPiece + Math.random()}
          />
        </div>
      )} */}

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
