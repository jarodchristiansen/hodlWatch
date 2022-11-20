import React, { useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";

interface SearchFormProps {
  queryValue: string
  setQueryValue:  React.Dispatch<React.SetStateAction<string>>
  filterAssets: (e?: string) => []
}


const SearchForm = ({ queryValue, setQueryValue, filterAssets }: SearchFormProps) => {
  const handleSearch = (e) => {
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
    <div>
      <form onSubmit={handleSearch} data-testid={"asset-search-form"}>
        <StyledInput
          className="px-2"
          placeholder="search here..."
          onChange={(event) => handleInputChange(event.target.value)}
          data-testid='search-input'
        />

        <button type={"submit"} className={"standardized-button"} data-testid='search-button'>
          Submit
        </button>
      </form>
    </div>
  );
};

const StyledInput = styled.input`
  color: black;
  font-weight: bolder;
  border-radius: 5px;
  border: 1px solid gray;
  padding: 0.5rem 1rem;
  box-shadow: 2px 4px 6px gray;
`;

export default SearchForm;
