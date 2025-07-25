import React from "react";
import {
  Dialog,
  Box,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { UseFormReturn } from "react-hook-form";
import type { User } from "../../api/user";

export interface UserEditDialogProps {
  open: boolean;
  userToEdit: User | null;
  form: UseFormReturn<any>;
  onSubmit: (data: any) => void;
  onClose: () => void;
  isSubmitting: boolean;
}

export const UserEditDialog: React.FC<UserEditDialogProps> = ({
  open,
  userToEdit,
  form,
  onSubmit,
  onClose,
  isSubmitting,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;
  const getErrorMessage = (field: string) => {
    const err = errors[field];
    if (!err) return undefined;
    if (typeof err.message === "string") return err.message;
    return undefined;
  };
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Edit User
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Name"
              fullWidth
              {...register("name", {
                required: "Name is required",
                maxLength: {
                  value: 100,
                  message: "Name cannot exceed 100 characters",
                },
              })}
              error={!!errors.name}
              helperText={getErrorMessage("name")}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Surname"
              fullWidth
              {...register("surname", {
                required: "Surname is required",
                maxLength: {
                  value: 100,
                  message: "Surname cannot exceed 100 characters",
                },
              })}
              error={!!errors.surname}
              helperText={getErrorMessage("surname")}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Email"
              fullWidth
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                  message: "Invalid email address",
                },
                maxLength: {
                  value: 200,
                  message: "Email cannot exceed 200 characters",
                },
              })}
              error={!!errors.email}
              helperText={getErrorMessage("email")}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label="Phone Number"
              fullWidth
              {...register("phoneNumber", {
                required: "Phone number is required",
                maxLength: {
                  value: 30,
                  message: "Phone number cannot exceed 30 characters",
                },
              })}
              error={!!errors.phoneNumber}
              helperText={getErrorMessage("phoneNumber")}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                label="Status"
                defaultValue={userToEdit?.active ? "active" : "deactivated"}
                {...register("active")}
                onChange={(e) => {
                  reset((prev: any) => ({
                    ...prev,
                    active: e.target.value === "active",
                  }));
                }}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="deactivated">Deactivated</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}
        >
          <Button onClick={onClose} variant="outlined" color="primary">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={isSubmitting}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};
