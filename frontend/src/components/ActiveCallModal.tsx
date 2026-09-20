import { useState, type FormEvent } from "react";
import "../styles/active-call-modal.css";

export interface CallModalScenario {
  title: string;
  difficulty: string;
}

interface Message {
  id: string;
  from: "victim" | "operator";
  text: string;
}

interface ActiveCallModalProps {
  scenario: CallModalScenario;
  onClose: () => void;
  onFinish?: () => void;
}

// Высоты полосок волны — статичный узор, чтобы не пересчитывать на каждый рендер
const WAVEFORM_HEIGHTS = Array.from({ length: 160 }, (_, i) =>
  8 + Math.round(Math.abs(Math.sin(i * 0.7)) * 42),
);

export default function ActiveCallModal({
  scenario,
  onClose,
  onFinish,
}: ActiveCallModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: "m1", from: "victim", text: "Горит частный дом" },
    { id: "m2", from: "operator", text: "Круто" },
  ]);
  const [draft, setDraft] = useState("");

  function handleSend(e: FormEvent) {
    e.preventDefault();
    if (!draft.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), from: "operator", text: draft.trim() },
    ]);
    setDraft("");
  }

  return (
    <div className="call-modal-overlay">
      <div className="call-modal">
        <div className="call-modal__header">
          <div className="call-modal__title-row">
            <span className="call-modal__live-dot" />
            <div>
              <p className="call-modal__title">{scenario.title}</p>
              <p className="call-modal__status">Вызов активен</p>
            </div>
          </div>
          <div className="call-modal__meta">
            <span className="call-modal__difficulty">
              {scenario.difficulty}
            </span>
            <button
              type="button"
              className="call-modal__expand"
              aria-label="Развернуть"
            >
              <svg
                width="45"
                height="45"
                viewBox="0 0 46 46"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M31.9833 9.29586C32.0838 8.75281 31.7251 8.23105 31.1821 8.13049L22.3326 6.49168C21.7895 6.39112 21.2677 6.74983 21.1672 7.29288C21.0666 7.83593 21.4253 8.35768 21.9684 8.45825L29.8346 9.91496L28.3779 17.7812C28.2774 18.3243 28.6361 18.846 29.1791 18.9466C29.7222 19.0472 30.2439 18.6884 30.3445 18.1454L31.9833 9.29586ZM15 20.1138L15.5665 20.9378L31.5665 9.93781L31 9.11377L30.4335 8.28973L14.4335 19.2897L15 20.1138Z"
                  fill="white"
                />
                <path
                  d="M13.9422 36.6899C13.834 37.2314 14.1853 37.7582 14.7268 37.8665L23.5523 39.6306C24.0938 39.7388 24.6206 39.3875 24.7289 38.846C24.8371 38.3044 24.4858 37.7776 23.9443 37.6693L16.0995 36.1013L17.6675 28.2565C17.7758 27.7149 17.4245 27.1881 16.8829 27.0799C16.3414 26.9716 15.8146 27.3229 15.7063 27.8644L13.9422 36.6899ZM31.0771 26.1138L30.5224 25.2818L14.368 36.0539L14.9228 36.8859L15.4776 37.7179L31.6319 26.9458L31.0771 26.1138Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="call-modal__waveform">
          {WAVEFORM_HEIGHTS.map((h, i) => (
            <span
              key={i}
              className="call-modal__bar"
              style={{ height: `${h}px` }}
            />
          ))}
        </div>

        <div className="call-modal__chat">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`call-modal__bubble call-modal__bubble--${
                m.from === "victim" ? "victim" : "operator"
              }`}
            >
              <span className="call-modal__bubble-label">
                {m.from === "victim" ? "Пострадавший" : "Оператор"}
              </span>
              <p className="call-modal__bubble-text">{m.text}</p>
            </div>
          ))}
        </div>

        <form className="call-modal__footer" onSubmit={handleSend}>
          <input
            type="text"
            className="call-modal__input"
            placeholder="Введите ответ"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <button
            type="button"
            className="call-modal__mic"
            aria-label="Голосовой ввод"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#141313"
              strokeWidth="1.4"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M12 2.6C9.8 2.6 8.2 4.6 8.2 7.1C8.2 10.2 9.9 12.5 12 13.1C14.1 12.5 15.8 10.2 15.8 7.1C15.8 4.6 14.2 2.6 12 2.6Z" />
              <path d="M10.7 4.2V10.6" />
              <path d="M13.3 4.2V10.6" />
              <path d="M6.4 9.4V12C6.4 14.8 9 16.4 12 16.4C15 16.4 17.6 14.8 17.6 12V9.4" />
              <path d="M12 16.4V20.4" />
            </svg>
          </button>
          <button type="submit" className="call-modal__send">
            Отправить
          </button>
          <button
            type="button"
            className="call-modal__end"
            onClick={() => (onFinish ?? onClose)()}
          >
            Завершить
          </button>
        </form>
      </div>
    </div>
  );
}
