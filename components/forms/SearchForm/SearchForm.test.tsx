import { render, screen, fireEvent } from "@testing-library/react";
import SearchForm from "./SearchForm";
import { MockedProvider } from "@apollo/client/testing";

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
    fireEvent.change(input, { target: { value: "" } });

    expect(setQueryValue).toBeCalledWith("");
    expect(filterAssets).toBeCalled();
  });
});
