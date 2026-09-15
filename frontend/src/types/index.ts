// Роли пользователей в системе.
export type Role = "student" | "operator" | "admin";

// Контракт запроса на /auth/login — согласовать с бэкендом перед интеграцией
export interface LoginPayload {
  email: string;
  password: string;
}

// Контракт запроса на /auth/register — согласовать с бэкендом перед интеграцией
export interface RegisterPayload {
  name: string;
  role: Role;
  email: string;
  password: string;
}
