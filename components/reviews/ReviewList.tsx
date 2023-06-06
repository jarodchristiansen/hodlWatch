import { MediaQueries } from "@/styles/variables";
import React from "react";
import styled from "styled-components";

const ReviewListContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: auto;
  justify-content: space-between;
  padding: 20px;

  @media ${MediaQueries.MD} {
    flex-direction: row;
  }
`;

const ReviewCard = styled.div`
  padding: 16px;
  background-color: #f2f2f2;
  border-radius: 8px;
  scroll-snap-align: start;
  box-sizing: border-box;
`;

const Quote = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Author = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const Occupation = styled.p`
  font-size: 12px;
  color: #888;
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
