export function requireManager(user?: { role?: string }) {
  if (user?.role !== "manager") {
    throw new Error("Forbidden: Manager access required")
  }
}

export function isManager(user?: { role?: string }): boolean {
  return user?.role === "manager"
}

export function isWorker(user?: { role?: string }): boolean {
  return user?.role === "worker"
}
