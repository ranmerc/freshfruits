import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Logo from ".";

describe("Logo Component", () => {
  test("Renders SVG logo", () => {
    render(<Logo />);

    expect(screen.getByTitle("Fresh Fruits Logo")).toBeInTheDocument();
  });

  test("Renders logo text", () => {
    render(<Logo />);

    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  test("Renders link to home", () => {
    render(<Logo />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/"
    );
  });
});
