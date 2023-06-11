import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface ScrollToTopProps {
  scrollThreshold?: number;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ scrollThreshold = 100 }) => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > scrollThreshold) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollThreshold]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ScrollButton
      onClick={scrollToTop}
      style={{ opacity: showScrollButton ? 1 : 0 }}
    >
      <i className="fas fa-arrow-up" />
    </ScrollButton>
  );
};

const ScrollButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background-color: #fff;
  border: 2px solid black;
  border-radius: 50%;
  cursor: pointer;
  transition: opacity 0.3s;
  opacity: 0;

  i {
    margin: 0;
    padding: 0;
    font-size: 20px;
  }

  animation: bounce 5s infinite;
  -webkit-animation: bounce 5s infinite;
  -moz-animation: bounce 5s infinite;
  -o-animation: bounce 5s infinite;

  @-webkit-keyframes bounce {
    0%,
    100% {
      -moz-transform: translateY(0);
    }
    40% {
      -webkit-transform: translateY(-30px);
    }
  }

  @-moz-keyframes bounce {
    0%,
    100% {
      -moz-transform: translateY(0);
    }
    40% {
      -webkit-transform: translateY(-30px);
    }
  }

  @-o-keyframes bounce {
    0%,
    100% {
      -moz-transform: translateY(0);
    }
    40% {
      -webkit-transform: translateY(-30px);
    }
  }
  @keyframes bounce {
    0%,
    100% {
      -moz-transform: translateY(0);
    }
    40% {
      -webkit-transform: translateY(-30px);
    }
  }
`;

export default ScrollToTop;
