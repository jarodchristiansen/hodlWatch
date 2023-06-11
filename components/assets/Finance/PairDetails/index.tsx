import { GET_ASSET_PAIRS_24_HOURS } from "@/helpers/queries/assets/getAssetFinancialDetails";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import styled from "styled-components";

import { Colors } from "@/styles/variables";
import PairBlock from "./pair-block";

interface PairDetailsRowProps {
  id: string;
}

/**
 *
 * @param id: Symbol of the current asset to find the associated pairs
 * @returns PairDetailsRow component that show strade volume of associated pairs
 */
const PairDetailsRow = ({ id }: PairDetailsRowProps) => {
  const [getPairs, { data, loading, error, refetch }] = useLazyQuery(
    GET_ASSET_PAIRS_24_HOURS
  );

  useEffect(() => {
    getPairs({
      variables: {
        symbol: id,
      },
    });
  }, [id, getPairs]);

  const PairBlocks = useMemo(() => {
    if (!data?.getAssetPairs?.pairData?.length) return [];

    return data?.getAssetPairs.pairData.map((pair, idx) => {
      return <PairBlock data={pair} id={id} key={idx} />;
    });
  }, [data?.getAssetPairs, loading, id]);

  return (
    <PairsWholeContainer>
      {!!data?.getAssetPairs?.pairData?.length && (
        <>
          <h6 className="top-pairs-header">Top Pairs by Volume (24 hours)</h6>
          <PairRowContainer>{PairBlocks}</PairRowContainer>
        </>
      )}
    </PairsWholeContainer>
  );
};

const PairsWholeContainer = styled.div`
  display: flex;
  flex-direction: column;

  .top-pairs-header {
    color: ${Colors.elegant.white};
  }
`;

const PairRowContainer = styled.div`
  display: flex;
  max-width: 80%;
  overflow: scroll;
  gap: 1rem;
  padding: 1rem 0;
  margin: 0 auto;

  ::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

export default PairDetailsRow;
