import { AppBar, Stack } from "@mui/material";
import IconLink from "../IconLink";
import Logo from "../Logo";
import CartButton from "../CartButton";
import useMobile from "@/hooks/useMobile";
import { ArrowBack } from "@mui/icons-material";

export default function Header() {
  const isMobile = useMobile();

  return (
    <AppBar position="sticky">
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mx={4}
        my={2}
      >
        {isMobile ? (
          <IconLink SVGIcon={ArrowBack} label={"Go back"} href="/" />
        ) : (
          <Logo />
        )}
        <CartButton />
      </Stack>
    </AppBar>
  );
}
