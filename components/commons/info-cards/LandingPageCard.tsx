import { Colors, FontFamily, FontWeight } from "@/styles/variables";
import Image from "next/image";
import styled from "styled-components";

interface CardProps {
  image: any;
  title: string;
  text: string;
}

const LandingPageCard = ({ image, title, text }: CardProps) => {
  return (
    <CardWrapper>
      <div className="card-background">
        <Image src={image} height={150} width={150} alt="feature card" />
      </div>
      <h4>{title}</h4>
      <div>{text}</div>
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 32px;
  font-family: ${FontFamily.primary};
  border-radius: 20px;
  position: relative;
  text-align: center;
  background: ${Colors.charcoal};
  color: ${Colors.white};
  border: none;
  transition: box-shadow 0.2s, transform 0.2s;

  &:hover {
    transform: translateY(-4px) scale(1.03);
  }

  h4 {
    font-family: ${FontFamily.headline};
    font-weight: ${FontWeight.bold};
    font-size: 1.5rem;
    color: ${Colors.primary};
    margin-bottom: 12px;

    padding: 6px 0;
    background-color: ${Colors.midGray};
  }

  .card-background {
    padding: 24px 0;
  }
`;

export default LandingPageCard;
