import { useLazyQuery } from "@apollo/client";
import { useEffect, useMemo } from "react";
import styled from "styled-components";
import { GET_ASSET_PAIRS_24_HOURS } from "../../../../helpers/queries/assets/getAssetFinancialDetails";
import PairBlock from "./pair-block";

interface PairDetailsRowProps {
  id: string;
}

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
  }, [id]);

  const PairBlocks = useMemo(() => {
    if (!data?.getAssetPairs?.pairData?.length) return [];

    console.log({ data }, "In Pairblocks");

    return data?.getAssetPairs.pairData.map((pair) => {
      return <PairBlock data={pair} id={id} />;
    });
  }, [data?.getAssetPairs, loading]);

  console.log({ PairBlocks });

  return <PairRowContainer>{PairBlocks}</PairRowContainer>;
};

const PairRowContainer = styled.div`
  display: flex;
  max-width: 100%;
  overflow: scroll;
  border: 2px solid black;

  ::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

export default PairDetailsRow;
