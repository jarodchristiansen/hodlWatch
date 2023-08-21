import { Colors } from "@/styles/variables";
import styled from "styled-components";

const SelectChip = ({ title, onClick }) => {
  return (
    <ChipWrapper>
      {title?.toUpperCase()}

      {typeof onClick === "function" && <button onClick={onClick}>X</button>}
    </ChipWrapper>
  );
};

const ChipWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  background-color: ${Colors.elegant.accentPurple};
  border: 1px solid black;
  color: white;
  font-weight: bold;

  button {
    border: none;
    background-color: ${Colors.elegant.accentPurple};
    color: white;
    font-weight: bold;
  }
`;

export default SelectChip;
