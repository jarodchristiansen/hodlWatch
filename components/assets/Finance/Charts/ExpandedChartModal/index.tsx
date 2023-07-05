import { MediaQueries } from "@/styles/variables";
import { useEffect } from "react";
import styled from "styled-components";

interface ModalOverlayProps {
  isOpen: boolean;
}

const ExpandedChartModal = ({
  children,
  isOpen,
  onClose,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) => {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  return (
    <ModalOverlay isOpen={isOpen}>
      <ModalContainer>
        <CloseButton onClick={onClose}>Close</CloseButton>
        {children}
      </ModalContainer>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div<ModalOverlayProps>`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  z-index: 100;
`;

const ModalContainer = styled.div`
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 380px;
  /* min-height: 500px; */
  max-width: 90%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;

  @media ${MediaQueries.MD} {
    min-width: 700px;
  }

  @media ${MediaQueries.LG} {
    min-width: 820px;
  }

  @media ${MediaQueries.XL} {
    min-width: 1020px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 40px;
  left: 6px;
  cursor: pointer;
`;

export default ExpandedChartModal;
