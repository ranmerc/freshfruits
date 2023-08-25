import { ShoppingCart } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

export default function CartButton() {
  return (
    <>
      <Box display={{ xs: "none", md: "block" }}>
        <Link
          href={"/cart"}
          passHref
          style={{ verticalAlign: "center" }}
          aria-label="Cart"
        >
          <Button
            variant="contained"
            size="large"
            startIcon={<ShoppingCart />}
            disableElevation
          >
            <Typography variant="subtitle1" fontWeight={"bold"}>
              Cart
            </Typography>
          </Button>
        </Link>
      </Box>
    </>
  );
}
