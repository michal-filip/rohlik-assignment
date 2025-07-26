import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserTable, UserTableProps } from "./UserTable";

const users = [
  {
    id: "1",
    name: "John",
    surname: "Doe",
    active: true,
    email: "john@example.com",
    phoneNumber: "123456789",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Jane",
    surname: "Smith",
    active: false,
    email: "jane@example.com",
    phoneNumber: "987654321",
    createdAt: new Date().toISOString(),
  },
];

describe("UserTable", () => {
  const defaultProps: UserTableProps = {
    users,
    onEdit: vi.fn(),
    onDelete: vi.fn(),
    onToggleStatus: vi.fn(),
  };

  it("renders all users", () => {
    render(<UserTable {...defaultProps} />);
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
    expect(screen.getByText("Smith")).toBeInTheDocument();
  });

  it("shows correct status chip", () => {
    render(<UserTable {...defaultProps} />);
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("Deactivated")).toBeInTheDocument();
  });

  it("calls onEdit when edit button is clicked", async () => {
    render(<UserTable {...defaultProps} />);
    const editButtons = screen.getAllByTitle("Edit");
    await userEvent.click(editButtons[0]);
    expect(defaultProps.onEdit).toHaveBeenCalledWith("1");
  });

  it("calls onDelete when delete button is clicked", async () => {
    render(<UserTable {...defaultProps} />);
    const deleteButtons = screen.getAllByTitle("Delete");
    await userEvent.click(deleteButtons[1]);
    expect(defaultProps.onDelete).toHaveBeenCalledWith(users[1]);
  });

  it("calls onToggleStatus when status button is clicked", async () => {
    render(<UserTable {...defaultProps} />);
    const statusButtons = screen.getAllByTitle(/Activate|Deactivate/);
    await userEvent.click(statusButtons[0]);
    expect(defaultProps.onToggleStatus).toHaveBeenCalledWith("1", false);
    await userEvent.click(statusButtons[1]);
    expect(defaultProps.onToggleStatus).toHaveBeenCalledWith("2", true);
  });
});
