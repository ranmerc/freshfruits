import { AppBar, Stack } from "@mui/material";
import Logo from "../Logo";
import CartButton from "../CartButton";

export default function Header() {
  return (
    <AppBar position="sticky">
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mx={{ xs: 2, md: 4 }}
        my={{ xs: 1, md: 2 }}
      >
        <Logo />
        <CartButton />
      </Stack>
    </AppBar>
  );
}
