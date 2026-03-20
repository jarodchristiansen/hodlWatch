import { Colors, MediaQueries } from "@/styles/variables";
import { motion } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

const CARD_WIDTH = 340;
const CARD_GAP = 20;
const CARD_STEP = CARD_WIDTH + CARD_GAP;

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const reviewList = [
  {
    id: 1,
    quote:
      "Mesh has completely transformed the way I track my crypto investments. The clean and intuitive interface makes it easy to monitor my portfolio and stay up-to-date with the latest market trends. Highly recommended!",
    author: "John Doe",
    stars: 4.6,
    yearsInCrypto: 3,
    occupation: "Crypto Investor",
  },
  {
    id: 2,
    quote:
      "As a beginner in the world of cryptocurrencies, I found Mesh to be incredibly user-friendly. It provides valuable insights and metrics without overwhelming me with complex jargon. It's the perfect tool for anyone looking to navigate the crypto space.",
    author: "Jane Smith",
    stars: 5,
    yearsInCrypto: 1,
    occupation: "Crypto Enthusiast",
  },
  {
    id: 3,
    quote:
      "I've tried several crypto tracking apps, but Mesh stands out from the rest. The real-time data updates, beautiful charts, and social element make it my go-to platform. It's a game-changer for crypto enthusiasts!",
    author: "David Johnson",
    stars: 5,
    yearsInCrypto: 5,
    occupation: "Blockchain Developer",
  },
];

const ReviewList: React.FC = () => {
  const reviewListRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (scrollOffset: number) => {
    if (reviewListRef.current) {
      reviewListRef.current.scrollLeft += scrollOffset;
    }
  };

  const updateActiveIndex = useCallback(() => {
    const el = reviewListRef.current;
    if (!el) return;
    const index = Math.round(el.scrollLeft / CARD_STEP);
    setActiveIndex(Math.min(Math.max(0, index), reviewList.length - 1));
  }, []);

  useEffect(() => {
    const el = reviewListRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateActiveIndex);
    updateActiveIndex();
    return () => el.removeEventListener("scroll", updateActiveIndex);
  }, [updateActiveIndex]);

  const scrollToIndex = (index: number) => {
    if (reviewListRef.current) {
      reviewListRef.current.scrollTo({ left: index * CARD_STEP, behavior: "smooth" });
    }
  };

  return (
    <ReviewListWrapper>
      <ReviewSectionHeading id="reviews-heading">What others say</ReviewSectionHeading>
      <CarouselRow>
        <ScrollButton
          className="left"
          onClick={() => handleScroll(-CARD_STEP)}
          aria-label="Previous testimonial"
        >
          {"❮"}
        </ScrollButton>
        <ReviewListContainer ref={reviewListRef} aria-labelledby="reviews-heading">
          {reviewList.map((review) => (
            <ReviewCard
              key={review.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.35 }}
            >
              <InitialsAvatar aria-hidden="true">
                {getInitials(review.author)}
              </InitialsAvatar>

              <StarsContainer>
                {Array.from({ length: Math.floor(review.stars) }).map(
                  (_, index) => (
                    <StarIcon key={index}>★</StarIcon>
                  )
                )}
                {Array.from({ length: 5 - Math.floor(review.stars) }).map(
                  (_, index) => (
                    <StarIcon key={index + Math.floor(review.stars)}>☆</StarIcon>
                  )
                )}
              </StarsContainer>
              <Quote>{review.quote}</Quote>
              <Author>{review.author}</Author>
              <Occupation>{review.occupation}</Occupation>
              <YearsInCrypto>{`Years in crypto: ${review.yearsInCrypto}`}</YearsInCrypto>
            </ReviewCard>
          ))}
        </ReviewListContainer>
        <ScrollButton
          className="right"
          onClick={() => handleScroll(CARD_STEP)}
          aria-label="Next testimonial"
        >
          {"❯"}
        </ScrollButton>
      </CarouselRow>
      <DotsRow role="tablist" aria-label="Testimonial position">
        {reviewList.map((_, index) => (
          <DotButton
            key={index}
            type="button"
            role="tab"
            aria-label={`Testimonial ${index + 1} of ${reviewList.length}`}
            aria-selected={activeIndex === index}
            $active={activeIndex === index}
            onClick={() => scrollToIndex(index)}
          />
        ))}
      </DotsRow>
    </ReviewListWrapper>
  );
};

const ReviewListWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${MediaQueries.MD} {
    padding: 0 40px;
  }
`;

const ReviewSectionHeading = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${Colors.accent};
  margin: 0 0 24px 0;
  text-align: center;
`;

const CarouselRow = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

const DotsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const DotButton = styled.button<{ $active?: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  padding: 0;
  cursor: pointer;
  background: ${(p) => (p.$active ? Colors.accent : Colors.secondary)};
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: ${(p) => (p.$active ? Colors.accent : Colors.accentLight)};
  }

  &:focus-visible {
    outline: 2px solid ${Colors.accent};
    outline-offset: 2px;
  }
`;

const ReviewListContainer = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 20px;
  width: 100%;

  &::-webkit-scrollbar {
    display: none;
  }

  /* Center cards on desktop; keep mobile scroll alignment unchanged. */
  @media ${MediaQueries.MD} {
    justify-content: center;
  }
`;

const ReviewCard = styled(motion.div)`
  background: linear-gradient(
    135deg,
    rgba(20, 24, 36, 0.98) 80%,
    rgba(40, 44, 60, 0.98) 100%
  );
  border-radius: 20px;
  padding: 32px 28px 28px 28px;
  box-shadow: 0 6px 32px 0 rgba(20, 24, 36, 0.25), 0 1.5px 0 0 ${Colors.accent};
  min-width: 320px;
  max-width: 340px;
  text-align: center;
  flex-shrink: 0;
  border: 1.5px solid ${Colors.accent};
  position: relative;
  transition: transform 0.3s cubic-bezier(0.4, 1.4, 0.6, 1),
    box-shadow 0.3s cubic-bezier(0.4, 1.4, 0.6, 1);
  overflow: hidden;

  // &:hover {
  //   transform: translateY(-12px) scale(1.025);
  //   box-shadow: 0 12px 40px 0 rgba(20, 24, 36, 0.35), 0 2px 0 0 ${Colors.accent};
  // }

  /* InitialsAvatar is a styled div, no img rules needed */

  &::before {
    content: "\201C";
    position: absolute;
    top: 18px;
    left: 22px;
    font-size: 54px;
    color: ${Colors.accent};
    opacity: 0.18;
    font-family: serif;
    pointer-events: none;
    z-index: 0;
  }

  &::after {
    content: "\201D";
    position: absolute;
    bottom: 18px;
    right: 22px;
    font-size: 54px;
    color: ${Colors.accent};
    opacity: 0.18;
    font-family: serif;
    pointer-events: none;
    z-index: 0;
  }

  @media ${MediaQueries.MD} {
    min-width: 320px;
  }
`;

const Quote = styled.p`
  font-size: 1.13rem;
  line-height: 1.7;
  font-weight: 400;
  font-style: italic;
  color: ${Colors.white};
  margin: 18px 0 20px 0;
  min-height: 120px;
  z-index: 1;
  position: relative;
`;

const Author = styled.p`
  font-size: 1.08rem;
  font-weight: 700;
  margin-bottom: 2px;
  color: ${Colors.white};
  letter-spacing: 0.01em;
  z-index: 1;
`;

const Occupation = styled.p`
  font-size: 0.98rem;
  font-weight: 500;
  font-style: italic;
  color: ${Colors.white};
  margin-bottom: 6px;
  z-index: 1;
`;

const StarsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
  z-index: 1;
`;

const StarIcon = styled.span`
  color: ${Colors.accent};
  font-size: 1.35rem;
  margin: 0 1.5px;
  filter: drop-shadow(0 1px 2px rgba(255, 215, 80, 0.18));
`;

const YearsInCrypto = styled.div`
  font-size: 0.95rem;
  color: ${Colors.white};
  margin-top: 8px;
  letter-spacing: 0.01em;
  z-index: 1;
`;

const InitialsAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${Colors.primary};
  border: 2.5px solid ${Colors.accentLight};
  color: ${Colors.accentLight};
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px auto;
  box-shadow: 0 2px 12px 0 rgba(212, 168, 75, 0.2);
  flex-shrink: 0;
`;

const ScrollButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 32px;
  color: ${Colors.primary};
  z-index: 1;
  min-width: 44px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: color 0.2s ease, transform 0.1s ease;

  &.left {
    left: 10px;
  }

  &.right {
    right: 10px;
  }

  &:hover {
    color: ${Colors.accent};
  }

  &:active {
    color: ${Colors.accent};
    transform: translateY(-50%) scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid ${Colors.accent};
    outline-offset: 2px;
  }
`;

export default ReviewList;
