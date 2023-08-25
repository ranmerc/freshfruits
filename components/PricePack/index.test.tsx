import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Pack } from "@/types/PriceData";
import PricePack from ".";

describe("PricePack component", () => {
  describe("Renders correct pack details", () => {
    describe("Renders correct discount", () => {
      test("Fixed Price", () => {
        const info: Pack = {
          type: "count",
          quantity: 4,
          inStock: true,
          price: 200,
          discountPrice: 200,
        };
        render(
          <PricePack info={info} onChange={jest.fn()} packId={1} selected={1} />
        );

        expect(screen.getByText(/fixed price/i)).toBeInTheDocument();
      });

      test("Discount is 10%", () => {
        const info: Pack = {
          type: "count",
          quantity: 4,
          inStock: true,
          price: 200,
          discountPrice: 180,
        };
        render(
          <PricePack info={info} onChange={jest.fn()} packId={1} selected={1} />
        );

        expect(screen.getByText(/10% off/i)).toBeInTheDocument();
      });
    });
    describe("Renders correct price", () => {
      test("Price on discount", () => {
        const info: Pack = {
          type: "count",
          quantity: 4,
          inStock: true,
          price: 150,
          discountPrice: 120,
        };
        render(
          <PricePack info={info} onChange={jest.fn()} packId={1} selected={1} />
        );

        expect(screen.getByText(/₹120/i)).toBeInTheDocument();
        expect(screen.getByText(/₹150/i)).toBeInTheDocument();
        expect(screen.getByText(/₹150/i)).toHaveStyle(
          "text-decoration: line-through"
        );
      });

      test("Fixed price", () => {
        const info: Pack = {
          type: "count",
          quantity: 4,
          inStock: true,
          price: 150,
          discountPrice: 150,
        };
        render(
          <PricePack info={info} onChange={jest.fn()} packId={1} selected={1} />
        );

        expect(screen.getByText(/₹150/i)).toBeInTheDocument();
        expect(screen.getByText(/₹150/i)).not.toHaveStyle(
          "text-decoration: line-through"
        );
      });
    });
    describe("Renders correct Quantity", () => {
      test("Renders count", () => {
        const info: Pack = {
          type: "count",
          quantity: 6,
          inStock: true,
          price: 150,
          discountPrice: 120,
        };
        render(
          <PricePack info={info} onChange={jest.fn()} packId={1} selected={1} />
        );

        expect(screen.getByText(/6 Nos/i)).toBeInTheDocument();
      });

      test("Renders weight", () => {
        const info: Pack = {
          type: "weight",
          quantity: 300,
          inStock: true,
          price: 150,
          discountPrice: 120,
        };
        render(
          <PricePack info={info} onChange={jest.fn()} packId={1} selected={1} />
        );

        expect(screen.getByText(/300 g/i)).toBeInTheDocument();
      });
    });
    test("Out of stock", () => {
      const info: Pack = {
        type: "count",
        quantity: 4,
        inStock: false,
        price: 200,
        discountPrice: 180,
      };
      render(
        <PricePack info={info} onChange={jest.fn()} packId={1} selected={1} />
      );

      expect(screen.getByText(/out of stock/i)).toBeInTheDocument();
    });
  });

  describe("Functions correctly", () => {
    test("Disabled when no stock", async () => {
      const info: Pack = {
        type: "count",
        quantity: 4,
        inStock: false,
        price: 200,
        discountPrice: 180,
      };

      render(
        <PricePack info={info} onChange={jest.fn()} packId={1} selected={2} />
      );

      expect(screen.getByRole("radio")).toBeDisabled();
    });
  });
});
