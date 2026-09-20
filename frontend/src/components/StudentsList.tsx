import logo112 from "../assets/logo112.png";
import { useState } from "react";
import "../styles/students-list.css";

const students = [
  {
    name: "Магомед Абдулаев",
    group: "ДВ 102 : Анна Крюк",
    email: "maga@yandex.ru",
    score: "26",
    login: "anasya",
  },
  {
    name: "Азат Артурович",
    group: "ДК 102 : Анна Крюк",
    email: "azat@yandex.ru",
    score: "26",
    login: "gikast",
  },
];

interface StudentEntry {
  name: string;
  group: string;
  email: string;
  score: string;
  login: string;
}

interface StudentsListProps {
  breadcrumb?: string;
  labelsOnEveryRow?: boolean;
  view?: "teacher" | "admin";
  students?: StudentEntry[];
}

const profiles = {
  teacher: { name: "Вадим Викторович", role: "Преподаватель", back: "/teacher" },
  admin: { name: "Игнат Мустарович", role: "Администратор", back: "/admin" },
};

const defaultStudents: StudentEntry[] = [
  {
    name: "Магомед Абдулаев",
    group: "ДВ 102 : Анна Крюк",
    email: "maga@yandex.ru",
    score: "26",
    login: "anasya",
  },
  {
    name: "Азат Артурович",
    group: "ДК 102 : Анна Крюк",
    email: "azat@yandex.ru",
    score: "26",
    login: "gikastt",
  },
];

export default function StudentsList({
  breadcrumb,
  labelsOnEveryRow = false,
  view = "teacher",
  students = defaultStudents,
}: StudentsListProps) {
  const profile = profiles[view];
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const filtered = students.filter((s) =>
    (s.name + " " + s.email + " " + s.login + " " + s.group)
      .toLowerCase()
      .includes(q)
  );

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div className="dashboard__profile">
          <div className="dashboard__logo"><img
          src={logo112.src}
          alt="112"
          className="dashboard__logo-img"
        /></div>
          <div>
            <p className="dashboard__name">{profile.name}</p>
            <p className="dashboard__role">{profile.role}</p>
          </div>
        </div>

        <div className="dashboard__actions t-actions">
          <button type="button" className="t-pdf-btn">
            Экспортировать в PDF
          </button>
          <button
            type="button"
            className="dashboard__logout"
            onClick={() => { window.location.href = "/login"; }}
          >
            Выйти
          </button>
        </div>
      </header>

      <div className="stl-toolbar">
        <button
          type="button"
          className="stl-back"
          aria-label="Назад"
          onClick={() => { window.location.href = profile.back; }}
        >
          <svg
            width="44"
            height="24"
            viewBox="0 0 44 24"
            fill="none"
            stroke="#141313"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M42 12H3" />
            <path d="M13 3L3 12l10 9" />
          </svg>
        </button>
        <h1 className="stl-title">Студенты</h1>
        {breadcrumb && <span className="stl-breadcrumb">{breadcrumb}</span>}
        <div className="stl-tools">
          <label className="stl-search">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#8a8a8a"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="10.5" cy="10.5" r="6.5" />
              <path d="M15.5 15.5L21 21" />
            </svg>
            <input
              type="text"
              placeholder="Поиск ученика"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <button type="button" className="stl-filter" aria-label="Фильтр">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#141313"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 4h16" />
              <path d="M20 4v14.5" />
              <path d="M8 11h12" />
              <path d="M13 18.5h7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="stl-list">
        {filtered.map((s, i) => (
          <div className="stl-row" key={s.login}>
            <span className="stl-num">{i + 1}</span>
            <span className="stl-dot" />
            <div className="stl-name">
              <p className="stl-name__title">{s.name}</p>
              <p className="stl-name__sub">{s.group}</p>
            </div>
            <div className="stl-col stl-col--mail">
              {(i === 0 || labelsOnEveryRow) && <p className="stl-label">Почта</p>}
              <p className="stl-value">{s.email}</p>
            </div>
            <div className="stl-col stl-col--score">
              {(i === 0 || labelsOnEveryRow) && <p className="stl-label">Баллы</p>}
              <p className="stl-value">{s.score}</p>
            </div>
            <div className="stl-col stl-col--login">
              {(i === 0 || labelsOnEveryRow) && <p className="stl-label">Логин</p>}
              <p className="stl-value">{s.login}</p>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="stl-empty">Ничего не найдено</p>
        )}
      </div>
    </div>
  );
}
