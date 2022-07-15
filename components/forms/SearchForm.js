import React, { useState, useEffect } from "react";
import { DebounceInput } from "react-debounce-input";

const SearchForm = ({ queryValue, setQueryValue, filterAssets }) => {
  const handleSearch = (e) => {
    e.preventDefault();

    filterAssets(e);
    console.log("This is handleSearch", queryValue);
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
      <form onSubmit={handleSearch}>
        <DebounceInput
          className="px-2"
          placeholder="search here..."
          minLength={1}
          debounceTimeout={500}
          onChange={(event) => handleInputChange(event.target.value)}
        />

        <button type={"submit"} className={"rounded px-3"}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
