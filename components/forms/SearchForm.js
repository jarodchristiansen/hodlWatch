import React, { useState, useEffect } from "react";
import { DebounceInput } from "react-debounce-input";
import styled from "styled-components";

const SearchForm = ({ queryValue, setQueryValue, filterAssets }) => {
  const handleSearch = (e) => {
    e.preventDefault();

    filterAssets(e);
  };

  const handleInputChange = (e) => {
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
        />

        <button type={"submit"} className={"standardized-button"}>
          Submit
        </button>
      </form>
    </div>
  );
};

const StyledInput = styled.input`
  color: black;
  font-weight: bolder;
  border-radius: 10px;
  border: 1px solid gray;
  padding: 0.5rem 1rem;
  box-shadow: 2px 4px 6px gray;
`;

export default SearchForm;
