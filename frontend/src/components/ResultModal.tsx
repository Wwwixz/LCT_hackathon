import "../styles/result-modal.css";

export interface ResultModalData {
  score: number;
  speed: number;
  accuracy: number;
  protocol: number;
  completed: string[];
  missed: string[];
}

interface ResultModalProps {
  data?: ResultModalData;
  achievementsLocked?: boolean;
  onClose: () => void;
  onNewCall: () => void;
}

const defaultData: ResultModalData = {
  score: 23,
  speed: 76,
  accuracy: 0,
  protocol: 0,
  completed: [],
  missed: ["адрес"],
};

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="result-metric">
      <div className="result-metric__head">
        <span className="result-metric__label">{label}</span>
        <span className="result-metric__value">{value}%</span>
      </div>
      <div className="result-metric__bar">
        <span className="result-metric__fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function ResultModal({
  data = defaultData,
  achievementsLocked = true,
  onClose,
  onNewCall,
}: ResultModalProps) {
  return (
    <div className="result-modal-overlay">
      <div className="result-modal">
        <div className="result-modal__head">
          <p className="result-modal__title">Результат</p>
          <button
            type="button"
            className="result-modal__close"
            aria-label="Закрыть"
            onClick={onClose}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              stroke="#141313"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M5 5L21 21" />
              <path d="M21 5L5 21" />
            </svg>
          </button>
        </div>

        <p className="result-modal__score">{data.score}</p>

        <div className="result-modal__metrics">
          <Metric label="Скорость" value={data.speed} />
          <Metric label="Точность" value={data.accuracy} />
          <Metric label="Соблюдение протокола" value={data.protocol} />
        </div>

        <div className="result-modal__tiles">
          <div className="result-tile result-tile--done">
            <p className="result-tile__title">Выполнено</p>
            {data.completed.length === 0 ? (
              <p className="result-tile__item result-tile__item--muted">-</p>
            ) : (
              data.completed.map((item) => (
                <p key={item} className="result-tile__item">
                  - {item}
                </p>
              ))
            )}
          </div>
          <div className="result-tile result-tile--missed">
            <p className="result-tile__title">Пропущено</p>
            {data.missed.length === 0 ? (
              <p className="result-tile__item result-tile__item--muted">-</p>
            ) : (
              data.missed.map((item) => (
                <p key={item} className="result-tile__item">
                  - {item}
                </p>
              ))
            )}
          </div>
        </div>

        {achievementsLocked && (
          <p className="result-modal__locked">достижения заблокированы</p>
        )}

        <button
          type="button"
          className="result-modal__new-call"
          onClick={onNewCall}
        >
          Новый вызов
        </button>
      </div>
    </div>
  );
}
