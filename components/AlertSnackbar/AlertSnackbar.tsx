import { Alert, AlertProps, Snackbar } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";

export default function AlertSnackbar({
  isOpen,
  message,
  severity,
  setOpen,
  duration = 3000,
}: {
  isOpen: boolean;
  message: ReactNode;
  severity: AlertProps["severity"];
  setOpen?: (isOpen: boolean) => void;
  duration?: number;
}) {
  const [show, setShow] = useState(isOpen);

  useEffect(() => {
    setShow(isOpen);
  }, [isOpen]);

  const handleEvents = () => {
    if (setOpen) setOpen(false);
    else setShow(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={setOpen ? isOpen : show}
        autoHideDuration={duration}
        onClose={handleEvents}
        onClick={handleEvents}
      >
        <Alert severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
