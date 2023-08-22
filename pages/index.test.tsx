import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Index from "./index";

describe("App", () => {
  it("renders App component", () => {
    render(<Index />);

    expect(screen.getByText(/hello/i)).toBeInTheDocument();
  });
});
