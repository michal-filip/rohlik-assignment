import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserDeleteDialog, UserDeleteDialogProps } from "../UserDeleteDialog";

describe("UserDeleteDialog", () => {
  const defaultProps: UserDeleteDialogProps = {
    open: true,
    user: {
      id: "1",
      name: "John",
      surname: "Doe",
      active: true,
      email: "john@example.com",
      phoneNumber: "123",
      createdAt: new Date().toISOString(),
    },
    onCancel: vi.fn(),
    onConfirm: vi.fn(),
  };

  it("renders dialog with user name and surname", () => {
    render(<UserDeleteDialog {...defaultProps} />);
    expect(screen.getByText("Confirm Deletion")).toBeInTheDocument();
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
  });

  it("calls onCancel when Cancel button is clicked", async () => {
    render(<UserDeleteDialog {...defaultProps} />);
    await userEvent.click(screen.getByText("Cancel"));
    expect(defaultProps.onCancel).toHaveBeenCalled();
  });

  it("calls onConfirm when Delete button is clicked", async () => {
    render(<UserDeleteDialog {...defaultProps} />);
    await userEvent.click(screen.getByText("Delete"));
    expect(defaultProps.onConfirm).toHaveBeenCalled();
  });
});
