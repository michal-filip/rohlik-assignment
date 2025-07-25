import React from "react";
import {
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { format } from "date-fns";
import ClearIcon from "@mui/icons-material/Clear";

export interface UserFiltersProps {
  filters: {
    id: string;
    name: string;
    status: string;
    dateFrom: Date | null;
    dateTo: Date | null;
  };
  setFilters: (filters: any) => void;
  clearFilters: () => void;
}

export const UserFilters: React.FC<UserFiltersProps> = ({
  filters,
  setFilters,
  clearFilters,
}) => (
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
              setFilters((prev: any) => ({ ...prev, id: e.target.value }))
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
              setFilters((prev: any) => ({ ...prev, name: e.target.value }))
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
                setFilters((prev: any) => ({ ...prev, status: e.target.value }))
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
              setFilters((prev: any) => ({ ...prev, dateFrom: date }));
            }}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <TextField
            fullWidth
            type="date"
            label="Creation Date To"
            value={filters.dateTo ? format(filters.dateTo, "yyyy-MM-dd") : ""}
            onChange={(e) => {
              const date = e.target.value ? new Date(e.target.value) : null;
              setFilters((prev: any) => ({ ...prev, dateTo: date }));
            }}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
