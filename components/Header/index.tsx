import { AppBar, Stack } from "@mui/material";
import Logo from "../Logo";
import CartButton from "../CartButton";
import UserAvatar from "../UserAvatar/UserAvatar";

export default function Header() {
  return (
    <AppBar position="sticky">
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mx={{ xs: 2, md: 4 }}
        my={{ xs: 1, md: 2 }}
        flexWrap={"wrap"}
      >
        <Logo />
        <Stack
          direction={"row"}
          alignItems={"center"}
          flexWrap="wrap"
          columnGap={2}
        >
          <CartButton />
          <UserAvatar />
        </Stack>
      </Stack>
    </AppBar>
  );
}
