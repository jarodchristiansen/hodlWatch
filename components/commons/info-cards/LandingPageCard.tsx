import {
  BorderRadius,
  Colors,
  FontFamily,
  FontWeight,
  Shadows,
  Transitions,
} from "@/styles/variables";
import Image from "next/image";
import styled from "styled-components";

interface CardProps {
  image: any;
  title: string;
  text: string;
  variant?: "default" | "light";
}

const LandingPageCard = ({ image, title, text, variant = "default" }: CardProps) => {
  return (
    <CardWrapper $variant={variant}>
      <div className="card-background">
        <Image src={image} height={150} width={150} alt="feature card" />
      </div>
      <h4>{title}</h4>
      <div>{text}</div>
    </CardWrapper>
  );
};

const CardWrapper = styled.div<{ $variant?: "default" | "light" }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 28px;
  font-family: ${FontFamily.primary};
  border-radius: ${BorderRadius.large};
  position: relative;
  text-align: center;
  background: ${(p) => (p.$variant === "light" ? "rgba(255, 255, 252, 0.95)" : Colors.charcoal)};
  color: ${(p) => (p.$variant === "light" ? Colors.charcoal : Colors.white)};
  border: 1px solid ${(p) => (p.$variant === "light" ? Colors.accentLight : Colors.secondary)};
  box-shadow: ${Shadows.card};
  transition: box-shadow ${Transitions.default}, transform ${Transitions.default};

  &:hover {
    box-shadow: ${Shadows.cardHover};
    transform: translateY(-4px) scale(1.02);
  }

  h4 {
    font-family: ${FontFamily.headline};
    font-weight: ${FontWeight.bold};
    font-size: 1.5rem;
    color: ${(p) => (p.$variant === "light" ? Colors.primary : Colors.accent)};
    margin-bottom: 10px;
    padding: 5px 0;
    background-color: ${(p) => (p.$variant === "light" ? "rgba(212, 168, 75, 0.15)" : Colors.secondary)};
    border-radius: ${BorderRadius.small};
  }

  .card-background {
    padding: 24px 0;
  }
`;

export default LandingPageCard;
