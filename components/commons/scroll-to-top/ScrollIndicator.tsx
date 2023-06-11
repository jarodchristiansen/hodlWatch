import React, { useState } from "react";
import styled from "styled-components";

interface ScrollIndicatorProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ containerRef }) => {
  const [scrollInterval, setScrollInterval] = useState<NodeJS.Timeout | null>(
    null
  );

  const startScroll = (direction: "left" | "right") => {
    const scrollStep = direction === "left" ? -200 : 200;

    const scrollInterval = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.scrollBy({
          left: scrollStep,
          behavior: "smooth",
        });
      }
    }, 100);

    setScrollInterval(scrollInterval);
  };

  const stopScroll = () => {
    if (scrollInterval) {
      clearInterval(scrollInterval);
      setScrollInterval(null);
    }
  };

  const getScrollState = () => {
    if (containerRef.current) {
      const { scrollWidth, clientWidth, scrollLeft } = containerRef.current;
      const isScrollable = scrollWidth > clientWidth;

      if (isScrollable) {
        const isScrollingLeft = scrollLeft > 0;
        const isScrollingRight = scrollLeft < scrollWidth - clientWidth;

        if (isScrollingLeft && isScrollingRight) {
          return "both";
        } else if (isScrollingLeft) {
          return "left";
        } else if (isScrollingRight) {
          return "right";
        }
      }
    }
    return "none";
  };

  const scrollState = getScrollState();

  return (
    <ScrollIndicatorContainer>
      {scrollState === "both" || scrollState === "left" ? (
        <ScrollButton
          onMouseDown={() => startScroll("left")}
          onMouseUp={stopScroll}
          onMouseLeave={stopScroll}
        >
          <i className="fas fa-chevron-left" />
        </ScrollButton>
      ) : null}
      {scrollState === "both" || scrollState === "right" ? (
        <ScrollButton
          onMouseDown={() => startScroll("right")}
          onMouseUp={stopScroll}
          onMouseLeave={stopScroll}
        >
          <i className="fas fa-chevron-right" />
        </ScrollButton>
      ) : null}
    </ScrollIndicatorContainer>
  );
};

const ScrollIndicatorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const ScrollButton = styled.button`
  background-color: white;
  border: none;
  cursor: pointer;
  transition: opacity 0.3s;
  width: 200px;

  i {
    font-size: 20px;
    background-color: white;
  }
`;

export default ScrollIndicator;
