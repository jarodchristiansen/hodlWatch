import { MediaQueries } from "@/styles/variables";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

interface Slide {
  id: string;
  image: string;
  title: string;
  text: string;
}

interface CarouselMarkersProps {
  slides: Slide[];
  activeIndex: number;
}

interface MarkerProps {
  isActive: boolean;
}

const SLIDES: Slide[] = [
  {
    id: "portfolio-tracking",
    title: "Portfolio Tracking",
    text: "Monitor real-time prices, performance, and allocation across multiple assets.",
    image: "/assets/chartScreenshot.png",
  },
  {
    id: "comprehensive-metrics",
    title: "Comprehensive Metrics",
    text: "Dive deep into financial and on-chain metrics to gain valuable insights into crypto assets.",
    image: "/landing/growth-chart-icon.svg",
  },
  {
    id: "social-community",
    title: "Social Community",
    text: "Connect with a vibrant community of crypto enthusiasts and investors.",
    image: "/landing/connected-icon.svg",
  },
  {
    id: "news-updates",
    title: "News and Updates",
    text: "Access a curated feed of crypto news, articles, and market updates in real-time.",
    image: "/assets/chartScreenshot.png",
  },
  {
    id: "user-friendly",
    title: "User-friendly Interface",
    text: "Enjoy a sleek and intuitive interface designed for seamless user experience.",
    image: "/assets/chartScreenshot.png",
  },
  {
    id: "security-privacy",
    title: "Security and Privacy",
    text: "Rest assured knowing that your data and assets are protected with robust security measures.",
    image: "/landing/avatar-icon.svg",
  },
];

const CarouselMarkers = ({ slides, activeIndex }: CarouselMarkersProps) => {
  return (
    <MarkersContainer>
      {slides.map((slide, index) => (
        <Marker key={slide.id} isActive={index === activeIndex} />
      ))}
    </MarkersContainer>
  );
};

const LandingCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideCount = SLIDES.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slideCount);
  }, [slideCount]);

  const prevSlide = useCallback(() => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + slideCount) % slideCount
    );
  }, [slideCount]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 12000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <CarouselContainer>
      <Slider
        style={{
          transform: `translateX(-${activeIndex * 100}%)`,
        }}
      >
        {SLIDES.map((slide) => (
          <Slide key={slide.id}>
            <Image src={slide.image} alt={slide.title} />
            <Content>
              <HeaderText>{slide.title}</HeaderText>
              <Paragraph>{slide.text}</Paragraph>
            </Content>
          </Slide>
        ))}
      </Slider>
      <NavButtonsContainer>
        <NavButton onClick={prevSlide}>&#8249;</NavButton>
        <NavButton onClick={nextSlide}>&#8250;</NavButton>
      </NavButtonsContainer>
      <CarouselMarkers slides={SLIDES} activeIndex={activeIndex} />
    </CarouselContainer>
  );
};

const NavButtonsContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
`;

const CarouselContainer = styled.div`
  position: relative;
  overflow: hidden;
  padding: 24px 0;
`;

const Slider = styled.div`
  display: flex;

  transition: transform 0.5s ease-in-out;

  @media ${MediaQueries.MD} {
    transition: transform 1.5s ease-in-out;
  }
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  padding: 20px;
  color: white;
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 100%;
`;

const Slide = styled.div`
  flex-shrink: 0; /* Ensures each slide stays the same width */
  max-height: 600px;
  width: 100%;
  display: flex;
  position: relative; /* Add this line to enable relative positioning */
  &:hover ${Content} {
    transform: translateY(0); /* Show the content on hover */
  }
`;

const HeaderText = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  font-size: 1rem;
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 2rem;
  color: white;
  cursor: pointer;
  outline: none;
  &:first-child {
    left: 10px;
  }
  &:last-child {
    right: 10px;
  }
`;

const MarkersContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Marker = styled.div<MarkerProps>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.isActive ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.3)"};
  margin: 0 5px;
`;

export default LandingCarousel;
