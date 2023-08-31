import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Counter from "../Counter";

describe("Counter component", () => {
  it("Renders with correct details", () => {
    render(
      <Counter
        count={4}
        decrementLabel="increment"
        incrementLabel="decrement"
        onIncrement={jest.fn()}
        onDecrement={jest.fn()}
      />
    );

    expect(screen.getByText("4")).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "increment",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "decrement",
      })
    ).toBeInTheDocument();
  });
});
