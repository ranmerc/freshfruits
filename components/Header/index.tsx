import { AppBar, Stack } from "@mui/material";
import IconLink from "../IconLink";
import Logo from "../Logo";
import CartButton from "../CartButton";
import useMobile from "@/hooks/useMobile";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/router";

export default function Header() {
  const isMobile = useMobile();
  const router = useRouter();

  return (
    <AppBar position="sticky">
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        mx={{ xs: 2, md: 4 }}
        my={{ xs: 1, md: 2 }}
      >
        {isMobile && router.pathname.match(/^\/fruit/) ? (
          <IconLink SVGIcon={ArrowBack} label={"Go back"} href="/" />
        ) : (
          <Logo />
        )}
        {!isMobile && <CartButton />}
      </Stack>
    </AppBar>
  );
}
