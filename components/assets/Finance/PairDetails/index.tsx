import { GET_ASSET_PAIRS_24_HOURS } from "@/helpers/queries/assets/getAssetFinancialDetails";
import { Colors, MediaQueries } from "@/styles/variables";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

import PairBlock from "./pair-block";

interface PairDetailsRowProps {
  id: string;
}

const PairDetailsRow: React.FC<PairDetailsRowProps> = ({ id }) => {
  const [getPairs, { data, loading, error, refetch }] = useLazyQuery(
    GET_ASSET_PAIRS_24_HOURS
  );
  const [pairStartIndex, setPairStartIndex] = useState(0);
  const [pairEndIndex, setPairEndIndex] = useState(4);

  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getPairs({
      variables: {
        symbol: id,
      },
    });
  }, [id, getPairs]);

  const PairBlocks = useMemo(() => {
    if (!data?.getAssetPairs?.pairData?.length) return [];

    return data?.getAssetPairs.pairData
      ?.slice(pairStartIndex, pairEndIndex)
      .map((pair, idx) => {
        return <PairBlock data={pair} id={id} key={idx} />;
      });
  }, [data?.getAssetPairs, loading, id, pairStartIndex, pairEndIndex]);

  const incrementPairIndex = () => {
    if (pairEndIndex + 4 < data?.getAssetPairs?.pairData?.length) {
      setPairStartIndex(pairStartIndex + 4);
      setPairEndIndex(pairEndIndex + 4);

      console.log("Scrolling to top"); // Add this console log to verify if the function is called

      if (rowRef.current) {
        console.log("Scrolling element found"); // Add this console log to verify if the element is found
        rowRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const decrementPairIndex = () => {
    if (pairStartIndex > 0) {
      setPairStartIndex(pairStartIndex - 4);
      setPairEndIndex(pairEndIndex - 4);
    }
  };

  const hasMoreResults =
    pairEndIndex + 4 < data?.getAssetPairs?.pairData?.length;
  const hasResultsBefore = pairStartIndex > 0;

  return (
    <PairsWholeContainer ref={rowRef}>
      {!!data?.getAssetPairs?.pairData?.length && (
        <>
          <h6 className="top-pairs-header">Top Pairs by Volume (24 hours)</h6>

          {hasResultsBefore && (
            <button onClick={decrementPairIndex}>Prev</button>
          )}

          <PairRowContainer>{PairBlocks}</PairRowContainer>

          {hasMoreResults && <button onClick={incrementPairIndex}>Next</button>}
        </>
      )}
    </PairsWholeContainer>
  );
};

const PairsWholeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .top-pairs-header {
    color: ${Colors.elegant.white};
  }

  button {
    width: 120px;
    margin: auto;
    border-radius: 10px;
    background-color: ${Colors.elegant.accentPurple};
    color: white;
    padding: 8px 12px;
    font-weight: bold;
  }
`;
const PairRowContainer = styled.div`
  width: 100%;
  animation: fadeIn 2s;
  margin: 0 auto;
  display: grid;
  gap: 1rem;
  padding: 12px 8px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

  @media ${MediaQueries.MD} {
    padding: 24px;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
`;

export default PairDetailsRow;
