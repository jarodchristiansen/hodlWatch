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
  font-family: ${FontFamily.secondary};
  border-radius: 12px;
  position: relative;
  text-align: center;
  border: 0.5px solid ${Colors.accentYellow};
  background-color: ${Colors.black};
  color: ${Colors.white};

  h4 {
    font-weight: ${FontWeight.bold};
    padding: 0 0 12px 0;
  }

  .card-background {
    padding: 24px 0;
  }
`;

export default LandingPageCard;
