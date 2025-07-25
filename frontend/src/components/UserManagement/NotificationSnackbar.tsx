import React from "react";
import { Snackbar, Alert } from "@mui/material";

export interface NotificationSnackbarProps {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error";
  onClose: () => void;
}

export const NotificationSnackbar: React.FC<NotificationSnackbarProps> = ({
  open,
  message,
  severity,
  onClose,
}) => (
  <Snackbar
    open={open}
    autoHideDuration={6000}
    onClose={onClose}
    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
  >
    <Alert onClose={onClose} severity={severity}>
      {message}
    </Alert>
  </Snackbar>
);
