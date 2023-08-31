import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import FruitItemCartAction from "../FruitItemCartAction";
import { useCartContext } from "@/context/CartContext";

jest.mock("@/context/CartContext");

const mockedUseCartContext = useCartContext as jest.Mock;

describe("FruitItemCartAction component", () => {
  it("Renders correct price details - 1", () => {
    mockedUseCartContext.mockReturnValue({
      cartItems: [],
      addItemToCart: jest.fn(),
      removeItemFromCart: jest.fn(),
    });

    render(
      <FruitItemCartAction
        prices={{
          id: 1,
          packs: [
            {
              type: "count",
              quantity: 1,
              price: 100,
              discountPrice: 90,
              inStock: true,
            },
            {
              type: "count",
              quantity: 6,
              price: 400,
              discountPrice: 300,
              inStock: false,
            },
          ],
        }}
        id={1}
      />
    );

    // Discount percentage
    expect(screen.getByText(/10 % off/i)).toBeInTheDocument();

    expect(screen.getByText(/1 Nos for ₹90/i)).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });

  it("Renders correct price details - 2", () => {
    mockedUseCartContext.mockReturnValue({
      cartItems: [
        {
          fruitId: 1,
          selectedPackId: 0,
          pack: {
            type: "count",
            quantity: 6,
            price: 400,
            discountPrice: 300,
            inStock: true,
          },
          quantity: 4,
        },
      ],
      addItemToCart: jest.fn(),
      removeItemFromCart: jest.fn(),
    });

    render(
      <FruitItemCartAction
        prices={{
          id: 1,
          packs: [
            {
              type: "count",
              quantity: 6,
              price: 400,
              discountPrice: 300,
              inStock: true,
            },
            {
              type: "count",
              quantity: 1,
              price: 100,
              discountPrice: 90,
              inStock: true,
            },
          ],
        }}
        id={1}
      />
    );

    expect(screen.getByText(/25 % off/i)).toBeInTheDocument();

    expect(screen.getByText(/6 Nos for ₹300/i)).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: "Add" })
    ).not.toBeInTheDocument();
  });
});
