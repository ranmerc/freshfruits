import { Drawer, NoSsr, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { ButtonBase, Box, Divider } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import useCartValue from "@/hooks/useCartValue";
import useCartItemCount from "@/hooks/useCartItemCount";

export default function CartDrawer() {
  const cartItemCount = useCartItemCount();
  const cartValue = useCartValue();

  if (cartItemCount <= 0) {
    return null;
  }

  return (
    <>
      <NoSsr>
        <Drawer
          variant="permanent"
          anchor="bottom"
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          <Box p={2}>
            <Link
              href="/cart"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ButtonBase
                sx={{
                  backgroundColor: "secondary.main",
                  color: "secondary.contrastText",
                  padding: "0.8rem 1.5rem",
                  borderRadius: "0.5rem",
                  width: "100%",
                }}
              >
                <Stack
                  direction={"row"}
                  flexWrap={"wrap"}
                  width="100%"
                  justifyContent={"space-between"}
                >
                  <Stack direction={"row"} spacing={1}>
                    <Typography variant="body1">
                      {cartItemCount} items
                    </Typography>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Typography variant="body1">₹{cartValue}</Typography>
                  </Stack>
                  <Stack direction={"row"} spacing={0.5}>
                    <ShoppingCart />
                    <Typography>View Cart</Typography>
                  </Stack>
                </Stack>
              </ButtonBase>
            </Link>
          </Box>
        </Drawer>
      </NoSsr>
    </>
  );
}
