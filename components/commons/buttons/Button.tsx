import {
  BorderRadius,
  Colors,
  FocusRing,
  FontSize,
  FontWeight,
  Opacity,
  Padding,
} from "@/styles/variables";
import React from "react";
import styled from "styled-components";

interface ButtonProps {
  primary?: boolean;
  secondary?: boolean;
  disabled?: boolean;
  whiteOutline?: boolean;
  onClick?: () => void;
  children: any;
}

const ButtonContainer = styled.button<ButtonProps>`
  display: inline-block;
  padding: ${Padding.medium} ${Padding.large};
  font-size: ${FontSize.medium};
  font-weight: ${FontWeight.bold};
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  border-radius: ${BorderRadius.medium};
  border: none;
  outline: ${(props) => (props.whiteOutline ? "1px solid white" : "none")};

  background-color: ${(props) =>
    props.primary ? Colors.primary : Colors.black};
  color: ${Colors.white};

  &:hover {
    background-color: ${(props) =>
      props.disabled ? "inherit" : Colors.primary};
    outline: ${(props) => (props.disabled ? "none" : "1px solid white")};

    color: ${Colors.white};
  }

  &:focus-visible {
    outline: ${FocusRing.width} ${FocusRing.style} ${FocusRing.color};
    outline-offset: ${FocusRing.offset};
  }

  &:disabled {
    opacity: ${Opacity.medium};
    cursor: not-allowed;
  }
`;

const Button: React.FC<ButtonProps> = ({
  primary = false,
  secondary = false,
  disabled = false,
  whiteOutline = false,
  onClick,
  children,
}) => {
  return (
    <ButtonContainer
      primary={primary}
      secondary={secondary}
      disabled={disabled}
      onClick={onClick}
      whiteOutline={whiteOutline}
    >
      {children}
    </ButtonContainer>
  );
};

export default Button;
