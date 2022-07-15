// // __tests__/index.test.jsx
//
// import { render, screen } from "@testing-library/react";
// import AssetsPage from "../../pages/assets";
// import "@testing-library/jest-dom";
// import client, { Session } from "next-auth/react";
//
// jest.mock("next-auth/react");
//
// describe("Assets Page", () => {
//   it("Should render the pagination component", () => {
//     const component = render(<AssetsPage />);
//
//     const mockSession = {
//       expires: "1",
//       user: { email: "a", name: "Delta", image: "c" },
//     };
//
//     client.useSession.mockReturnValueOnce([mockSession, false]);
//
//     console.log("useSession", client.useSession);
//
//     expect(component.find(".pagination-container").exists()).toBe(true);
//   });
// });

import { render, screen } from "@testing-library/react";
import Header from "../../components/layout/Header";
import "@testing-library/jest-dom";
import { useSession } from "next-auth/react";
import AssetsPage from "../../pages/assets";
import { MockedProvider } from "@apollo/client/testing";

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: "admin" },
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: "authenticated" }; // return type is [] in v3 but changed to {} in v4
    }),
  };
});

const mocks = []; // We'll fill this in next

describe("Assets Page", () => {
  it("Should render the loading component initially", () => {
    const component = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AssetsPage />
      </MockedProvider>
    );

    const container = screen.getByTestId("loading-element");

    expect(container).toBeTruthy();

    // expect(screen.getByTestId("assets-container"));
    // expect(component.find(".pagination-container").exists()).toBe(true);
  });
});

// describe("Assets Page", () => {
//   it("Should render the pagination component", () => {
//     const component = render(<AssetsPage/>);
//
//     expect(component.find(".pagination-container").exists()).toBe(true)
//   })
// }
// describe("Header Component", () => {
//
//   // it('Show Log Out when has session',
//   //     async () => {
//   //       const {container} = render(<Header/>);
//   //
//   //       expect(container).toMatchSnapshot()
//   //       expect(screen.getByText("LOG OUT")).toBeInTheDocument();
//   //     })
// })
