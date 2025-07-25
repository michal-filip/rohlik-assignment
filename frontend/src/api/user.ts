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
