import { render } from "@testing-library/react";
import BitcoinMacrosContainer from "./index";

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("BitcoinMacrosContainer", () => {
  it("mounts with empty MacroData without throwing", () => {
    const { container } = render(<BitcoinMacrosContainer MacroData={[]} />);
    expect(container.firstChild).toBeTruthy();
  });
});
