import React from "react";
import styled from "styled-components";

import {
  BorderRadius,
  Colors,
  FontSize,
  FontWeight,
  Opacity,
  Padding,
} from "@/styles/variables";

interface ButtonProps {
  primary?: boolean;
  secondary?: boolean;
  disabled?: boolean;
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
  outline: none;

  background-color: ${(props) =>
    props.primary ? Colors.modern.accentBlue : Colors.midnight};
  color: ${Colors.lightGray};

  &:hover {
    background-color: ${(props) =>
      props.disabled ? "inherit" : Colors.richBlack};
    color: ${Colors.lightGray};
  }

  &:focus {
    box-shadow: 0 0 0 3px ${Colors.midnight};
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
  onClick,
  children,
}) => {
  return (
    <ButtonContainer
      primary={primary}
      secondary={secondary}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </ButtonContainer>
  );
};

export default Button;
