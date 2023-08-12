import { useState } from "react";
import styled from "styled-components";

const LandingCarousel = ({ slides }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  return (
    <CarouselContainer>
      <Slider style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <Slide key={index}>
            <Image src={slide.image} alt={`Slide ${index}`} />
            <Content>
              <HeaderText>{slide.header}</HeaderText>
              <Paragraph>{slide.description}</Paragraph>
            </Content>
          </Slide>
        ))}
      </Slider>
      <NavButton onClick={prevSlide}>&#8249;</NavButton>
      <NavButton onClick={nextSlide}>&#8250;</NavButton>
    </CarouselContainer>
  );
};

const CarouselContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const Slider = styled.div`
  display: flex;
  transition: transform 0.3s ease-in-out;
`;

const Slide = styled.div`
  width: 100%;
  display: flex;
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
  bottom: 0;
  left: 0;
  width: 100%;
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

export default LandingCarousel;
