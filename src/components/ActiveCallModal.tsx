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
const WAVEFORM_HEIGHTS = Array.from({ length: 90 }, (_, i) =>
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
              ⤢
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
            🎤
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
