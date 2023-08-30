import { renderHook } from "@testing-library/react";
import "@testing-library/jest-dom";
import useCartItemCount from "../useCartItemCount";
import * as CartContext from "@/context/CartContext";

jest.mock("@/context/CartContext", () => {
  const originalModule = jest.requireActual("@/context/CartContext");

  return {
    __esModule: true,
    ...originalModule,
    useCartContext: () => ({
      cartItems: [
        {
          quantity: 1,
        },
        {
          quantity: 5,
        },
        {
          quantity: 36,
        },
      ],
    }),
  };
});

describe("useCartItemCount hook", () => {
  it("Returns correct value", () => {
    const { result } = renderHook(useCartItemCount, {
      wrapper: CartContext.CartProvider,
    });
    expect(result.current).toBe(42);
  });
});
