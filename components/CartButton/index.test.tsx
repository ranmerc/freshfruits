import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CartButton from ".";

describe("Cart Button Component", () => {
  test("Renders SVG logo", () => {
    render(<CartButton />);

    expect(screen.getByTestId("ShoppingCartIcon")).toBeInTheDocument();
  });

  test("Render Cart Text", () => {
    render(<CartButton />);

    expect(screen.getByText(/cart/i)).toBeInTheDocument();
  });

  test("Renders link to cart page", () => {
    render(<CartButton />);

    expect(screen.getByRole("link", { name: "Cart" })).toHaveAttribute(
      "href",
      "/cart"
    );
  });
});
