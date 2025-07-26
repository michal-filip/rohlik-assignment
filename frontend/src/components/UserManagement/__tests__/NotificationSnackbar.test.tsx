import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  NotificationSnackbar,
  NotificationSnackbarProps,
} from "../NotificationSnackbar";
import userEvent from "@testing-library/user-event";

describe("NotificationSnackbar", () => {
  const defaultProps: NotificationSnackbarProps = {
    open: true,
    message: "Test message",
    severity: "success",
    onClose: vi.fn(),
  };

  it("renders snackbar with message", () => {
    render(<NotificationSnackbar {...defaultProps} />);
    expect(screen.getByText("Test message")).toBeInTheDocument();
    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });

  it("calls onClose when closed", async () => {
    render(<NotificationSnackbar {...defaultProps} />);
    await userEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});
