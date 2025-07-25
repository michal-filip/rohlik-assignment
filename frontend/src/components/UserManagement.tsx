import React, { useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  User,
  PaginatedResult,
  fetchUsers,
  deleteUser,
  updateUser,
  toggleUserActive,
} from "../api/user";
import { Box, Paper, Typography, TablePagination } from "@mui/material";
import { UserFilters } from "./UserManagement/UserFilters";
import { UserTable } from "./UserManagement/UserTable";
import { UserEditDialog } from "./UserManagement/UserEditDialog";
import { UserDeleteDialog } from "./UserManagement/UserDeleteDialog";
import { NotificationSnackbar } from "./UserManagement/NotificationSnackbar";

import { format } from "date-fns";

export function UserManagement() {
  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "info" | "warning" | "error",
  });

  // Edit modal state
  const [editOpen, setEditOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  // Form for editing user
  const form = useForm({
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      phoneNumber: "",
      active: true,
    },
  });

  // Confirmation modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  // Snackbar helpers
  const showSnackbar = (
    message: string,
    severity: "success" | "info" | "warning" | "error" = "success"
  ) => {
    setSnackbar({ open: true, message, severity });
  };
  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // User status toggle
  const handleSetStatus = async (userId: string, active: boolean) => {
    try {
      await toggleUserActive(userId, active);
      showSnackbar("User status updated");
      fetchAndSetUsers();
    } catch (err) {
      showSnackbar(
        err instanceof Error ? err.message : "Failed to update user status",
        "error"
      );
    }
  };

  // Edit logic
  const handleEdit = (userId: string) => {
    const user = usersPage.content.find((u) => u.id === userId);
    if (user) {
      setUserToEdit(user);
      form.reset({
        name: user.name,
        surname: user.surname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        active: user.active,
      });
      setEditOpen(true);
    }
  };
  const handleEditClose = () => {
    setEditOpen(false);
    setUserToEdit(null);
  };
  const onEditSubmit = async (data: any) => {
    if (!userToEdit) return;
    // Convert status string to boolean
    const payload = {
      ...data,
      active: data.active === "active",
    };
    try {
      await updateUser(userToEdit.id, payload);
      showSnackbar("User updated successfully");
      fetchAndSetUsers();
      setEditOpen(false);
      setUserToEdit(null);
    } catch (err) {
      showSnackbar(
        err instanceof Error ? err.message : "Failed to update user",
        "error"
      );
    }
  };

  // Delete logic
  const handleDeleteRequest = (user: User) => {
    setUserToDelete(user);
    setConfirmOpen(true);
  };
  const handleDeleteConfirmed = async () => {
    if (!userToDelete) return;
    try {
      await deleteUser(userToDelete.id);
      showSnackbar("User deleted");
      fetchAndSetUsers();
      if (usersPage.content.length === 1 && currentPage > 0) {
        setCurrentPage(0);
      }
    } catch (err) {
      showSnackbar(
        err instanceof Error ? err.message : "Failed to delete user",
        "error"
      );
    } finally {
      setConfirmOpen(false);
      setUserToDelete(null);
    }
  };
  const handleDeleteCancel = () => {
    setConfirmOpen(false);
    setUserToDelete(null);
  };

  // Pagination
  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      id: "",
      name: "",
      status: "all",
      dateFrom: null,
      dateTo: null,
    });
    setCurrentPage(0);
  };
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filters, setFilters] = useState({
    id: "",
    name: "",
    status: "all",
    dateFrom: null as Date | null,
    dateTo: null as Date | null,
  });
  const [usersPage, setUsersPage] = useState<PaginatedResult<User>>({
    content: [],
    totalElements: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<unknown>(null);

  // Debounced fetch function using lodash.debounce
  const debouncedFetchRef = useRef<any>(null);
  const fetchAndSetUsers = useCallback(
    async (page = currentPage, limit = rowsPerPage, filterObj = filters) => {
      setIsLoading(true);
      setIsError(false);
      setError(null);
      try {
        // Map UI filters to API filters
        const apiFilters: any = {};
        if (filterObj.id) apiFilters.id = filterObj.id;
        if (filterObj.name) apiFilters.name = filterObj.name;
        if (filterObj.status !== "all")
          apiFilters.active = filterObj.status === "active";
        if (filterObj.dateFrom)
          apiFilters.createdAtFrom = format(filterObj.dateFrom, "yyyy-MM-dd");
        if (filterObj.dateTo)
          apiFilters.createdAtTo = format(filterObj.dateTo, "yyyy-MM-dd");
        // You may want to call your API here
        const result = await fetchUsers(page, limit, apiFilters);
        setUsersPage(result);
        setIsLoading(false);
        setIsError(false);
        setError(null);
      } catch (err) {
        setIsError(true);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [currentPage, rowsPerPage, filters]
  );

  // Initial fetch
  React.useEffect(() => {
    debouncedFetchRef.current = fetchAndSetUsers;
    debouncedFetchRef.current();
  }, [rowsPerPage, currentPage, filters]);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage system users, their status, and permissions
        </Typography>
      </Box>

      {/* Filters */}
      <UserFilters
        filters={filters}
        setFilters={setFilters}
        clearFilters={clearFilters}
      />

      {/* Results Summary */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Showing {usersPage.content.length} of {usersPage.totalElements} users
        </Typography>
      </Box>

      {isLoading && (
        <Box sx={{ p: 3 }}>
          <Typography>Loading users...</Typography>
        </Box>
      )}
      {isError && (
        <Box sx={{ p: 3 }}>
          <Typography color="error">
            Error loading users:{" "}
            {error instanceof Error ? error.message : "Unknown error"}
          </Typography>
        </Box>
      )}

      {!isLoading && !isError && (
        <Paper>
          <UserTable
            users={usersPage.content}
            onEdit={handleEdit}
            onDelete={handleDeleteRequest}
            onToggleStatus={handleSetStatus}
          />
          <UserDeleteDialog
            open={confirmOpen}
            user={userToDelete}
            onCancel={handleDeleteCancel}
            onConfirm={handleDeleteConfirmed}
          />
          <UserEditDialog
            open={editOpen}
            userToEdit={userToEdit}
            form={form}
            onSubmit={onEditSubmit}
            onClose={handleEditClose}
            isSubmitting={form.formState.isSubmitting}
          />
          {usersPage.totalElements === 0 && (
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Typography color="text.secondary">
                No users found matching the current filters.
              </Typography>
            </Box>
          )}
          <TablePagination
            component="div"
            count={usersPage.totalElements}
            page={currentPage}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50]}
          />
        </Paper>
      )}

      <NotificationSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
}
