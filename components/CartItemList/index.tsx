import { useCartContext } from "@/context/CartContext";
import CartItem from "@/components/CartItem";
import { Alert, Stack } from "@mui/material";

export default function CartItemList() {
  const { cartItems } = useCartContext();

  if (cartItems.length === 0) {
    return (
      <Alert
        severity="info"
        sx={{
          fontSize: "1rem",
        }}
      >
        Your cart is empty!
      </Alert>
    );
  }

  return (
    <>
      <Stack component={"ul"} sx={{ listStyle: "none", padding: 0, rowGap: 3 }}>
        {cartItems.map((item) => (
          <li key={`${item.fruitId}${item.selectedPackId}`}>
            <CartItem item={item} />
          </li>
        ))}
      </Stack>
    </>
  );
}
