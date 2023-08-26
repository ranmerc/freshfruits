import { Backdrop, CircularProgress } from "@mui/material";

export default function LoadingBackdrop({ open }: { open: boolean }) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress color="secondary" />
    </Backdrop>
  );
}
