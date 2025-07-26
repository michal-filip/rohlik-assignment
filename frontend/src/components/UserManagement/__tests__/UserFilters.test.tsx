import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserFilters, UserFiltersProps } from "../UserFilters";

describe("UserFilters", () => {
  const defaultProps: UserFiltersProps = {
    filters: {
      id: "",
      name: "",
      status: "",
      dateFrom: null,
      dateTo: null,
    },
    setFilters: vi.fn(),
    clearFilters: vi.fn(),
  };

  it("renders filter fields and clear button", () => {
    render(<UserFilters {...defaultProps} />);
    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.getByLabelText("User ID")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByText("Clear Filters")).toBeInTheDocument();
  });

  it("calls clearFilters when clear button is clicked", async () => {
    render(<UserFilters {...defaultProps} />);
    await userEvent.click(screen.getByText("Clear Filters"));
    expect(defaultProps.clearFilters).toHaveBeenCalled();
  });

  it("calls setFilters when typing in User ID field", async () => {
    render(<UserFilters {...defaultProps} />);
    await userEvent.type(screen.getByLabelText("User ID"), "123");
    expect(defaultProps.setFilters).toHaveBeenCalled();
  });
});
