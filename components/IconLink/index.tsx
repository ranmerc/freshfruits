import Link from "next/link";
import { IconButton } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

export default function IconLink({
  SVGIcon,
  label,
  href,
}: {
  SVGIcon: SvgIconComponent;
  label: string;
  href: string;
}) {
  return (
    <>
      <Link href={href} passHref>
        <IconButton aria-label={label}>
          <SVGIcon sx={{ fontSize: "2rem" }} />
        </IconButton>
      </Link>
    </>
  );
}
