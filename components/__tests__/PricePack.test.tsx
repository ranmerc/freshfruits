import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Pack } from "@/types/PriceData";
import PricePack from "../PricePack";
import renderer from "react-test-renderer";

describe("PricePack component", () => {
  describe("Renders correct pack details", () => {
    describe("Renders correct discount", () => {
      it("Fixed Price", () => {
        const info: Pack = {
          type: "count",
          quantity: 4,
          inStock: true,
          price: 200,
          discountPrice: 200,
        };

        const component = (
          <PricePack info={info} onChange={jest.fn()} packId={1} selected={1} />
        );

        render(component);

        expect(screen.getByText(/fixed price/i)).toBeInTheDocument();

        const tree = renderer.create(component).toJSON();

        expect(tree).toMatchSnapshot();
      });

      it("Discount is 10%", () => {
        const info: Pack = {
          type: "count",
          quantity: 4,
          inStock: true,
          price: 200,
          discountPrice: 180,
        };

        const component = (
          <PricePack info={info} onChange={jest.fn()} packId={1} selected={1} />
        );

        render(component);

        expect(screen.getByText(/10% off/i)).toBeInTheDocument();

        const tree = renderer.create(component).toJSON();

        expect(tree).toMatchSnapshot();
      });
    });

    describe("Renders correct price", () => {
      it("Price on discount", () => {
        const info: Pack = {
          type: "count",
          quantity: 4,
          inStock: true,
          price: 150,
          discountPrice: 120,
        };

        const component = (
          <PricePack info={info} onChange={jest.fn()} packId={1} selected={1} />
        );

        render(component);

        expect(screen.getByText(/₹120/i)).toBeInTheDocument();
        expect(screen.getByText(/₹150/i)).toBeInTheDocument();
        expect(screen.getByText(/₹150/i)).toHaveStyle(
          "text-decoration: line-through"
        );

        const tree = renderer.create(component).toJSON();

        expect(tree).toMatchSnapshot();
      });

      it("Fixed price", () => {
        const info: Pack = {
          type: "count",
          quantity: 4,
          inStock: true,
          price: 150,
          discountPrice: 150,
        };

        const component = (
          <PricePack info={info} onChange={jest.fn()} packId={1} selected={1} />
        );

        render(component);

        expect(screen.getByText(/₹150/i)).toBeInTheDocument();
        expect(screen.getByText(/₹150/i)).not.toHaveStyle(
          "text-decoration: line-through"
        );

        const tree = renderer.create(component).toJSON();

        expect(tree).toMatchSnapshot();
      });
    });

    describe("Renders correct Quantity", () => {
      it("Renders count", () => {
        const info: Pack = {
          type: "count",
          quantity: 6,
          inStock: true,
          price: 150,
          discountPrice: 120,
        };

        const component = (
          <PricePack info={info} onChange={jest.fn()} packId={1} selected={1} />
        );

        render(component);

        expect(screen.getByText(/6 Nos/i)).toBeInTheDocument();

        const tree = renderer.create(component).toJSON();

        expect(tree).toMatchSnapshot();
      });

      it("Renders weight", () => {
        const info: Pack = {
          type: "weight",
          quantity: 300,
          inStock: true,
          price: 150,
          discountPrice: 120,
        };

        const component = (
          <PricePack info={info} onChange={jest.fn()} packId={1} selected={1} />
        );

        render(component);

        expect(screen.getByText(/300 g/i)).toBeInTheDocument();

        const tree = renderer.create(component).toJSON();

        expect(tree).toMatchSnapshot();
      });
    });
    it("Out of stock", () => {
      const info: Pack = {
        type: "count",
        quantity: 4,
        inStock: false,
        price: 200,
        discountPrice: 180,
      };

      const component = (
        <PricePack info={info} onChange={jest.fn()} packId={1} selected={1} />
      );

      render(component);

      expect(screen.getByText(/out of stock/i)).toBeInTheDocument();

      const tree = renderer.create(component).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe("Functions correctly", () => {
    it("Disabled when no stock", async () => {
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
