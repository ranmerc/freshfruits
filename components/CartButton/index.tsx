import { useUserContext } from "@/context/UserContext";
import useCartItemCount from "@/hooks/useCartItemCount";
import { ShoppingCart } from "@mui/icons-material";
import { Badge, Box, Button, NoSsr, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

export default function CartButton() {
  const { username } = useUserContext();
  const cartItemCount = useCartItemCount();
  const router = useRouter();

  if (!username || router.pathname === "/cart") {
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
            <Badge
              badgeContent={cartItemCount}
              color="secondary"
              sx={{
                "& .MuiBadge-badge": { top: 8, right: 8, fontSize: "0.9rem" },
              }}
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
            </Badge>
          </Link>
        </Box>
      </NoSsr>
    </>
  );
}
