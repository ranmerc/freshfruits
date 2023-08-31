import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CartButton from "../CartButton";
import router from "next/router";
import { useUserContext } from "@/context/UserContext";
import { useCartContext } from "@/context/CartContext";
import renderer from "react-test-renderer";

jest.mock("next/router", () => ({
  useRouter: jest.fn(() => ({
    pathname: "/",
  })),
}));

jest.mock("@/context/UserContext");
jest.mock("@/context/CartContext");

const mockedUseUserContext = useUserContext as jest.Mock;
const mockedUseCartContext = useCartContext as jest.Mock;

mockedUseCartContext.mockReturnValue({
  cartItems: [
    {
      quantity: 4,
    },
  ],
});

mockedUseUserContext.mockReturnValue({
  username: "test",
});

describe("Cart Button Component", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(<CartButton />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Renders SVG logo", () => {
    render(<CartButton />);

    expect(screen.getByTestId("ShoppingCartIcon")).toBeInTheDocument();
  });

  it("Renders cart text", () => {
    render(<CartButton />);

    expect(screen.getByText(/cart/i)).toBeInTheDocument();
  });

  it("Renders correct cart count", () => {
    render(<CartButton />);

    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("Renders link to cart page", () => {
    render(<CartButton />);

    expect(screen.getByRole("link", { name: "Cart" })).toHaveAttribute(
      "href",
      "/cart"
    );
  });
});
