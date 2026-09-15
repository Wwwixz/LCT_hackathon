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
}

// Высоты полосок волны — статичный узор, чтобы не пересчитывать на каждый рендер
const WAVEFORM_HEIGHTS = Array.from({ length: 160 }, (_, i) =>
  8 + Math.round(Math.abs(Math.sin(i * 0.7)) * 42),
);

export default function ActiveCallModal({
  scenario,
  onClose,
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
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path d="M12.5 3.5H16.5V7.5Z" fill="white" />
                <path d="M3.5 12.5V16.5H7.5Z" fill="white" />
                <path
                  d="M4.8 15.2L15.2 4.8"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
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
          <button type="button" className="call-modal__end" onClick={onClose}>
            Завершить
          </button>
        </form>
      </div>
    </div>
  );
}
