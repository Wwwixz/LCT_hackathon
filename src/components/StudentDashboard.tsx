import { useState } from "react";
import fireImg from "../assets/scenarios/fire.png";

type Difficulty = "Лёгкий" | "Средний" | "Сложный";

interface Scenario {
  id: string;
  image: string | null;
  emoji: string;
  difficulty: Difficulty;
  title: string;
  timeLimitSec: number;
}

const scenarios: Scenario[] = [
  {
    id: "fire",
    image: fireImg,
    emoji: "🔥",
    difficulty: "Лёгкий",
    title: "Пожар в жилой квартире",
    timeLimitSec: 240,
  },
  {
    id: "crash",
    image: null,
    emoji: "🚗",
    difficulty: "Средний",
    title: "ДТП на перекрестке",
    timeLimitSec: 320,
  },
  {
    id: "suspicious",
    image: null,
    emoji: "🕵️",
    difficulty: "Средний",
    title: "Подозрительная активность во дворе",
    timeLimitSec: 320,
  },
];

const difficultyColor: Record<Difficulty, string> = {
  Лёгкий: "text-[#141313]/60",
  Средний: "text-[#141313]/60",
  Сложный: "text-[#DC2626]",
};

export default function StudentDashboard() {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(
    null,
  );
  const [callerName, setCallerName] = useState("Стефан Салваторе");
  const [address, setAddress] = useState("ул.Ленина дом 12");
  const [incidentType, setIncidentType] = useState("Пожар");
  const [victims, setVictims] = useState("0");
  const [nightShift, setNightShift] = useState(false);

  return (
    <div className="mx-auto max-w-[1100px] p-6">
      {/* Шапка */}
      <div className="mb-6 flex items-center justify-between border-b border-[#BEBEBE]/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#DC2626] text-lg font-bold text-white">
            21
          </div>
          <div>
            <p className="text-sm font-semibold text-[#141313]">
              Аркад Студентович
            </p>
            <p className="text-sm text-[#141313]/60">Студент</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => setNightShift((v) => !v)}
            className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${
              nightShift
                ? "border-[#141313] bg-[#141313] text-white"
                : "border-[#141313]/30 bg-white text-[#141313]"
            }`}
          >
            🌙 Ночная смена
          </button>
          <button
            type="button"
            className="text-sm font-medium text-[#132353] hover:underline"
          >
            Выйти
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* Левая колонка */}
        <div className="space-y-6">
          <div className="rounded-3xl bg-white p-6">
            <h2 className="mb-4 text-base font-semibold text-[#141313]">
              Выберите сценарий вызова
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {scenarios.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedScenario(s.id)}
                  className={`rounded-2xl border p-4 text-left transition-colors ${
                    selectedScenario === s.id
                      ? "border-[#DC2626] ring-1 ring-[#DC2626]/30"
                      : "border-[#BEBEBE]/60 hover:border-[#141313]/30"
                  }`}
                >
                  <div className="mb-3 flex items-start justify-between">
                    {s.image ? (
                      <img
                        src={s.image}
                        alt={s.title}
                        className="h-14 w-14 object-contain"
                      />
                    ) : (
                      <span className="text-3xl leading-none">{s.emoji}</span>
                    )}
                    <span
                      className={`text-xs font-semibold uppercase tracking-wide ${difficultyColor[s.difficulty]}`}
                    >
                      {s.difficulty}
                    </span>
                  </div>
                  <p className="mb-1 text-sm font-semibold text-[#141313]">
                    {s.title}
                  </p>
                  <p className="text-xs text-[#141313]/50">
                    Лимит времени: {s.timeLimitSec}с
                  </p>
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="flex w-full items-center justify-between rounded-3xl bg-white p-6 text-left transition-colors hover:bg-[#F3F3F4]"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl leading-none">⚠️</span>
              <div>
                <p className="text-sm font-semibold text-[#141313]">
                  Памятки и законы
                </p>
                <p className="text-xs text-[#141313]/50">
                  Для всех типов ЧС
                </p>
              </div>
            </div>
            <span className="text-[#141313]/60">→</span>
          </button>
        </div>

        {/* Правая колонка — карточка вызова */}
        <div className="rounded-3xl bg-white p-6">
          <h2 className="mb-4 text-base font-semibold text-[#141313]">
            Карточка вызова
          </h2>

          <div className="relative mb-5 h-[180px] w-full rounded-2xl bg-[#D9D9D9]">
            <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-[#141313]">
              <span className="h-2 w-2 rounded-full bg-[#DC2626]" />
              Москва
            </span>
          </div>

          <div className="space-y-4">
            <Field label="ФИО звонящего">
              <input
                type="text"
                value={callerName}
                onChange={(e) => setCallerName(e.target.value)}
                className={inputClasses}
              />
            </Field>

            <Field label="Адрес">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={inputClasses}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Тип ЧС">
                <select
                  value={incidentType}
                  onChange={(e) => setIncidentType(e.target.value)}
                  className={`${inputClasses} appearance-none`}
                >
                  <option value="Пожар">Пожар</option>
                  <option value="ДТП">ДТП</option>
                  <option value="Правонарушение">Правонарушение</option>
                </select>
              </Field>

              <Field label="Пострадавшие">
                <input
                  type="number"
                  min={0}
                  value={victims}
                  onChange={(e) => setVictims(e.target.value)}
                  className={inputClasses}
                />
              </Field>
            </div>

            <button
              type="button"
              className="w-full rounded-xl bg-[#DC2626] py-4 text-sm font-semibold text-white transition-colors hover:bg-[#c11f1f] active:bg-[#a91b1b]"
            >
              Уточнить адрес
            </button>
          </div>
        </div>
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
      <span className="mb-1.5 block text-sm font-medium text-[#141313]">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClasses =
  "w-full rounded-xl border-none bg-[#F3F3F4] px-4 py-3.5 text-sm text-[#141313] outline-none transition-colors focus:ring-2 focus:ring-[#DC2626]/30";
