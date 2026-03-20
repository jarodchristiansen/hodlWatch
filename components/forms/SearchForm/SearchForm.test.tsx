import { MockedProvider } from "@apollo/client/testing";
import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";

import SearchForm from "./SearchForm";

import "@testing-library/jest-dom";

describe("SearchForm", () => {
  const queryValue = "";
  const setQueryValue = jest.fn();
  const filterAssets = jest.fn();

  it("should render the search input", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <SearchForm
          queryValue={queryValue}
          setQueryValue={setQueryValue}
          filterAssets={(e) => filterAssets(e)}
        />
      </MockedProvider>
    );

    expect(screen.getByTestId("search-input")).toBeTruthy();
    expect(screen.getByTestId("search-button")).toBeTruthy();
  });

  it("should call the filterAssets on Search", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <SearchForm
          queryValue={queryValue}
          setQueryValue={setQueryValue}
          filterAssets={(e) => filterAssets(e)}
        />
      </MockedProvider>
    );

    const input = screen.getByTestId("search-input");
    const button = screen.getByTestId("search-button");

    fireEvent.change(input, { target: { value: "btc" } });
    fireEvent.click(button);

    expect(filterAssets).toBeCalled();
  });

  it("Should reset the input on empty search", () => {
    const filterAssetsInner = jest.fn();

    function SearchFormWithState() {
      const [q, setQ] = useState("");
      return (
        <SearchForm
          queryValue={q}
          setQueryValue={setQ}
          filterAssets={(e) => filterAssetsInner(e)}
        />
      );
    }

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <SearchFormWithState />
      </MockedProvider>
    );

    const input = screen.getByTestId("search-input");

    fireEvent.change(input, { target: { value: "btc" } });
    expect(input).toHaveValue("btc");

    fireEvent.change(input, { target: { value: "" } });
    expect(input).toHaveValue("");

    // Clearing the field does not submit the form; search only runs on submit.
    expect(filterAssetsInner).not.toHaveBeenCalled();
  });
});
