import { Colors, MediaQueries } from "@/styles/variables";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

const CallToActionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  text-align: center;
  padding: 32px;

  @media ${MediaQueries.MD} {
    padding: 64px;
  }
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 16px;
  color: ${Colors.white};
`;

const Description = styled.p`
  font-size: 16px;
  color: ${Colors.white};
`;

const CTAButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  align-items: center;
`;

const CTAButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  background-color: ${Colors.accent};
  color: ${Colors.charcoal};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
  min-width: 160px;

  &:hover {
    background-color: ${Colors.primary};
    color: ${Colors.white};
  }

  &:focus-visible {
    outline: 2px solid ${Colors.accent};
    outline-offset: 2px;
    box-shadow: 0 0 0 2px ${Colors.charcoal}, 0 0 12px rgba(212, 168, 75, 0.4);
  }
`;

const SecondaryCTALink = styled(Link)`
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.accentLight};
  border: 2px solid ${Colors.accentLight};
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    background-color: rgba(245, 230, 179, 0.15);
    color: ${Colors.white};
    border-color: ${Colors.white};
  }

  &:focus-visible {
    outline: 2px solid ${Colors.accent};
    outline-offset: 2px;
    box-shadow: 0 0 0 2px ${Colors.charcoal}, 0 0 12px rgba(212, 168, 75, 0.4);
  }
`;

const TrustLine = styled.p`
  font-size: 14px;
  color: ${Colors.accentLight};
  opacity: 0.9;
  margin: 0;
`;

const CTACard: React.FC = () => {
  const router = useRouter();

  const handleSignUp = () => {
    router.push("/auth?path=SignUp");
  };

  return (
    <CallToActionContainer
      as={motion.div}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4 }}
    >
      <Title>Join 10,000+ asset trackers</Title>
      <Description>
        See your portfolio in 30 seconds. Built with Next.js, Apollo GraphQL, and
        Redis-backed caching—track favorites, save portfolios, and access
        real-time indicators and charts.
      </Description>
      <CTAButtonRow>
        <CTAButton onClick={handleSignUp}>Sign up now</CTAButton>
        <SecondaryCTALink href="/assets">Explore assets</SecondaryCTALink>
      </CTAButtonRow>
      <TrustLine>No credit card required · Free to start</TrustLine>
    </CallToActionContainer>
  );
};

export default CTACard;
