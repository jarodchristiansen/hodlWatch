import { MockedProvider } from "@apollo/client/testing";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import PaginationComponent from "./Pagination";
describe("Pagination component", () => {
  const active = 1;
  const setOffsetState = jest.fn();
  const fetchMore = jest.fn();
  const refetch = jest.fn();

  it("should render the initial pagination", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <PaginationComponent
          active={active}
          setOffsetState={setOffsetState}
          fetchMore={fetchMore}
          refetch={refetch}
        />
      </MockedProvider>
    );

    expect(screen.getByTestId("pagination-component")).toBeTruthy();
  });

  it("should render the initial pagination", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <PaginationComponent
          active={active}
          setOffsetState={setOffsetState}
          fetchMore={fetchMore}
          refetch={refetch}
        />
      </MockedProvider>
    );

    const secondKey = screen.getByTestId("pagination-key-2");

    expect(secondKey).toBeTruthy();
  });

  it("should update/render the items on click", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <PaginationComponent
          active={active}
          setOffsetState={setOffsetState}
          fetchMore={fetchMore}
          refetch={refetch}
        />
      </MockedProvider>
    );

    const secondKey = screen.getByTestId("pagination-key-2");

    fireEvent.click(secondKey);

    expect(setOffsetState).toBeCalled();
  });

  it("previous button should render new items", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <PaginationComponent
          active={active}
          setOffsetState={setOffsetState}
          fetchMore={fetchMore}
          refetch={refetch}
        />
      </MockedProvider>
    );

    const secondKey = screen.getByTestId("pagination-key-2");

    fireEvent.click(secondKey);

    const previousKey = screen.getByTestId("pagination-key-previous");
    fireEvent.click(previousKey);

    expect(setOffsetState).toBeCalled();
  });

  it("next button should render new items", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <PaginationComponent
          active={active}
          setOffsetState={setOffsetState}
          fetchMore={fetchMore}
          refetch={refetch}
        />
      </MockedProvider>
    );

    const secondKey = screen.getByTestId("pagination-key-2");

    fireEvent.click(secondKey);

    const previousKey = screen.getByTestId("pagination-key-next");
    fireEvent.click(previousKey);

    expect(setOffsetState).toBeCalled();
  });
});
