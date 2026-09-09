import { useState, type FormEvent } from "react";
import { login, register } from "../lib/api";
import type { LoginPayload, RegisterPayload, Role } from "../types";
import "../styles/auth-card.css";

type Tab = "login" | "register";

interface AuthCardProps {
  defaultTab?: Tab;
}

export default function AuthCard({ defaultTab = "login" }: AuthCardProps) {
  const [tab, setTab] = useState<Tab>(defaultTab);
  const [loginData, setLoginData] = useState<LoginPayload>({
    email: "",
    password: "",
  });
  const [registerData, setRegisterData] = useState<RegisterPayload>({
    name: "",
    role: "student" as Role,
    email: "",
    password: "",
  });

  async function handleLoginSubmit(e: FormEvent) {
    e.preventDefault();
    await login(loginData);
  }

  async function handleRegisterSubmit(e: FormEvent) {
    e.preventDefault();
    await register(registerData);
  }

  return (
    <div className="auth-card">
      <div className="auth-card__header">
        <div className="auth-card__logo">112</div>
        <div>
          <h1 className="auth-card__title">112-симулятор</h1>
          <p className="auth-card__subtitle">
            Тренажёр оператора экстренных служб
          </p>
        </div>
      </div>

      <div className="auth-card__tabs">
        <button
          type="button"
          onClick={() => setTab("login")}
          className={`auth-card__tab ${tab === "login" ? "auth-card__tab--active" : ""}`}
        >
          Вход
        </button>
        <button
          type="button"
          onClick={() => setTab("register")}
          className={`auth-card__tab ${tab === "register" ? "auth-card__tab--active" : ""}`}
        >
          Регистрация
        </button>
      </div>

      <div className="auth-card__body">
        {tab === "login" && (
          <form onSubmit={handleLoginSubmit} className="auth-form">
            <Field label="Почта">
              <input
                type="email"
                required
                placeholder="student@ya.ru"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData((s) => ({ ...s, email: e.target.value }))
                }
                className="field__input"
              />
            </Field>

            <Field label="Пароль">
              <input
                type="password"
                required
                value={loginData.password}
                onChange={(e) =>
                  setLoginData((s) => ({ ...s, password: e.target.value }))
                }
                className="field__input"
              />
            </Field>

            <button type="submit" className="auth-submit">
              Войти
            </button>
          </form>
        )}

        {tab === "register" && (
          <form onSubmit={handleRegisterSubmit} className="auth-form">
            <Field label="Имя">
              <input
                type="text"
                required
                placeholder="student@ya.ru"
                value={registerData.name}
                onChange={(e) =>
                  setRegisterData((s) => ({ ...s, name: e.target.value }))
                }
                className="field__input"
              />
            </Field>

            <Field label="Роль">
              <select
                value={registerData.role}
                onChange={(e) =>
                  setRegisterData((s) => ({
                    ...s,
                    role: e.target.value as Role,
                  }))
                }
                className="field__input field__input--select"
              >
                <option value="student">Студент</option>
              </select>
            </Field>

            <Field label="Почта">
              <input
                type="email"
                required
                placeholder="student@ya.ru"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData((s) => ({ ...s, email: e.target.value }))
                }
                className="field__input"
              />
            </Field>

            <Field label="Пароль">
              <input
                type="password"
                required
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData((s) => ({ ...s, password: e.target.value }))
                }
                className="field__input"
              />
            </Field>

            <button type="submit" className="auth-submit">
              Зарегистрироваться
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      {children}
    </label>
  );
}
