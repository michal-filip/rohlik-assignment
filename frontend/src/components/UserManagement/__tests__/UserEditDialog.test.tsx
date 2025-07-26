import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEditDialog, UserEditDialogProps } from "../UserEditDialog";
import { UseFormReturn } from "react-hook-form";

const mockForm: UseFormReturn<any> = {
  register: () => ({}),
  handleSubmit: (fn: any) => fn,
  reset: vi.fn(),
  formState: { errors: {} },
} as any;

describe("UserEditDialog", () => {
  const defaultProps: UserEditDialogProps = {
    open: true,
    userToEdit: {
      id: "1",
      name: "John",
      surname: "Doe",
      active: true,
      email: "john@example.com",
      phoneNumber: "123",
      createdAt: new Date().toISOString(),
    },
    form: mockForm,
    onSubmit: vi.fn(),
    onClose: vi.fn(),
    isSubmitting: false,
  };

  it("renders dialog with user fields", () => {
    render(<UserEditDialog {...defaultProps} />);
    expect(screen.getByText("Edit User")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Surname")).toBeInTheDocument();
  });

  it("calls onClose when Cancel button is clicked", async () => {
    render(<UserEditDialog {...defaultProps} />);
    await userEvent.click(screen.getByText("Cancel"));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
