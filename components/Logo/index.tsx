import { Stack, Typography } from "@mui/material";
import WatermelonSVG from "./WatermelonSVG";
import Link from "next/link";

export default function Logo() {
  return (
    <>
      <Link
        href={"/"}
        passHref
        style={{
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <WatermelonSVG />
          <Typography variant="h5" fontFamily="IBM Plex Sans" letterSpacing={2}>
            FreshFruits
          </Typography>
        </Stack>
      </Link>
    </>
  );
}
