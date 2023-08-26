import { useUserContext } from "@/context/UserContext";
import { ShoppingCart } from "@mui/icons-material";
import { Box, Button, NoSsr, Typography } from "@mui/material";
import Link from "next/link";

export default function CartButton() {
  const { username } = useUserContext();

  if (!username) {
    return null;
  }

  return (
    <>
      <NoSsr>
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
      </NoSsr>
    </>
  );
}
