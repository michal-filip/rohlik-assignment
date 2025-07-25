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

export async function fetchUsers(
  pageNumber = 0,
  limit = 10
): Promise<PaginatedResult<User>> {
  const params = new URLSearchParams({
    pageNumber: pageNumber.toString(),
    limit: limit.toString(),
  });
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
