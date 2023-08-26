import { useCartContext } from "@/context/CartContext";

export default function useCartValue() {
  const { cartItems } = useCartContext();

  return cartItems.reduce((sum, item) => {
    return sum + item.pack.discountPrice * item.quantity;
  }, 0);
}
