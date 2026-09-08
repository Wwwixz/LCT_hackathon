import { useState, type FormEvent } from "react";
import { login, register } from "../lib/api";
import type { LoginPayload, RegisterPayload, Role } from "../types";

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
    <div className="w-full max-w-[652px] rounded-[24px] bg-card-gray p-6 pb-0">
      {/* Шапка */}
      <div className="flex items-center gap-3 px-2 pb-6 pt-2">
        <div className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-full bg-brand-red text-lg font-bold text-white">
          112
        </div>
        <div>
          <h1 className="text-lg font-semibold text-text-dark">
            112-симулятор
          </h1>
          <p className="text-sm text-text-dark/70">
            Тренажёр оператора экстренных служб
          </p>
        </div>
      </div>

      {/* Табы */}
      <div className="grid grid-cols-2">
        <button
          type="button"
          onClick={() => setTab("login")}
          className={`rounded-t-[24px] py-4 text-sm font-medium transition-colors ${
            tab === "login"
              ? "bg-white text-text-dark"
              : "bg-card-gray text-text-dark/60"
          }`}
        >
          Вход
        </button>
        <button
          type="button"
          onClick={() => setTab("register")}
          className={`rounded-t-[24px] py-4 text-sm font-medium transition-colors ${
            tab === "register"
              ? "bg-white text-text-dark"
              : "bg-card-gray text-text-dark/60"
          }`}
        >
          Регистрация
        </button>
      </div>

      {/* Контент */}
      <div className="rounded-b-[24px] bg-white px-6 py-8">
        {tab === "login" && (
          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <Field label="Почта">
              <input
                type="email"
                required
                placeholder="student@ya.ru"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData((s) => ({ ...s, email: e.target.value }))
                }
                className={inputClasses}
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
                className={inputClasses}
              />
            </Field>

            <button type="submit" className={submitClasses}>
              Войти
            </button>
          </form>
        )}

        {tab === "register" && (
          <form onSubmit={handleRegisterSubmit} className="space-y-5">
            <Field label="Имя">
              <input
                type="text"
                required
                placeholder="student@ya.ru"
                value={registerData.name}
                onChange={(e) =>
                  setRegisterData((s) => ({ ...s, name: e.target.value }))
                }
                className={inputClasses}
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
                className={`${inputClasses} appearance-none`}
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
                className={inputClasses}
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
                className={inputClasses}
              />
            </Field>

            <button type="submit" className={submitClasses}>
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
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-label-blue">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClasses =
  "w-full rounded-xl border-none bg-field-gray px-4 py-3.5 text-sm text-text-dark outline-none transition-colors focus:ring-2 focus:ring-brand-red/30";

const submitClasses =
  "w-full rounded-xl bg-brand-red py-4 text-sm font-semibold text-white transition-colors hover:bg-[#c11f1f] active:bg-[#a91b1b]";
