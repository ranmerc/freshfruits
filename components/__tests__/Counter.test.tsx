import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Counter from "../Counter";
import renderer, { act } from "react-test-renderer";
import userEvent from "@testing-library/user-event";

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

    const tree = renderer
      .create(
        <Counter
          count={4}
          decrementLabel="increment"
          incrementLabel="decrement"
          onIncrement={jest.fn()}
          onDecrement={jest.fn()}
        />
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  it("Functions correctly", async () => {
    const increment = jest.fn();
    const decrement = jest.fn();

    render(
      <Counter
        count={4}
        decrementLabel="increment"
        incrementLabel="decrement"
        onIncrement={increment}
        onDecrement={decrement}
      />
    );

    await userEvent.click(screen.getByRole("button", { name: "increment" }));

    waitFor(() => {
      expect(increment).toHaveBeenCalledTimes(1);
    });

    await userEvent.click(screen.getByRole("button", { name: "decrement" }));

    waitFor(() => {
      expect(decrement).toHaveBeenCalledTimes(1);
    });
  });
});
