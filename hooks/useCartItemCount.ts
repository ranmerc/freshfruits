import { useCartContext } from "@/context/CartContext";

export default function useCartItemCount() {
  const { cartItems } = useCartContext();

  return cartItems.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);
}
