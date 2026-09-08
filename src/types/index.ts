// Роли пользователей в системе.
// TODO: добавить 'operator' и 'admin' когда появятся соответствующие экраны
export type Role = "student";

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
