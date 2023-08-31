import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import FruitItem from "../FruitItem";
import useFetchPrice from "@/hooks/useFetchPrice";
import FruitItemCartAction from "../FruitItemCartAction";

jest.mock("@/hooks/useFetchPrice");
jest.mock("@/components/FruitItemCartAction", () => {
  return function FruitItemCartAction() {
    <div></div>;
  };
});

const mockedUseFetchPrice = useFetchPrice as jest.Mock;

describe("FruitItem component", () => {
  it("Renders loading state", () => {
    mockedUseFetchPrice.mockReturnValue({
      isLoading: true,
      isError: false,
      isSuccess: false,
      data: null,
    });

    render(
      <FruitItem
        item={{
          countryOfOrigin: "India",
          description: "Fruit Description",
          id: 1,
          images: ["images.jpg"],
          name: "Fruit Name",
          shelfLife: 7,
          storageInstructions: "Storage instructions",
        }}
      />
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Loading prices...");
  });

  it("Renders error state", () => {
    mockedUseFetchPrice.mockReturnValue({
      isLoading: false,
      isError: true,
      isSuccess: false,
      data: null,
    });

    render(
      <FruitItem
        item={{
          countryOfOrigin: "India",
          description: "Fruit Description",
          id: 1,
          images: ["images.jpg"],
          name: "Fruit Name",
          shelfLife: 7,
          storageInstructions: "Storage instructions",
        }}
      />
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Error fetching price data for Fruit Name"
    );
  });

  it("Renders correct fruit details", () => {
    mockedUseFetchPrice.mockReturnValue({
      isLoading: false,
      isError: false,
      isSuccess: true,
      data: {
        id: 1,
        packs: Array(2),
      },
    });

    render(
      <FruitItem
        item={{
          countryOfOrigin: "India",
          description: "Fruit Description",
          id: 1,
          images: ["images.jpg"],
          name: "Fruit Name",
          shelfLife: 7,
          storageInstructions: "Storage instructions",
        }}
      />
    );

    expect(
      screen.getByRole("link", {
        name: "Fruit Name",
      })
    ).toHaveAttribute("href", "/fruit/1");

    expect(
      screen.getByRole("img", { name: "Fruit Name image" })
    ).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: "Fruit Name" }));
  });
});
