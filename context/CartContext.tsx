import { useLocalStorage } from "usehooks-ts";
import {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  Dispatch,
  useCallback,
} from "react";
import CartItem from "@/types/CartItem";

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
  cartDispatch: Dispatch<ActionType>;
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
      const { fruitId, selectedPackId, quantity } = action.payload;

      const existingItemIndex = state.findIndex(
        (item) =>
          item.fruitId === fruitId && item.selectedPackId === selectedPackId
      );

      if (existingItemIndex !== -1) {
        const newState = [...state];
        newState[existingItemIndex].quantity += quantity;
        return newState;
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

      const newState = [...state];
      newState[existingItemIndex].quantity -= 1;

      if (newState[existingItemIndex].quantity === 0) {
        newState.splice(existingItemIndex, 1);
      }

      return newState;
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

  return (
    <CartContext.Provider value={{ cartItems: state, cartDispatch: dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
