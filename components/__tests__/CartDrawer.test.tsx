import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CartDrawer from "../CartDrawer";
import useCartItemCount from "@/hooks/useCartItemCount";
import useCartValue from "@/hooks/useCartValue";
import renderer from "react-test-renderer";

jest.mock("@/hooks/useCartItemCount");
jest.mock("@/hooks/useCartValue");

const mockedUseCartItemCount = useCartItemCount as jest.Mock;
const mockedUseCartValue = useCartValue as jest.Mock;

describe("Cart Drawer Component", () => {
  it("Does not render when cart is empty", () => {
    mockedUseCartItemCount.mockReturnValue(0);
    mockedUseCartValue.mockReturnValue(0);

    render(<CartDrawer />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();

    const tree = renderer.create(<CartDrawer />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Renders correctly when cart is not empty", () => {
    mockedUseCartItemCount.mockReturnValue(3);
    mockedUseCartValue.mockReturnValue(90);

    const tree = renderer.create(<CartDrawer />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Renders SVG logo", () => {
    mockedUseCartItemCount.mockReturnValue(3);
    mockedUseCartValue.mockReturnValue(90);

    render(<CartDrawer />);

    expect(screen.getByTestId("ShoppingCartIcon")).toBeInTheDocument();
  });

  it("Renders cart text", () => {
    mockedUseCartItemCount.mockReturnValue(3);
    mockedUseCartValue.mockReturnValue(90);

    render(<CartDrawer />);

    expect(screen.getByText(/view cart/i)).toBeInTheDocument();
  });

  it("Renders correct item count", () => {
    mockedUseCartItemCount.mockReturnValue(3);
    mockedUseCartValue.mockReturnValue(90);

    render(<CartDrawer />);

    expect(screen.getByText(/3 items/i)).toBeInTheDocument();
  });

  it("Renders correct cart value", () => {
    mockedUseCartItemCount.mockReturnValue(3);
    mockedUseCartValue.mockReturnValue(90);

    render(<CartDrawer />);
    expect(screen.getByText(/₹90/i)).toBeInTheDocument();
  });

  it("Renders link to cart page", () => {
    mockedUseCartItemCount.mockReturnValue(3);
    mockedUseCartValue.mockReturnValue(90);

    render(<CartDrawer />);

    expect(screen.getByRole("link")).toHaveAttribute("href", "/cart");
  });
});
