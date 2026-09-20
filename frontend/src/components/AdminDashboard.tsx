import logo112 from "../assets/logo112.png";
import { useState } from "react";
import { CopyPopup, DeletePopup } from "./Popups";
import "../styles/admin-dashboard.css";

const teachers = [
  { num: "1", name: "Анна Крюк", sessions: "ДВ 102 : 2 сессии", score: "26" },
  { num: "2", name: "Антон Малышков", sessions: "ДВ 102 : 2 сессии", score: "20" },
];

export default function AdminDashboard() {
  const [groupName, setGroupName] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [groupTitle, setGroupTitle] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [copyOpen, setCopyOpen] = useState(false);
  const [groups, setGroups] = useState([
    { name: "ДВ 102", owner: "Анна Книгер : 2 сессии" },
  ]);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);

  return (
    <div className="dashboard a-dashboard">
      <header className="dashboard__header">
        <div className="dashboard__profile">
          <div className="dashboard__logo"><img
          src={logo112.src}
          alt="112"
          className="dashboard__logo-img"
        /></div>
          <div>
            <p className="dashboard__name">Игнат Мустарович</p>
            <p className="dashboard__role">Администратор</p>
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

      <div className="a-body">
        <div className="a-col-left">
          <section
            className="panel a-panel a-teachers a-teachers--link"
            onClick={() => { window.location.href = "/admin/teachers"; }}
          >
            <h2 className="panel__title">Преподаватели</h2>
            {teachers.map((t) => (
              <div key={t.num} className="a-teacher-row">
                <span className="t-num">{t.num}</span>
                <span className="t-dot" />
                <div className="t-student-info">
                  <p className="t-student-name">{t.name}</p>
                  <p className="t-student-sub">{t.sessions}</p>
                </div>
                <span className="t-score">{t.score}</span>
              </div>
            ))}
            <p className="t-meta">Количество студентов: 46</p>
            <p className="t-meta a-meta-2">Количество преподавателей: 2</p>
          </section>

          <section className="panel a-panel a-groups">
            <h2 className="panel__title">Группы преподавателей</h2>
            <div className="t-create-row a-create-row">
              <input
                type="text"
                className="t-input t-input--outline a-input-outline"
                placeholder="Введите название группы"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
              <button type="button" className="t-btn-dark">
                Создать
              </button>
            </div>
            <div className="t-create-bottom a-create-bottom">
              <p className="t-hint">
                Скопируйте ссылку и отправьте ее
                <br />
                преподавателю.Ниже будет список всех
                <br />
                студентов
              </p>
              <button
                type="button"
                className="t-btn-navy"
                onClick={() => setCopyOpen(true)}
              >
                Скопировать ссылку
              </button>
            </div>
            {groups.map((g, i) => (
              <div
                key={g.name}
                className="a-group-row a-group-row--link"
                onClick={() => { window.location.href = "/admin/groups"; }}
              >
                <span className="t-num">{i + 1}</span>
                <div className="a-group-info">
                  <p className="t-student-name">{g.name}</p>
                  <p className="t-student-sub">{g.owner}</p>
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

        <div className="a-col-right">
          <section className="panel a-panel a-location">
            <h2 className="panel__title">Местоположение учебных заведений</h2>
            <div className="a-map">
              <div className="a-map__badge">
                <span className="a-map__dot" />
                Москва
              </div>
            </div>
            <button type="button" className="a-create-scenario">
              Создать сценарий
            </button>
          </section>

          <section className="panel a-panel a-add-teacher">
            <h2 className="panel__title">Добавить преподавателя</h2>
            <input
              type="text"
              className="t-input t-input--outline"
              placeholder="Введите фио преподавателя"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
            />
            <div className="a-add-row">
              <input
                type="text"
                className="t-input t-input--outline"
                placeholder="Введите почту преподавателя"
                value={teacherEmail}
                onChange={(e) => setTeacherEmail(e.target.value)}
              />
              <input
                type="text"
                className="t-input t-input--outline"
                placeholder="Название группы"
                value={groupTitle}
                onChange={(e) => setGroupTitle(e.target.value)}
              />
            </div>
            <button type="button" className="a-btn-add">
              Добавить
            </button>
          </section>
        </div>
      </div>

      {copyOpen && (
        <CopyPopup
          title="Скопируйте и отправьте логин преподавателю"
          value="student@ya.ru"
          onClose={() => setCopyOpen(false)}
        />
      )}
      {deleteIdx !== null && (
        <DeletePopup
          title="Удаление пользователя"
          question="Вы действительно хотите удалить этого пользователя?"
          warning="После подтверждения вернуть действие обратно не получится"
          onConfirm={() => {
            setGroups((gs) => gs.filter((_, i) => i !== deleteIdx));
            setDeleteIdx(null);
          }}
          onClose={() => setDeleteIdx(null)}
        />
      )}
    </div>
  );
}
