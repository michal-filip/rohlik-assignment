import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Box,
} from "@mui/material";
import { format } from "date-fns";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  PowerSettingsNew as PowerIcon,
} from "@mui/icons-material";
import type { User } from "../../api/user";

export interface UserTableProps {
  users: User[];
  onEdit: (id: string) => void;
  onDelete: (user: User) => void;
  onToggleStatus: (id: string, active: boolean) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  onEdit,
  onDelete,
  onToggleStatus,
}) => (
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
        {users.map((user) => (
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
            <TableCell>{format(new Date(user.createdAt), "PP")}</TableCell>
            <TableCell>
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => onToggleStatus(user.id, !user.active)}
                  color={user.active ? "error" : "success"}
                  title={user.active ? "Deactivate" : "Activate"}
                >
                  <PowerIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => onEdit(user.id)}
                  color="primary"
                  title="Edit"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => onDelete(user)}
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
);
