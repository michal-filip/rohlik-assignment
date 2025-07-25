import React, { useState, useRef, useCallback, useEffect } from "react";
import debounce from "lodash.debounce";
import {
  fetchUsers,
  toggleUserActive,
  deleteUser,
  User,
  PaginatedResult,
} from "../api/user";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TablePagination,
  IconButton,
  Grid,
  Card,
  CardContent,
  Snackbar,
  Alert,
  Dialog,
} from "@mui/material";

import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  PowerSettingsNew as PowerIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import { format } from "date-fns";

export function UserManagement() {
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

        const data = await fetchUsers(page, limit, apiFilters);
        setUsersPage(data);
      } catch (err) {
        setIsError(true);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [currentPage, rowsPerPage, filters]
  );

  // Debounce with lodash
  if (!debouncedFetchRef.current) {
    debouncedFetchRef.current = debounce(fetchAndSetUsers, 400);
  }

  // Call API on text filter change
  useEffect(() => {
    debouncedFetchRef.current(currentPage, rowsPerPage, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.id, filters.name, filters.dateFrom, filters.dateTo]);

  // Call API immediately for non-text filters
  useEffect(() => {
    fetchAndSetUsers(currentPage, rowsPerPage, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.status, currentPage, rowsPerPage]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "info" | "warning" | "error",
  });

  // Confirmation modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  // Filter users based on current filters
  // const filteredUsers = useMemo(() => {
  //   return users.filter((user) => {
  //     const matchesId =
  //       !filters.id || user.id.toLowerCase().includes(filters.id.toLowerCase());
  //     const matchesName =
  //       !filters.name ||
  //       user.name.toLowerCase().includes(filters.name.toLowerCase()) ||
  //       user.surname.toLowerCase().includes(filters.name.toLowerCase());
  //     const matchesStatus =
  //       filters.status === "all" ||
  //       user.active === (filters.status === "active");
  //     const matchesDateFrom =
  //       !filters.dateFrom || new Date(user.createdAt) >= filters.dateFrom;
  //     const matchesDateTo =
  //       !filters.dateTo || new Date(user.createdAt) <= filters.dateTo;

  //     return (
  //       matchesId &&
  //       matchesName &&
  //       matchesStatus &&
  //       matchesDateFrom &&
  //       matchesDateTo
  //     );
  //   });
  // }, [mergedUsers, filters]);

  const showSnackbar = (
    message: string,
    severity: "success" | "info" | "warning" | "error" = "success"
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

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

  const handleEdit = (userId: string) => {
    showSnackbar(`Edit user ${userId} - Feature coming soon`, "info");
  };

  // Show confirmation modal before deleting
  const handleDeleteRequest = (user: User) => {
    setUserToDelete(user);
    setConfirmOpen(true);
  };

  // Confirm deletion
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

  // Cancel deletion
  const handleDeleteCancel = () => {
    setConfirmOpen(false);
    setUserToDelete(null);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

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
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h6">Filters</Typography>
            <Button
              variant="outlined"
              startIcon={<ClearIcon />}
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          </Box>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <TextField
                fullWidth
                label="User ID"
                placeholder="Search by ID..."
                value={filters.id}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, id: e.target.value }))
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <TextField
                fullWidth
                label="Name"
                placeholder="Search by name or surname..."
                value={filters.name}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status}
                  label="Status"
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, status: e.target.value }))
                  }
                >
                  <MenuItem value="all">All statuses</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="deactivated">Deactivated</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <TextField
                fullWidth
                type="date"
                label="Creation Date From"
                value={
                  filters.dateFrom ? format(filters.dateFrom, "yyyy-MM-dd") : ""
                }
                onChange={(e) => {
                  const date = e.target.value ? new Date(e.target.value) : null;
                  setFilters((prev) => ({ ...prev, dateFrom: date }));
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6, lg: 4 }}>
              <TextField
                fullWidth
                type="date"
                label="Creation Date To"
                value={
                  filters.dateTo ? format(filters.dateTo, "yyyy-MM-dd") : ""
                }
                onChange={(e) => {
                  const date = e.target.value ? new Date(e.target.value) : null;
                  setFilters((prev) => ({ ...prev, dateTo: date }));
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

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
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Surname</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Telephone</TableCell>
                  <TableCell>Creation Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usersPage.content.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.surname}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.active ? "Active" : "Deactivated"}
                        color={user.active ? "success" : "default"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phoneNumber}</TableCell>
                    <TableCell>
                      {format(new Date(user.createdAt), "PP")}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleSetStatus(user.id, !user.active)}
                          color={user.active ? "error" : "success"}
                          title={user.active ? "Deactivate" : "Activate"}
                        >
                          <PowerIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleEdit(user.id)}
                          color="primary"
                          title="Edit"
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteRequest(user)}
                          color="error"
                          title="Delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                        {/* Confirmation Modal for Deletion */}
                        <Dialog open={confirmOpen} onClose={handleDeleteCancel}>
                          <Box sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                              Confirm Deletion
                            </Typography>
                            <Typography gutterBottom>
                              Are you sure you want to delete user{" "}
                              <b>
                                {userToDelete?.name} {userToDelete?.surname}
                              </b>
                              ?
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: 2,
                                mt: 2,
                              }}
                            >
                              <Button
                                onClick={handleDeleteCancel}
                                color="primary"
                                variant="outlined"
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={handleDeleteConfirmed}
                                color="error"
                                variant="contained"
                              >
                                Delete
                              </Button>
                            </Box>
                          </Box>
                        </Dialog>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {usersPage.totalElements === 0 && (
            <Box sx={{ p: 4, textAlign: "center" }}>
              <Typography color="text.secondary">
                No users found matching the current filters.
              </Typography>
            </Box>
          )}

          {/* Pagination */}
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

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
