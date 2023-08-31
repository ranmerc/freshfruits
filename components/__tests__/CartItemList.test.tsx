import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CartItemList from "../CartItemList";
import { useCartContext } from "@/context/CartContext";
import renderer from "react-test-renderer";

jest.mock("@/context/CartContext");
jest.mock("@/components/CartItem", () => {
  return function CartItem() {
    return <div>Cart Item</div>;
  };
});

const mockedUseCartContext = useCartContext as jest.Mock;

describe("CartItemList component", () => {
  it("Renders correctly when list is empty", () => {
    mockedUseCartContext.mockReturnValue({ cartItems: [] });
    render(<CartItemList />);

    expect(screen.getByRole("alert")).toHaveTextContent("Your cart is empty!");

    const tree = renderer.create(<CartItemList />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Renders list", () => {
    const items = [
      {
        fruitId: 1,
        selectedPackId: 1,
      },
      {
        fruitId: 2,
        selectedPackId: 1,
      },
    ];

    mockedUseCartContext.mockReturnValue({ cartItems: items });
    render(<CartItemList />);

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);

    const tree = renderer.create(<CartItemList />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
