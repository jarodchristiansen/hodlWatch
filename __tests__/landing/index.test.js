import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MockedProvider } from "@apollo/client/testing";
import Home from "../../pages/index";

describe("Landing Page", () => {
  it("Should render the info grid", () => {
    const mocks = []; // We'll fill this in next

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
    );

    expect(screen.getByTestId("info-grid")).toBeInTheDocument();
  });
});
