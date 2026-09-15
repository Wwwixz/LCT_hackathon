import type { LoginPayload, RegisterPayload } from "../types";

// TODO(backend): заменить на реальный fetch("/api/auth/login")
export async function login(payload: LoginPayload) {
  console.log(payload);
  return { success: true };
}

// TODO(backend): заменить на реальный fetch("/api/auth/register")
export async function register(payload: RegisterPayload) {
  console.log(payload);
  return { success: true };
}
