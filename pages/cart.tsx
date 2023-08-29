import Authorized from "@/components/Authorized";
import CartItemList from "@/components/CartItemList";
import { useCartContext } from "@/context/CartContext";
import useCartItemCount from "@/hooks/useCartItemCount";
import useCartValue from "@/hooks/useCartValue";
import { RemoveShoppingCart, ShoppingCartCheckout } from "@mui/icons-material";
import {
  Button,
  Container,
  Divider,
  NoSsr,
  Stack,
  Typography,
} from "@mui/material";
import Head from "next/head";

export default function Cart() {
  const value = useCartValue();
  const count = useCartItemCount();
  const { clearCart } = useCartContext();

  return (
    <>
      <Head>
        <title>Cart - Fresh Fruits</title>
      </Head>
      <NoSsr>
        <Authorized>
          <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{ mb: 2 }}
            >
              <Typography variant="h3" fontWeight={"bold"} component={"h1"}>
                Fruit Cart
              </Typography>
              {!!count && (
                <Button
                  variant="outlined"
                  startIcon={<RemoveShoppingCart />}
                  onClick={() => clearCart()}
                >
                  Clear Cart
                </Button>
              )}
            </Stack>
            <CartItemList />
            <Divider sx={{ my: 5 }} />
            {!!count && (
              <>
                <Stack
                  justifyContent="flex-end"
                  direction={"row"}
                  alignItems={"baseline"}
                  columnGap={1}
                  flexWrap={"wrap"}
                >
                  <Typography>Total ({`${count} items`}):</Typography>
                  <Typography fontWeight={"bold"} fontSize={"1.3rem"}>
                    ₹{value}
                  </Typography>
                </Stack>
                <Button
                  sx={{ mt: 4, py: 2 }}
                  color="primary"
                  variant="contained"
                  startIcon={<ShoppingCartCheckout />}
                  fullWidth
                >
                  Checkout
                </Button>
              </>
            )}
          </Container>
        </Authorized>
      </NoSsr>
    </>
  );
}
