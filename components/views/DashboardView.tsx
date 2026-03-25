import styled from "styled-components";

import BitcoinMacrosContainer from "../assets/BitcoinMacros/BitcoinMacrosContainer";
import FinancialChartGrid from "../assets/Finance/FinancialChartCGrid";
import PairDetailsRow from "../assets/Finance/PairDetails";
import { BorderRadius, Colors, Surfaces } from "@/styles/variables";

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
    <DashboardShell>
      <Section>
        <SectionHeader>
          <h3>Charts</h3>
          <p>Choose a mode to focus, then switch to Deep dive when needed.</p>
        </SectionHeader>
        <FinancialChartGrid
          financialData={
            data?.getAssetHistory?.priceData
              ? data?.getAssetHistory.priceData
              : []
          }
        />
      </Section>

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
        <Section>
          <SectionHeader>
            <h3>Macro context</h3>
            <p>Longer-cycle signals to complement the chart view.</p>
          </SectionHeader>
          <BitcoinMacrosContainer MacroData={MacroData?.getBTCMacros?.macro_data} />
        </Section>
      )}
    </DashboardShell>
  );
};

const DashboardShell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const Section = styled.section`
  border-radius: ${BorderRadius.xlarge};
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: ${Surfaces.cardPanelStrong};
  padding: 14px 14px 10px 14px;
`;

const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;

  h3 {
    margin: 0;
    color: ${Colors.accent};
    font-weight: 900;
    letter-spacing: 0.01em;
  }

  p {
    margin: 0;
    color: rgba(255, 255, 255, 0.78);
    line-height: 1.45;
    max-width: 80ch;
  }
`;

const PairRowContainer = styled.div`
  margin-right: -0.5rem;
  margin-left: -0.5rem;
  min-width: 100%;
  text-align: center;
  padding: 1rem 0;
`;

export default DashboardView;
