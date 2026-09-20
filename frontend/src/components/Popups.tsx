import "../styles/popups.css";

const closeIcon = (
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
);

interface CopyPopupProps {
  title: string;
  value: string;
  onClose: () => void;
}

/** Попап «скопируйте и отправьте ...» с полем значения и красной кнопкой. */
export function CopyPopup({ title, value, onClose }: CopyPopupProps) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="popup__close"
          aria-label="Закрыть"
          onClick={onClose}
        >
          {closeIcon}
        </button>
        <p className="popup__title">{title}</p>
        <div className="popup__field">{value}</div>
        <button
          type="button"
          className="popup__copy"
          onClick={() => {
            try {
              navigator.clipboard?.writeText(value);
            } catch {
              /* буфер недоступен — просто закрываем */
            }
            onClose();
          }}
        >
          Скопировать
        </button>
      </div>
    </div>
  );
}

interface DeletePopupProps {
  title: string;
  question: string;
  warning: string;
  onConfirm: () => void;
  onClose: () => void;
}

/** Попап подтверждения удаления. */
export function DeletePopup({
  title,
  question,
  warning,
  onConfirm,
  onClose,
}: DeletePopupProps) {
  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup popup--delete" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="popup__close"
          aria-label="Закрыть"
          onClick={onClose}
        >
          {closeIcon}
        </button>
        <p className="popup__title popup__title--bold">{title}</p>
        <p className="popup__question">{question}</p>
        <p className="popup__warning">{warning}</p>
        <div className="popup__row">
          <button
            type="button"
            className="popup__confirm"
            onClick={onConfirm}
          >
            Да, удалить
          </button>
          <button type="button" className="popup__cancel" onClick={onClose}>
            Нет, отменить действие
          </button>
        </div>
      </div>
    </div>
  );
}
