import { ShoppingCart } from "@mui/icons-material";
import IconLink from "../IconLink";
import useMobile from "@/hooks/useMobile";
import { Button, Typography } from "@mui/material";
import Link from "next/link";

export default function CartButton() {
  const isMobile = useMobile();

  return (
    <>
      {!isMobile && (
        <Link href={"/cart"} passHref style={{ verticalAlign: "center" }}>
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
      )}
    </>
  );
}
