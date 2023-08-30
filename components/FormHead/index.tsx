import { Stack, Typography } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

export default function FormHead({
  SVGIcon,
  title,
}: {
  SVGIcon: SvgIconComponent;
  title: string;
}) {
  return (
    <Stack alignItems={"center"} width={"100%"} rowGap={2} mb={4}>
      <SVGIcon sx={{ fontSize: 60 }} color="secondary" />
      <Typography variant="h5">{title}</Typography>
    </Stack>
  );
}
