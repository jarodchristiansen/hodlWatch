import { Colors, MediaQueries } from "@/styles/variables";
import React from "react";
import styled from "styled-components";

const ReviewListContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  justify-content: space-between;
  padding: 42px 20px;
  gap: 20px;

  @media ${MediaQueries.MD} {
    flex-direction: row;
    padding: 64px 20px;
  }
`;

const ReviewCard = styled.div`
  padding: 16px;
  background-color: ${Colors.elegant.white};
  border-radius: 8px;
  scroll-snap-align: start;
  box-sizing: border-box;
`;

const Quote = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: black;
`;

const Author = styled.p`
  font-size: 14px;
  margin-bottom: 4px;
  font-weight: 600;
  color: ${Colors.elegant.accentPurple};
`;

const Occupation = styled.p`
  font-size: 14px;
  font-weight: bold;
  color: ${Colors.elegant.secondaryGray};
`;

const ReviewList: React.FC = () => {
  const reviews = [
    {
      id: 1,
      quote:
        "Mesh has completely transformed the way I track my crypto investments. The clean and intuitive interface makes it easy to monitor my portfolio and stay up-to-date with the latest market trends. Highly recommended!",
      author: "John Doe",
      occupation: "Crypto Investor",
    },
    {
      id: 2,
      quote:
        "As a beginner in the world of cryptocurrencies, I found Mesh to be incredibly user-friendly. It provides valuable insights and metrics without overwhelming me with complex jargon. It's the perfect tool for anyone looking to navigate the crypto space.",
      author: "Jane Smith",
      occupation: "Crypto Enthusiast",
    },
    {
      id: 3,
      quote:
        "I've tried several crypto tracking apps, but Mesh stands out from the rest. The real-time data updates, beautiful charts, and social element make it my go-to platform. It's a game-changer for crypto enthusiasts!",
      author: "David Johnson",
      occupation: "Blockchain Developer",
    },
  ];

  return (
    <ReviewListContainer>
      {reviews.map((review) => (
        <ReviewCard key={review.id}>
          <Quote>{review.quote}</Quote>
          <Author>{review.author}</Author>
          <Occupation>{review.occupation}</Occupation>
        </ReviewCard>
      ))}
    </ReviewListContainer>
  );
};

export default ReviewList;
