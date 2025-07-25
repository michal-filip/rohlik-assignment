export type User = {
  id: string;
  name: string;
  surname: string;
  active: boolean;
  email: string;
  phoneNumber: string;
  createdAt: string;
};

export type PaginatedResult<T> = {
  content: T[];
  totalElements: number;
};


export type UserFilters = {
  name?: string;
  surname?: string;
  email?: string;
  active?: boolean;
};

export async function fetchUsers(
  pageNumber = 0,
  limit = 10,
  filters: UserFilters = {}
): Promise<PaginatedResult<User>> {
  const params = new URLSearchParams({
    pageNumber: pageNumber.toString(),
    limit: limit.toString(),
  });
  if (filters.name) params.append("name", filters.name);
  if (filters.surname) params.append("surname", filters.surname);
  if (filters.email) params.append("email", filters.email);
  if (typeof filters.active === "boolean") params.append("active", String(filters.active));
  const res = await fetch(`http://localhost:8090/api/users?${params}`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function toggleUserActive(
  userId: string,
  active: boolean
): Promise<void> {
  const res = await fetch(`http://localhost:8090/api/users/${userId}/active`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ active }),
  });
  if (!res.ok) {
    throw new Error("Failed to update user active state");
  }
}

export async function deleteUser(userId: string): Promise<void> {
  const res = await fetch(`http://localhost:8090/api/users/${userId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete user");
  }
}
