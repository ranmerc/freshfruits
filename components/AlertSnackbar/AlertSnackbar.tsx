import { Alert, AlertProps, Snackbar } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";

export default function AlertSnackbar({
  isOpen,
  message,
  severity,
}: {
  isOpen: boolean;
  message: ReactNode;
  severity: AlertProps["severity"];
}) {
  const [show, setShow] = useState(isOpen);

  useEffect(() => {
    setShow(isOpen);
  }, [isOpen]);

  const handleEvents = () => {
    setShow(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={show}
        autoHideDuration={3000}
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
