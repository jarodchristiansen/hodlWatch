import { Colors, MediaQueries } from "@/styles/variables";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";
import styled from "styled-components";

import AvatarImage from "../../public/assets/avatar.jpg";

const ReviewList: React.FC = () => {
  const reviewListRef = useRef<HTMLDivElement>(null);

  let reviews = [
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

  reviews = reviews.flatMap((i) => [i, i]);

  const handleScroll = (scrollOffset: number) => {
    if (reviewListRef.current) {
      reviewListRef.current.scrollLeft += scrollOffset;
    }
  };

  return (
    <ReviewListWrapper>
      <ScrollButton className="left" onClick={() => handleScroll(-200)}>
        {"❮"}
      </ScrollButton>
      <ReviewListContainer ref={reviewListRef}>
        {reviews.map((review, index) => (
          <ReviewCard key={index}>
            <Image
              src={AvatarImage}
              alt={review.author}
              height={80}
              width={80}
            />

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
            <YearsInCrypto>{`Years in Web3: ${review.yearsInCrypto}`}</YearsInCrypto>
          </ReviewCard>
        ))}
      </ReviewListContainer>
      <ScrollButton className="right" onClick={() => handleScroll(200)}>
        {"❯"}
      </ScrollButton>
    </ReviewListWrapper>
  );
};

const ReviewListWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 24px auto;
  overflow: hidden;
  display: flex;
  align-items: center;

  @media ${MediaQueries.MD} {
    padding: 40px;
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

  &:hover {
    transform: translateY(-12px) scale(1.025);
    box-shadow: 0 12px 40px 0 rgba(20, 24, 36, 0.35), 0 2px 0 0 ${Colors.accent};
  }

  img {
    border: 2.5px solid ${Colors.accent};
    border-radius: 50%;
    margin-bottom: 12px;
    box-shadow: 0 2px 12px 0 rgba(255, 215, 80, 0.1);
  }

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
  color: ${Colors.accent};
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
  }
`;

export default ReviewList;
