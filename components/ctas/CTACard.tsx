import {
  BorderRadius,
  Colors,
  FontFamily,
  FontSize,
  FontWeight,
  MediaQueries,
} from "@/styles/variables";
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
  padding: 24px;

  @media ${MediaQueries.MD} {
    padding: 56px;
  }
`;

const Title = styled.h2`
  font-family: ${FontFamily.headline};
  font-size: ${FontSize.pageSection};
  font-weight: ${FontWeight.bold};
  margin-bottom: 12px;
  color: ${Colors.white};
`;

const Description = styled.p`
  font-size: ${FontSize.medium};
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
  font-family: ${FontFamily.primary};
  font-size: ${FontSize.medium};
  font-weight: ${FontWeight.bold};
  background-color: ${Colors.accent};
  color: ${Colors.charcoal};
  border: none;
  border-radius: ${BorderRadius.medium};
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
  font-family: ${FontFamily.primary};
  font-size: ${FontSize.medium};
  font-weight: ${FontWeight.bold};
  color: ${Colors.accentLight};
  border: 2px solid ${Colors.accentLight};
  border-radius: ${BorderRadius.medium};
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

const TrustLineSecondary = styled.p`
  font-size: 13px;
  color: ${Colors.accentLight};
  opacity: 0.8;
  margin: 4px 0 0 0;
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
        See your portfolio in under a minute. Track favorites, save portfolios,
        and access real-time indicators and charts—no setup hassle.
      </Description>
      <CTAButtonRow>
        <CTAButton onClick={handleSignUp}>Get started</CTAButton>
        <SecondaryCTALink href="/assets">Explore assets</SecondaryCTALink>
      </CTAButtonRow>
      <TrustLine>No credit card required · Free to start</TrustLine>
      <TrustLineSecondary>Your data stays private</TrustLineSecondary>
    </CallToActionContainer>
  );
};

export default CTACard;
