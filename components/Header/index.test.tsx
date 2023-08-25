import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from ".";
import resizeScreen from "@/utils/resizeScreen";

describe("Header Component", () => {
  test("Renders home link", () => {
    render(<Header />);

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
  });

  test("Renders cart link", () => {
    render(<Header />);

    expect(screen.getByRole("link", { name: "Cart" })).toBeInTheDocument();
  });
});
