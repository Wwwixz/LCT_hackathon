import { useState } from "react";
import "../styles/student-dashboard.css";
import fireIcon from "../assets/scenarios/fire.png";
import crashIcon from "../assets/scenarios/crash.png";
import suspiciousIcon from "../assets/scenarios/suspicious.png";
import warningIcon from "../assets/icons/warning.png";
import moonIcon from "../assets/icons/moon.png";

type Difficulty = "ЛЁГКИЙ" | "СРЕДНИЙ" | "СЛОЖНЫЙ";

interface Scenario {
  id: string;
  icon: { src: string; width: number; height: number; format: string };
  difficulty: Difficulty;
  title: string;
  timeLimitSec: number;
}

const scenarios: Scenario[] = [
  {
    id: "fire",
    icon: fireIcon,
    difficulty: "ЛЁГКИЙ",
    title: "Пожар в жилой квартире",
    timeLimitSec: 240,
  },
  {
    id: "crash",
    icon: crashIcon,
    difficulty: "СРЕДНИЙ",
    title: "ДТП на перекрестке",
    timeLimitSec: 320,
  },
  {
    id: "suspicious",
    icon: suspiciousIcon,
    difficulty: "СРЕДНИЙ",
    title: "Подозрительная активность во дворе",
    timeLimitSec: 320,
  },
];

export default function StudentDashboard() {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(
    null,
  );
  const [nightShift, setNightShift] = useState(false);
  const [callerName, setCallerName] = useState("Стефан Салваторе");
  const [address, setAddress] = useState("ул.Ленина дом 12");
  const [incidentType, setIncidentType] = useState("Пожар");
  const [victims, setVictims] = useState("0");

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <div className="dashboard__profile">
          <div className="dashboard__logo">112</div>
          <div>
            <p className="dashboard__name">Аркад Студентович</p>
            <p className="dashboard__role">Студент</p>
          </div>
        </div>

        <div className="dashboard__actions">
          <button
            type="button"
            onClick={() => setNightShift((v) => !v)}
            className={`dashboard__shift-btn ${nightShift ? "dashboard__shift-btn--active" : ""}`}
          >
            <img
              src={moonIcon.src}
              alt=""
              className="dashboard__shift-icon"
              style={nightShift ? { filter: "invert(1)" } : undefined}
            />
            Ночная смена
          </button>
          <button type="button" className="dashboard__logout">
            Выйти
          </button>
        </div>
      </header>

      <div className="dashboard__body">
        <div className="dashboard__col-left">
          <section className="panel">
            <h2 className="panel__title">Выберите сценарий вызова</h2>
            <div className="scenario-grid">
              {scenarios.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedScenario(s.id)}
                  className={`scenario-card ${
                    selectedScenario === s.id ? "scenario-card--selected" : ""
                  }`}
                >
                  <div className="scenario-card__top">
                    <img
                      src={s.icon.src}
                      alt={s.title}
                      className="scenario-card__icon"
                    />
                    <span className="scenario-card__difficulty">
                      {s.difficulty}
                    </span>
                  </div>
                  <p className="scenario-card__title">{s.title}</p>
                  <p className="scenario-card__limit">
                    Лимит времени:{s.timeLimitSec}с
                  </p>
                </button>
              ))}
            </div>
          </section>

          <section className="panel">
            <button type="button" className="info-banner">
              <div className="info-banner__left">
                <img
                  src={warningIcon.src}
                  alt=""
                  className="info-banner__icon"
                />
                <div>
                  <p className="info-banner__title">Памятки и законы</p>
                  <p className="info-banner__subtitle">Для всех типов ЧС</p>
                </div>
              </div>
              <span className="info-banner__arrow">→</span>
            </button>
          </section>
        </div>

        <section className="panel dashboard__col-right call-card">
          <h2 className="panel__title" style={{ padding: 0 }}>
            Карточка вызова
          </h2>

          <div className="call-card__map">
            <span className="call-card__badge">
              <span className="call-card__dot" />
              Москва
            </span>
          </div>

          <div className="call-card__fields">
            <label className="field">
              <span className="field__label">ФИО звонящего</span>
              <input
                type="text"
                className="field__input"
                value={callerName}
                onChange={(e) => setCallerName(e.target.value)}
              />
            </label>

            <label className="field">
              <span className="field__label">Адрес</span>
              <input
                type="text"
                className="field__input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>

            <div className="call-card__row">
              <label className="field">
                <span className="field__label">Тип ЧС</span>
                <select
                  className="field__input field__input--select"
                  value={incidentType}
                  onChange={(e) => setIncidentType(e.target.value)}
                >
                  <option value="Пожар">Пожар</option>
                  <option value="ДТП">ДТП</option>
                  <option value="Правонарушение">Правонарушение</option>
                </select>
              </label>

              <label className="field">
                <span className="field__label">Пострадавшие</span>
                <input
                  type="number"
                  min={0}
                  className="field__input"
                  value={victims}
                  onChange={(e) => setVictims(e.target.value)}
                />
              </label>
            </div>

            <button type="button" className="call-card__submit">
              Уточнить адрес
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
