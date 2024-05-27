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
  background-color: ${Colors.white};
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 280px;
  max-width: 320px;
  text-align: center;
  flex-shrink: 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.2);
  }

  img {
    border: 3px solid ${Colors.secondary};
    border-radius: 50%;
  }

  @media ${MediaQueries.MD} {
    min-width: 280px;
  }
`;

const Quote = styled.p`
  font-size: 16px;
  line-height: 1.5;
  font-weight: 400;
  font-style: italic;
  height: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 16px 0;
`;

const Author = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
  color: ${Colors.secondary};
`;

const Occupation = styled.p`
  font-size: 14px;
  font-weight: 500;
  font-style: italic;
  color: ${Colors.primary};
  margin-bottom: 8px;
`;

const StarsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const StarIcon = styled.span`
  color: ${Colors.accent};
  font-size: 24px;
  margin: 0 2px;
`;

const YearsInCrypto = styled.div`
  font-size: 14px;
  color: ${Colors.secondary};
  margin-top: 10px;
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
