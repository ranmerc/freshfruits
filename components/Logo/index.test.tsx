import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Logo from ".";
import resizeScreen from "@/utils/resizeScreen";

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

    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
  });

  test("Does not render logo text on mobile", () => {
    // resizing to mobile viewport
    // mobile -> <md ie <900px
    resizeScreen(899);

    render(<Logo />);
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });
});
