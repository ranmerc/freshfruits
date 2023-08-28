import { useLocalStorage } from "usehooks-ts";
import {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  Dispatch,
  useCallback,
} from "react";
import CartItem from "@/types/CartItemType";

type RemoveCartItemPayload = {
  fruitId: number;
  selectedPackId: number;
};

type ActionType =
  | {
      type: "ADD_TO_CART";
      payload: CartItem;
    }
  | {
      type: "REMOVE_FROM_CART";
      payload: {
        fruitId: number;
        selectedPackId: number;
      };
    }
  | {
      type: "CLEAR_CART";
    };

interface CartContextType {
  cartItems: CartItem[];
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (item: RemoveCartItemPayload) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCartContext() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }

  return context;
}

function cartReducer(state: CartItem[], action: ActionType) {
  switch (action.type) {
    case "ADD_TO_CART": {
      console.log("added");
      const { fruitId, selectedPackId, quantity } = action.payload;

      const existingItemIndex = state.findIndex(
        (item) =>
          item.fruitId === fruitId && item.selectedPackId === selectedPackId
      );

      if (existingItemIndex !== -1) {
        return [
          ...state.slice(0, existingItemIndex),
          {
            ...state[existingItemIndex],
            quantity: state[existingItemIndex].quantity + quantity,
          },
          ...state.slice(existingItemIndex + 1),
        ];
      }

      return [...state, action.payload];
    }

    case "REMOVE_FROM_CART": {
      const { fruitId, selectedPackId } = action.payload;

      const existingItemIndex = state.findIndex(
        (item) =>
          item.fruitId === fruitId && item.selectedPackId === selectedPackId
      );

      if (existingItemIndex === -1) {
        return state;
      }

      if (state[existingItemIndex].quantity === 1) {
        return [
          ...state.slice(0, existingItemIndex),
          ...state.slice(existingItemIndex + 1),
        ];
      }

      return [
        ...state.slice(0, existingItemIndex),
        {
          ...state[existingItemIndex],
          quantity: state[existingItemIndex].quantity - 1,
        },
        ...state.slice(existingItemIndex + 1),
      ];
    }

    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [savedCartItems, setSavedCartItems] = useLocalStorage<CartItem[]>(
    "cart-items",
    []
  );

  const reducerLocalStorage = useCallback(
    (state: CartItem[], action: ActionType) => {
      const newState = cartReducer(state, action);

      setSavedCartItems(newState);

      return newState;
    },
    [setSavedCartItems]
  );

  const [state, dispatch] = useReducer(reducerLocalStorage, savedCartItems);

  const addItemToCart = useCallback(
    (item: CartItem) => {
      dispatch({
        type: "ADD_TO_CART",
        payload: item,
      });
    },
    [dispatch]
  );

  const removeItemFromCart = useCallback(
    (item: RemoveCartItemPayload) => {
      dispatch({
        type: "REMOVE_FROM_CART",
        payload: item,
      });
    },
    [dispatch]
  );

  const clearCart = useCallback(() => {
    dispatch({
      type: "CLEAR_CART",
    });
  }, [dispatch]);

  return (
    <CartContext.Provider
      value={{ cartItems: state, addItemToCart, removeItemFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
