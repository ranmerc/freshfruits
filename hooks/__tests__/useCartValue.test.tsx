import { renderHook } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as CartContext from "@/context/CartContext";
import useCartValue from "../useCartValue";

jest.mock("@/context/CartContext", () => {
  const originalModule = jest.requireActual("@/context/CartContext");

  return {
    __esModule: true,
    ...originalModule,
    useCartContext: () => ({
      cartItems: [
        {
          quantity: 1,
          pack: {
            discountPrice: 30,
          },
        },
        {
          quantity: 5,
          pack: {
            discountPrice: 10,
          },
        },
        {
          quantity: 36,
          pack: {
            discountPrice: 5,
          },
        },
      ],
    }),
  };
});

describe("useCartItemCount hook", () => {
  it("Returns correct value", () => {
    const { result } = renderHook(useCartValue, {
      wrapper: CartContext.CartProvider,
    });
    expect(result.current).toBe(260);
  });
});
