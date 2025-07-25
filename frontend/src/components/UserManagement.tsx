import React, { useState, useMemo } from "react";
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

interface User {
  id: string;
  name: string;
  surname: string;
  status: "active" | "deactivated";
  email: string;
  telephone: string;
  creationDate: Date;
}

// Mock data
const mockUsers: User[] = [
  {
    id: "001",
    name: "John",
    surname: "Doe",
    status: "active",
    email: "john.doe@example.com",
    telephone: "+1 (555) 123-4567",
    creationDate: new Date("2024-01-15"),
  },
  {
    id: "002",
    name: "Jane",
    surname: "Smith",
    status: "active",
    email: "jane.smith@example.com",
    telephone: "+1 (555) 234-5678",
    creationDate: new Date("2024-02-20"),
  },
  {
    id: "003",
    name: "Bob",
    surname: "Johnson",
    status: "deactivated",
    email: "bob.johnson@example.com",
    telephone: "+1 (555) 345-6789",
    creationDate: new Date("2024-01-10"),
  },
  {
    id: "004",
    name: "Alice",
    surname: "Williams",
    status: "active",
    email: "alice.williams@example.com",
    telephone: "+1 (555) 456-7890",
    creationDate: new Date("2024-03-05"),
  },
  {
    id: "005",
    name: "Charlie",
    surname: "Brown",
    status: "deactivated",
    email: "charlie.brown@example.com",
    telephone: "+1 (555) 567-8901",
    creationDate: new Date("2023-12-15"),
  },
  {
    id: "006",
    name: "Diana",
    surname: "Davis",
    status: "active",
    email: "diana.davis@example.com",
    telephone: "+1 (555) 678-9012",
    creationDate: new Date("2024-02-28"),
  },
  {
    id: "007",
    name: "Frank",
    surname: "Miller",
    status: "active",
    email: "frank.miller@example.com",
    telephone: "+1 (555) 789-0123",
    creationDate: new Date("2024-01-25"),
  },
  {
    id: "008",
    name: "Grace",
    surname: "Wilson",
    status: "deactivated",
    email: "grace.wilson@example.com",
    telephone: "+1 (555) 890-1234",
    creationDate: new Date("2023-11-30"),
  },
  {
    id: "009",
    name: "Henry",
    surname: "Taylor",
    status: "active",
    email: "henry.taylor@example.com",
    telephone: "+1 (555) 901-2345",
    creationDate: new Date("2024-03-10"),
  },
  {
    id: "010",
    name: "Ivy",
    surname: "Anderson",
    status: "active",
    email: "ivy.anderson@example.com",
    telephone: "+1 (555) 012-3456",
    creationDate: new Date("2024-02-14"),
  },
];

export function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockUsers);
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
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesId =
        !filters.id || user.id.toLowerCase().includes(filters.id.toLowerCase());
      const matchesName =
        !filters.name ||
        user.name.toLowerCase().includes(filters.name.toLowerCase()) ||
        user.surname.toLowerCase().includes(filters.name.toLowerCase());
      const matchesStatus =
        filters.status === "all" || user.status === filters.status;
      const matchesDateFrom =
        !filters.dateFrom || user.creationDate >= filters.dateFrom;
      const matchesDateTo =
        !filters.dateTo || user.creationDate <= filters.dateTo;

      return (
        matchesId &&
        matchesName &&
        matchesStatus &&
        matchesDateFrom &&
        matchesDateTo
      );
    });
  }, [users, filters]);

  // Paginate filtered users
  const paginatedUsers = filteredUsers.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  const showSnackbar = (
    message: string,
    severity: "success" | "info" | "warning" | "error" = "success"
  ) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleStatusToggle = (userId: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === "active" ? "deactivated" : "active",
            }
          : user
      )
    );
    showSnackbar("User status updated successfully");
  };

  const handleEdit = (userId: string) => {
    showSnackbar(`Edit user ${userId} - Feature coming soon`, "info");
  };

  const handleDelete = (userId: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    showSnackbar("User deleted successfully");
    // Reset to first page if current page becomes empty
    if (paginatedUsers.length === 1 && currentPage > 0) {
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
          Showing {paginatedUsers.length} of {filteredUsers.length} users
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
              {paginatedUsers.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.surname}</TableCell>
                  <TableCell>
                    <Chip
                      label={
                        user.status === "active" ? "Active" : "Deactivated"
                      }
                      color={user.status === "active" ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.telephone}</TableCell>
                  <TableCell>{format(user.creationDate, "PP")}</TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => handleStatusToggle(user.id)}
                        color={user.status === "active" ? "error" : "success"}
                        title={
                          user.status === "active" ? "Deactivate" : "Activate"
                        }
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

        {paginatedUsers.length === 0 && (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography color="text.secondary">
              No users found matching the current filters.
            </Typography>
          </Box>
        )}

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredUsers.length}
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
