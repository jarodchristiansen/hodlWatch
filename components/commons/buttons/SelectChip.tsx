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
  padding: 0.5rem;
  border-radius: 12px;
  background-color: #ececec;
  border: 1px solid black;

  button {
    border: none;
  }
`;

export default SelectChip;
