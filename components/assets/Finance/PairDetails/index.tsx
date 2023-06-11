import { GET_ASSET_PAIRS_24_HOURS } from "@/helpers/queries/assets/getAssetFinancialDetails";
import { useLazyQuery } from "@apollo/client";
import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

import ScrollIndicator from "@/components/commons/scroll-to-top/ScrollIndicator";
import { Colors } from "@/styles/variables";
import PairBlock from "./pair-block";

interface PairDetailsRowProps {
  id: string;
}

const PairDetailsRow: React.FC<PairDetailsRowProps> = ({ id }) => {
  const [getPairs, { data, loading, error, refetch }] = useLazyQuery(
    GET_ASSET_PAIRS_24_HOURS
  );
  const rowRef = useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [scrollStartX, setScrollStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    getPairs({
      variables: {
        symbol: id,
      },
    });
  }, [id, getPairs]);

  useEffect(() => {
    if (rowRef.current) {
      setIsScrollable(rowRef.current.scrollWidth > rowRef.current.clientWidth);
    }
  }, [data?.getAssetPairs]);

  const PairBlocks = useMemo(() => {
    if (!data?.getAssetPairs?.pairData?.length) return [];

    return data?.getAssetPairs.pairData.map((pair, idx) => {
      return <PairBlock data={pair} id={id} key={idx} />;
    });
  }, [data?.getAssetPairs, loading, id]);

  const handleScrollStart = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setScrollStartX(event.clientX - rowRef.current!.offsetLeft);
    setScrollLeft(rowRef.current!.scrollLeft);
    rowRef.current!.style.cursor = "grabbing";
  };

  const handleScrollMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !rowRef.current) return;

    event.preventDefault();
    const scrollX = event.clientX - rowRef.current!.offsetLeft;
    const walk = (scrollX - scrollStartX) * 2; // Adjust scroll speed here
    rowRef.current!.scrollLeft = scrollLeft - walk;
  };

  const handleScrollEnd = () => {
    setIsDragging(false);
    rowRef.current!.style.cursor = "grab";
  };

  console.log({ isScrollable });

  return (
    <PairsWholeContainer>
      {!!data?.getAssetPairs?.pairData?.length && (
        <>
          <h6 className="top-pairs-header">Top Pairs by Volume (24 hours)</h6>
          <PairRowContainer
            ref={rowRef}
            onMouseDown={handleScrollStart}
            onMouseMove={handleScrollMove}
            onMouseUp={handleScrollEnd}
            onMouseLeave={handleScrollEnd}
          >
            {PairBlocks}
          </PairRowContainer>
        </>
      )}

      {isScrollable && <ScrollIndicator containerRef={rowRef} />}
    </PairsWholeContainer>
  );
};

const PairsWholeContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  .top-pairs-header {
    color: ${Colors.elegant.white};
  }
`;
const PairRowContainer = styled.div`
  display: flex;
  max-width: 80%;
  overflow-x: auto;
  gap: 1rem;
  padding: 1rem 0;
  margin: 0 auto;
  border: 2px solid white;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export default PairDetailsRow;
