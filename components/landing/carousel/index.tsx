import { MediaQueries } from "@/styles/variables";
import { useState } from "react";
import { Carousel } from "react-bootstrap";
import styled from "styled-components";

// import { items } from "../public/Items.json";
import { items } from "../../../public/landing-carousel-images.js";

const LandingCarousel = () => {
  const { bootstrap } = items;
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <CarouselContainer>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        fade
        variant="dark"
        indicators={false}
      >
        {bootstrap.map((item) => (
          <Carousel.Item
            key={item.id}
            interval={4000}
            className="carousel-item"
          >
            <img src={item.imageUrl} alt="slides" className="carousel-image" />
          </Carousel.Item>
        ))}
      </Carousel>

      <h3>{bootstrap[index]?.title}</h3>
    </CarouselContainer>
  );
};

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 80rem;
  border-radius: 10px 10px, 0 0;

  img {
    max-height: 30rem;
    max-width: 26rem;

    @media ${MediaQueries.MD} {
      min-width: 90rem;
      min-height: 45rem;
    }
  }

  h3 {
    color: #3f3e3e;
    font-weight: bold;
    letter-spacing: 0.05rem;
    margin: auto;

    width: 100%;
    padding: 0.5rem 0;
    border-top: 1px solid lightgray;
    border-right: 1px solid lightgray;
    border-left: 1px solid lightgray;
    background-color: #9997f752;

    max-width: 26rem;
    @media ${MediaQueries.MD} {
      max-width: 90rem;
      border-radius: 0 0 10px 10px;
    }
  }

  p {
    color: black;
  }

  .carousel-item {
    width: "100%";
    position: relative;

    .carousel-control-prev-icon {
      color: black;
    }

    .carousel-control-next-icon {
      color: black;
    }

    .carousel-image {
      position: relative;
    }
  }
`;

export default LandingCarousel;
