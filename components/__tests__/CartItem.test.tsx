import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import CartItem from "../CartItem";
import useFetchFruit from "@/hooks/useFetchFruit";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCartContext } from "@/context/CartContext";
import CartItemType from "@/types/CartItemType";
import userEvent from "@testing-library/user-event";

jest.mock("@/hooks/useFetchFruit");
jest.mock("@/context/CartContext");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const mockedUseFetchFruit = useFetchFruit as jest.Mock;
const mockedUseCartContext = useCartContext as jest.Mock;

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const cartItemValue = (details: Partial<CartItemType>): CartItemType => {
  return {
    fruitId: details.fruitId || 1,
    pack: {
      discountPrice: details.pack ? details.pack.discountPrice : 30,
      inStock: details.pack ? details.pack.inStock : false,
      price: details.pack ? details.pack.price : 35,
      quantity: details.pack ? details.pack.quantity : 2,
      type: details.pack ? details.pack.type : "count",
    },
    quantity: details.quantity || 1,
    selectedPackId: details.selectedPackId || 1,
  };
};

describe("CartItem component", () => {
  it("Renders loading state", () => {
    mockedUseFetchFruit.mockImplementation((id: number) => ({
      isLoading: true,
      isError: false,
      data: null,
      isSuccess: false,
    }));

    mockedUseCartContext.mockReturnValue({
      addItemToCart: jest.fn(),
      removeItemFromCart: jest.fn(),
    });

    render(<CartItem item={cartItemValue({})} />, {
      wrapper: wrapper,
    });

    expect(screen.getByText("Loading item...")).toBeInTheDocument();
  });

  it("Renders error state", () => {
    mockedUseFetchFruit.mockImplementation((id: number) => ({
      isLoading: false,
      isError: true,
      data: null,
      isSuccess: false,
    }));

    const addFunction = jest.fn();
    const removeFunction = jest.fn();
    mockedUseCartContext.mockReturnValue({
      addItemToCart: addFunction,
      removeItemFromCart: removeFunction,
    });

    render(<CartItem item={cartItemValue({})} />, {
      wrapper: wrapper,
    });

    expect(screen.getByText("Error loading item!")).toBeInTheDocument();
  });

  it("Renders correct fruit details - 1", () => {
    mockedUseFetchFruit.mockImplementation(() => ({
      isLoading: false,
      isError: false,
      data: {
        data: {
          name: "Fruit",
          images: ["image.jpeg"],
        },
      },
      isSuccess: true,
    }));

    mockedUseCartContext.mockReturnValue({
      addItemToCart: jest.fn(),
      removeItemFromCart: jest.fn(),
    });

    render(
      <CartItem
        item={cartItemValue({
          fruitId: 3,
          pack: {
            quantity: 5,
            inStock: true,
            price: 10,
            discountPrice: 5,
            type: "count",
          },
        })}
      />,
      {
        wrapper: wrapper,
      }
    );

    // image
    expect(
      screen.getByRole("img", {
        name: "Fruit",
      })
    ).toBeInTheDocument();

    // fruit heading
    expect(
      screen.getByRole("heading", {
        name: "Fruit (5 Nos)",
      })
    );

    // link to fruit
    expect(
      screen.getByRole("link", {
        name: "Fruit (5 Nos)",
      })
    ).toHaveAttribute("href", "/fruit/3");

    // discount and subtotal price
    expect(screen.getByText("50% off")).toBeInTheDocument();

    // discount price
    expect(screen.getAllByText(/₹5/i)).toHaveLength(2);

    // actual price
    expect(screen.getByText(/₹10/i)).toHaveStyle(
      "text-decoration: line-through"
    );
  });

  it("Renders correct fruit details - 2", () => {
    mockedUseFetchFruit.mockImplementation(() => ({
      isLoading: false,
      isError: false,
      data: {
        data: {
          name: "Apple",
          images: ["img.jpeg"],
        },
      },
      isSuccess: true,
    }));

    mockedUseCartContext.mockReturnValue({
      addItemToCart: jest.fn(),
      removeItemFromCart: jest.fn(),
    });

    render(
      <CartItem
        item={cartItemValue({
          fruitId: 2,
          pack: {
            quantity: 500,
            inStock: true,
            price: 220,
            discountPrice: 200,
            type: "weight",
          },
          quantity: 4,
        })}
      />,
      {
        wrapper: wrapper,
      }
    );

    // image
    expect(
      screen.getByRole("img", {
        name: "Apple",
      })
    ).toBeInTheDocument();

    // fruit heading
    expect(
      screen.getByRole("heading", {
        name: "Apple (500 g)",
      })
    );

    // link to fruit
    expect(
      screen.getByRole("link", {
        name: "Apple (500 g)",
      })
    ).toHaveAttribute("href", "/fruit/2");

    // discount
    expect(screen.getByText("9% off")).toBeInTheDocument();

    // discount price
    expect(screen.getByText(/₹200/i)).toBeInTheDocument();

    // subtotal price
    expect(screen.getByText(/₹800/i)).toBeInTheDocument();

    // actual price
    expect(screen.getByText(/₹220/i)).toHaveStyle(
      "text-decoration: line-through"
    );
  });

  it("Functions correctly", async () => {
    mockedUseFetchFruit.mockImplementation(() => ({
      isLoading: false,
      isError: false,
      data: {
        data: {
          name: "Apple",
          images: ["img.jpeg"],
        },
      },
      isSuccess: true,
    }));

    const addItemToCart = jest.fn();
    const removeItemFromCart = jest.fn();
    mockedUseCartContext.mockReturnValue({
      addItemToCart: addItemToCart,
      removeItemFromCart: removeItemFromCart,
    });

    render(
      <CartItem
        item={cartItemValue({
          fruitId: 2,
          pack: {
            quantity: 500,
            inStock: true,
            price: 220,
            discountPrice: 200,
            type: "weight",
          },
          quantity: 4,
        })}
      />,
      {
        wrapper: wrapper,
      }
    );

    const incrementButton = screen.getByRole("button", {
      name: "Add one item",
    });

    const decrementButton = screen.getByRole("button", {
      name: "Remove one item",
    });

    await userEvent.click(incrementButton);
    await userEvent.click(decrementButton);

    expect(addItemToCart).toHaveBeenCalledTimes(1);
    expect(removeItemFromCart).toHaveBeenCalledTimes(1);
  });
});
