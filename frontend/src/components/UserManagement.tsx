import React, { useState } from "react";
import { toggleUserActive } from "../api/user";
import { useQuery } from "@tanstack/react-query";
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
} from "@mui/material";

import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  PowerSettingsNew as PowerIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";
import { format } from "date-fns";

type User = {
  id: string;
  name: string;
  surname: string;
  active: boolean;
  email: string;
  phoneNumber: string;
  createdAt: string;
};

type PaginatedResult<T> = {
  content: T[];
  totalElements: number;
};

// Fetch users from backend
async function fetchUsers(): Promise<PaginatedResult<User>> {
  const res = await fetch("http://localhost:8090/api/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export function UserManagement() {
  const {
    data: usersPage = { content: [], totalElements: 0 },
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<PaginatedResult<User>>({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  const [filters, setFilters] = useState({
    id: "",
    name: "",
    status: "all",
    dateFrom: null as Date | null,
    dateTo: null as Date | null,
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "info" | "warning" | "error",
  });

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
      refetch();
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

  const handleDelete = (userId: string) => {
    // TODO: implement

    showSnackbar("User deleted");
    if (usersPage.content.length === 1 && currentPage > 0) {
      setCurrentPage(0);
    }
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

  if (isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading users...</Typography>
      </Box>
    );
  }
  if (isError) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">
          Error loading users:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </Typography>
      </Box>
    );
  }

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

      {/* Users Table */}
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
                        onClick={() => handleDelete(user.id)}
                        color="error"
                        title="Delete"
                      >
                        <DeleteIcon />
                      </IconButton>
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
