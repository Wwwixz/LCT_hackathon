import logo112 from "../assets/logo112.png";
import { useState } from "react";
import { CopyPopup, DeletePopup } from "./Popups";
import "../styles/teacher-dashboard.css";

export default function TeacherDashboard() {
  const [scenarioName, setScenarioName] = useState("Стефан Салваторе");
  const [disasterType, setDisasterType] = useState("Пожар");
  const [difficulty, setDifficulty] = useState("Легкой");
  const [context, setContext] = useState("");
  const [address, setAddress] = useState("");
  const [timeLimit, setTimeLimit] = useState("0 сек");
  const [groupName, setGroupName] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [copyOpen, setCopyOpen] = useState(false);
  const [groupStudents, setGroupStudents] = useState([
    { name: "Аркад Студентович", sub: "ДВ 102 : 2 сессии" },
  ]);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);

  return (
    <div className="dashboard t-dashboard">
      <header className="dashboard__header t-header">
        <div className="dashboard__profile">
          <div className="dashboard__logo"><img
          src={logo112.src}
          alt="112"
          className="dashboard__logo-img"
        /></div>
          <div>
            <p className="dashboard__name">Вадим Викторович</p>
            <p className="dashboard__role">Преподаватель</p>
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

      <div className="t-body">
        <div className="t-col-left">
          <section
            className="panel t-panel t-students t-students--link"
            onClick={() => { window.location.href = "/groups"; }}
          >
            <h2 className="panel__title">Студенты группы</h2>
            <div className="t-student-row">
              <span className="t-num">1</span>
              <span className="t-dot" />
              <div className="t-student-info">
                <p className="t-student-name">Аркад Студентович</p>
                <p className="t-student-sub">ДВ 102 : 2 сессии</p>
              </div>
              <span className="t-score">26</span>
            </div>
            <p className="t-meta">Среднее: 26</p>
            <p className="t-meta">Количество учащихся: 26</p>
          </section>

          <section
            className="panel t-panel t-distribution t-students--link"
            onClick={() => { window.location.href = "/groups"; }}
          >
            <h2 className="panel__title">Распределение баллов по группе</h2>
            <div className="t-dist-row">
              <span className="t-dist-name">Аркад Студентович</span>
              <div className="t-slider">
                <span className="t-slider__rest" />
                <span className="t-slider__fill" />
              </div>
              <span className="t-score">26</span>
            </div>
          </section>

          <section className="panel t-panel t-create-group">
            <h2 className="panel__title">Создать группу</h2>
            <div className="t-create-row">
              <input
                type="text"
                className="t-input t-input--outline"
                placeholder="Введите название группы"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
              <button type="button" className="t-btn-dark">
                Создать
              </button>
            </div>
            <div className="t-create-bottom">
              <p className="t-hint">
                Скопируйте ссылку и отправьте ее
                <br />
                студенту.Либо будет список всех студентов
              </p>
              <button
                type="button"
                className="t-btn-navy"
                onClick={() => setCopyOpen(true)}
              >
                Скопировать ссылку
              </button>
            </div>
            {groupStudents.map((s, i) => (
              <div
                key={s.name}
                className="t-group-row t-group-row--link"
                onClick={() => { window.location.href = "/groups"; }}
              >
                <span className="t-num">{i + 1}</span>
                <div className="t-student-info">
                  <p className="t-student-name">{s.name}</p>
                  <p className="t-student-sub">{s.sub}</p>
                </div>
                <button
                  type="button"
                  className="t-delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteIdx(i);
                  }}
                >
                  Удалить
                </button>
              </div>
            ))}
          </section>
        </div>

        <div className="t-col-right">
          <section className="panel t-panel t-constructor">
            <h2 className="panel__title">Конструктор сценариев</h2>

            <span className="t-label">Название сценария</span>
            <input
              type="text"
              className="t-input"
              value={scenarioName}
              onChange={(e) => setScenarioName(e.target.value)}
            />

            <div className="t-selects">
              <div className="t-select-wrap">
                <select
                  className="t-input t-select"
                  value={disasterType}
                  onChange={(e) => setDisasterType(e.target.value)}
                >
                  <option value="Пожар">Пожар</option>
                  <option value="ДТП">ДТП</option>
                  <option value="Правонарушение">Правонарушение</option>
                </select>
              </div>
              <div className="t-select-wrap">
                <select
                  className="t-input t-select"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value="Легкой">Легкой</option>
                  <option value="Средней">Средней</option>
                  <option value="Сложной">Сложной</option>
                </select>
              </div>
            </div>

            <input
              type="text"
              className="t-input"
              placeholder="Контекст для ИИ-собеседника(Описание ситуации происходящего)"
              value={context}
              onChange={(e) => setContext(e.target.value)}
            />

            <input
              type="text"
              className="t-input"
              placeholder="Адрес,фио,пострадавшие"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <span className="t-label">Лимит времени</span>
            <input
              type="text"
              className="t-input"
              value={timeLimit}
              onChange={(e) => setTimeLimit(e.target.value)}
            />

            <button type="button" className="t-create-scenario">
              Создать сценарий
            </button>
          </section>

          <section className="panel t-panel t-monitoring">
            <h2 className="panel__title">Мониторинг активной сессии</h2>
            <div className="t-monitor-row">
              <input
                type="text"
                className="t-input t-input--outline"
                placeholder="ID сессии студента"
                value={sessionId}
                onChange={(e) => setSessionId(e.target.value)}
              />
              <button type="button" className="t-btn-dark">
                Смотреть
              </button>
            </div>
          </section>
        </div>
      </div>

      {copyOpen && (
        <CopyPopup
          title="Скопируйте и отправьте ссылку студенту"
          value="112-sim.ru/join/dv-102"
          onClose={() => setCopyOpen(false)}
        />
      )}
      {deleteIdx !== null && (
        <DeletePopup
          title="Удаление студента"
          question="Вы действительно хотите удалить этого студента?"
          warning="После подтверждения вернуть действие обратно не получится"
          onConfirm={() => {
            setGroupStudents((ss) => ss.filter((_, i) => i !== deleteIdx));
            setDeleteIdx(null);
          }}
          onClose={() => setDeleteIdx(null)}
        />
      )}
    </div>
  );
}
