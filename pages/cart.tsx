import Authorized from "@/components/Authorized";
import CartItemList from "@/components/CartItemList";
import useCartItemCount from "@/hooks/useCartItemCount";
import useCartValue from "@/hooks/useCartValue";
import { ShoppingCartCheckout } from "@mui/icons-material";
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

  return (
    <>
      <Head>
        <title>Cart - Fresh Fruits</title>
      </Head>
      <NoSsr>
        <Authorized>
          <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
            <Typography variant="h3" fontWeight={"bold"} component={"h1"}>
              Fruit Cart
            </Typography>
            <CartItemList />
            <Divider sx={{ my: 5 }} />
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
          </Container>
        </Authorized>
      </NoSsr>
    </>
  );
}
