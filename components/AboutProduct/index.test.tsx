import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AboutProduct from ".";
import FruitData from "@/types/FruitData";

const fruitData: FruitData = {
  id: 1,
  name: "Fruit",
  countryOfOrigin: "India",
  description: "This is a delicious fruit",
  images: ["/fruit-1.jpeg", "/fruit-2.jpeg"],
  shelfLife: 4,
  storageInstructions: "Store in cool dry place",
};

describe("About Product Component", () => {
  test("Renders heading", () => {
    render(<AboutProduct fruitData={fruitData} />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Fruit Details" })
    ).toBeInTheDocument();
  });

  test("Renders description", () => {
    render(<AboutProduct fruitData={fruitData} />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Description" })
    ).toBeInTheDocument();

    expect(screen.getByText(fruitData.description)).toBeInTheDocument();
  });

  test("Renders shelf life", () => {
    render(<AboutProduct fruitData={fruitData} />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Shelf Life" })
    ).toBeInTheDocument();

    expect(screen.getByText(`${fruitData.shelfLife} days`)).toBeInTheDocument();
  });

  test("Renders storage instructions", () => {
    render(<AboutProduct fruitData={fruitData} />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Storage Instructions" })
    ).toBeInTheDocument();

    expect(screen.getByText(fruitData.storageInstructions)).toBeInTheDocument();
  });

  test("Renders country of origin", () => {
    render(<AboutProduct fruitData={fruitData} />);

    expect(
      screen.getByRole("heading", { level: 3, name: "Country of Origin" })
    ).toBeInTheDocument();

    expect(screen.getByText(fruitData.countryOfOrigin)).toBeInTheDocument();
  });
});