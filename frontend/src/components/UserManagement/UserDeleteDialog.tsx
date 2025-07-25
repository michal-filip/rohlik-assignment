import React from "react";
import { Dialog, Box, Typography, Button } from "@mui/material";
import type { User } from "../../api/user";

export interface UserDeleteDialogProps {
  open: boolean;
  user: User | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export const UserDeleteDialog: React.FC<UserDeleteDialogProps> = ({
  open,
  user,
  onCancel,
  onConfirm,
}) => (
  <Dialog open={open} onClose={onCancel}>
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Confirm Deletion
      </Typography>
      <Typography gutterBottom>
        Are you sure you want to delete user{" "}
        <b>
          {user?.name} {user?.surname}
        </b>
        ?
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
        <Button onClick={onCancel} color="primary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Delete
        </Button>
      </Box>
    </Box>
  </Dialog>
);
