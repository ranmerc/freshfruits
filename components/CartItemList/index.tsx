import { useCartContext } from "@/context/CartContext";
import CartItem from "@/components/CartItem";
import { Stack, Typography } from "@mui/material";

export default function CartItemList() {
  const { cartItems } = useCartContext();

  if (cartItems.length === 0) {
    return (
      <Typography variant={"body1"} mt={2}>
        Your cart is empty!
      </Typography>
    );
  }

  return (
    <>
      <Stack component={"ul"} sx={{ listStyle: "none", padding: 0, rowGap: 3 }}>
        {cartItems.map((item) => (
          <li key={item.fruitId}>
            <CartItem item={item} />
          </li>
        ))}
      </Stack>
    </>
  );
}
