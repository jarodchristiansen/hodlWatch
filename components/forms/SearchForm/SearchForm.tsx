import { BorderRadius, Colors, FontWeight } from "@/styles/variables";
import React from "react";
import styled from "styled-components";

interface SearchFormProps {
  queryValue: string;
  setQueryValue: React.Dispatch<React.SetStateAction<string>>;
  filterAssets: (e?: React.ChangeEvent<HTMLFormElement>) => Promise<void>;
}

/**
 *
 * @param queryValue: Current Search Term (Asset Symbol)
 * @param setQueryValue: Sets Current Search Term (Asset Symbol)
 * @param filterAssets: Function that filters the current asset shown in UI
 * @returns searchForm compnent that allows users to search assets
 */
const SearchForm = ({
  queryValue,
  setQueryValue,
  filterAssets,
}: SearchFormProps) => {
  const handleSearch = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    filterAssets(e);
  };

  const handleInputChange = (e: string | undefined) => {
    if (e) {
      setQueryValue(e);
    } else if (!e || e === undefined) {
      setQueryValue("");
      filterAssets();
    }
  };

  return (
    <form onSubmit={handleSearch} data-testid={"asset-search-form"}>
      <StyledInput
        className="px-2"
        placeholder="Search here..."
        onChange={(event) => handleInputChange(event.target.value)}
        data-testid="search-input"
      />

      <SubmitButton type={"submit"} data-testid="search-button">
        Submit
      </SubmitButton>
    </form>
  );
};

const SubmitButton = styled.button`
  background-color: ${Colors.primary};
  color: ${Colors.white};
  font-weight: ${FontWeight.bold};
  border-radius: ${BorderRadius.small};
  border: 1px solid black;
`;

const StyledInput = styled.input`
  color: black;
  font-weight: ${FontWeight.bold};
  border-radius: ${BorderRadius.small};
  border: 1px solid gray;
`;

export default SearchForm;
