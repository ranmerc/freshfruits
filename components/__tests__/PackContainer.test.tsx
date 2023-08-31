import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PackContainer from "../PackContainer";
import useFetchPrice from "@/hooks/useFetchPrice";
import { useCartContext } from "@/context/CartContext";
import renderer from "react-test-renderer";

// telling jest to load the mock implementation from __mocks__
jest.mock("@/hooks/useFetchPrice");
jest.mock("@/context/CartContext");

// satisfying ts error no mockImplementation
const mocked = useFetchPrice as jest.Mock;
const mockedUseCartContext = useCartContext as jest.Mock;
mockedUseCartContext.mockReturnValue({
  addItemToCart: jest.fn(),
});

describe("Pack container", () => {
  it("Renders loading view", () => {
    mocked.mockImplementation(() => ({
      isLoading: true,
      isError: false,
      data: null,
      isSuccess: false,
    }));

    render(<PackContainer id={1} />);

    expect(
      screen.getByRole("progressbar", { name: "Loading prices" })
    ).toBeInTheDocument();

    const tree = renderer.create(<PackContainer id={1} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Renders error view", () => {
    mocked.mockImplementation(() => ({
      isLoading: false,
      isError: true,
      data: null,
      isSuccess: false,
    }));
    render(<PackContainer id={1} />);

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Unable to load prices!")).toBeInTheDocument();

    const tree = renderer.create(<PackContainer id={1} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Renders heading", () => {
    mocked.mockImplementation(() => ({
      isLoading: false,
      isError: false,
      data: {
        id: 1,
        packs: [
          {
            type: "count",
            quantity: 1,
            price: 70,
            discountPrice: 70,
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
      },
      isSuccess: true,
    }));

    render(<PackContainer id={1} />);
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument();
  });

  it("Renders price packs", () => {
    mocked.mockImplementation(() => ({
      isLoading: false,
      isError: false,
      data: {
        id: 1,
        packs: [
          {
            type: "count",
            quantity: 1,
            price: 70,
            discountPrice: 70,
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
      },
      isSuccess: true,
    }));

    render(<PackContainer id={1} />);

    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(2);

    const tree = renderer.create(<PackContainer id={1} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
