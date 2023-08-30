import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CartButton from "../CartButton";
import { ReactNode } from "react";
import router from "next/router";
import * as UserContext from "@/context/UserContext";
import * as CartContext from "@/context/CartContext";

jest.mock("next/router", () => ({
  useRouter: jest.fn(() => ({
    pathname: "/",
  })),
}));

jest.mock("@/context/UserContext", () => {
  const originalModule = jest.requireActual("@/context/UserContext");

  return {
    __esModule: true,
    ...originalModule,
    useUserContext: jest.fn(() => ({
      username: "test",
    })),
  };
});

jest.mock("@/context/CartContext", () => {
  const originalModule = jest.requireActual("@/context/CartContext");

  return {
    __esModule: true,
    ...originalModule,
    useCartContext: () => ({
      cartItems: [
        {
          quantity: 4,
        },
      ],
    }),
  };
});

const CustomContainer = ({ children }: { children: ReactNode }) => {
  return (
    <UserContext.UserProvider>
      <CartContext.CartProvider>{children}</CartContext.CartProvider>
    </UserContext.UserProvider>
  );
};

describe("Cart Button Component", () => {
  it("Renders SVG logo", () => {
    render(<CartButton />, {
      wrapper: CustomContainer,
    });

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
