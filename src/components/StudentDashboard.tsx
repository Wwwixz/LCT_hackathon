import { useState } from "react";
import fireImg from "../assets/scenarios/fire.png";
import crashImg from "../assets/scenarios/crash.png";
import suspiciousImg from "../assets/scenarios/suspicious.png";

type Difficulty = "Лёгкий" | "Средний" | "Сложный";

interface Scenario {
  id: string;
  image: { src: string; width: number; height: number; format: string };
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
    image: crashImg,
    emoji: "🚗",
    difficulty: "Средний",
    title: "ДТП на перекрестке",
    timeLimitSec: 320,
  },
  {
    id: "suspicious",
    image: suspiciousImg,
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
    <div className="min-h-screen bg-white text-[#141313]">
      {/* Шапка */}
      <header className="relative h-[154px] w-full border-b border-[#BEBEBE]">
        <div className="mx-auto flex h-full max-w-[1820px] items-center justify-between px-[53px]">
          <div className="flex items-center gap-[70px]">
            <div className="flex h-[100px] w-[100px] shrink-0 items-center justify-center rounded-full bg-[#DC2626] text-4xl font-bold text-white">
              21
            </div>
            <div>
              <p className="text-[22px] font-semibold leading-tight text-[#141313]">
                Аркад Студентович
              </p>
              <p className="mt-1 text-[18px] text-[#141313]/60">Студент</p>
            </div>
          </div>

          <div className="flex items-center gap-[48px]">
            <button
              type="button"
              onClick={() => setNightShift((v) => !v)}
              className={`rounded-[11.5px] border px-7 py-4 text-[17px] font-medium transition-colors ${
                nightShift
                  ? "border-[#141313] bg-[#141313] text-white"
                  : "border-[#141313]/30 bg-white text-[#141313]"
              }`}
            >
              🌙 Ночная смена
            </button>

            <div className="flex h-[65px] w-[285px] items-center gap-4 rounded-[11.5px] border border-black bg-white px-[35px] py-[12.5px]">
              <div className="h-10 w-[42px] shrink-0 rounded bg-[#F3F3F4]" />
              <span className="text-[17px] font-semibold text-[#132353]">
                Профиль
              </span>
            </div>

            <button
              type="button"
              className="text-[17px] font-medium text-[#132353] hover:underline"
            >
              Выйти
            </button>
          </div>
        </div>
      </header>

      {/* Основной контент */}
      <main className="mx-auto flex max-w-[1820px] gap-[72px] px-[53px] py-[37px]">
        {/* Левая колонка */}
        <div className="flex w-[989px] shrink-0 flex-col gap-[32px]">
          {/* Блок сценариев */}
          <div className="rounded-[24px] bg-white px-[54px] py-[56px] shadow-[0_4px_50px_rgba(0,0,0,0.08)]">
            <h2 className="mb-[45px] text-[26px] font-semibold leading-tight text-[#141313]">
              Выберите сценарий вызова
            </h2>
            <div className="grid grid-cols-2 gap-[36px]">
              {scenarios.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedScenario(s.id)}
                  className={`flex h-[231.5px] w-[464px] flex-col rounded-[23.75px] border border-[#BEBEBE] bg-white p-[32px] text-left transition-all ${
                    selectedScenario === s.id
                      ? "border-[#DC2626] shadow-[0_0_0_1px_rgba(220,38,38,0.3)]"
                      : "hover:border-[#141313]/30"
                  }`}
                >
                  <div className="mb-[28px] flex items-start justify-between">
                    <img
                      src={s.image.src}
                      alt={s.title}
                      className="h-[106px] w-[117px] rounded-lg object-contain"
                    />
                    <span
                      className={`text-[13px] font-semibold uppercase tracking-wide ${difficultyColor[s.difficulty]}`}
                    >
                      {s.difficulty}
                    </span>
                  </div>
                  <p className="mb-[10px] text-[20px] font-semibold leading-tight text-[#141313]">
                    {s.title}
                  </p>
                  <p className="mt-auto text-[15px] text-[#141313]/50">
                    Лимит времени: {s.timeLimitSec}с
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Аудио волны + кнопка 911 */}
          <div className="rounded-[24px] bg-white px-[54px] py-[45px] shadow-[0_4px_50px_rgba(0,0,0,0.08)]">
            {/* Декоративные аудио-волны */}
            <div className="mb-[45px] flex h-[56px] items-end justify-center gap-[3px]">
              {Array.from({ length: 70 }).map((_, i) => {
                const h = 10 + Math.abs(Math.sin(i * 0.7) * 46);
                const tall = i % 4 === 0;
                return (
                  <div
                    key={i}
                    className="w-[3px] rounded-full bg-[#DC2626]"
                    style={{ height: `${tall ? h + 10 : h}px` }}
                  />
                );
              })}
            </div>

            {/* Кнопка 911 Вызов */}
            <button
              type="button"
              className="flex h-[103px] w-full items-center justify-center gap-[20px] rounded-[24px] bg-[#DC2626] px-[40px] transition-colors hover:bg-[#c11f1f] active:bg-[#a91b1b]"
            >
              <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full border-2 border-white">
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
              </div>
              <span className="text-[28px] font-bold leading-none text-white">
                911 Вызов
              </span>
            </button>
          </div>

          {/* Памятки и законы */}
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-[24px] bg-white px-[54px] py-[45px] text-left shadow-[0_4px_50px_rgba(0,0,0,0.08)] transition-colors hover:bg-[#F3F3F4]"
          >
            <div className="flex items-center gap-[30px]">
              <span className="text-5xl leading-none">⚠️</span>
              <div>
                <p className="text-[22px] font-semibold leading-tight text-[#141313]">
                  Памятки и законы
                </p>
                <p className="mt-[10px] text-[16px] text-[#141313]/50">
                  Для всех типов ЧС
                </p>
              </div>
            </div>
            <span className="text-4xl text-[#141313]/60">→</span>
          </button>
        </div>

        {/* Правая колонка — карточка вызова */}
        <div className="flex-1 rounded-[24px] bg-white p-[54px] shadow-[0_4px_50px_rgba(0,0,0,0.08)]">
          <h2 className="mb-[45px] text-[26px] font-semibold leading-tight text-[#141313]">
            Карточка вызова
          </h2>

          {/* Мини-карта */}
          <div className="relative mb-[55px] h-[103px] w-full rounded-[24px] bg-[#BEBEBE]">
            <span className="absolute bottom-[20px] left-[30px] flex items-center gap-[10px] rounded-full bg-white px-[25px] py-[12px] text-[15px] font-medium text-[#132353]">
              <span className="h-[10px] w-[10px] rounded-full bg-[#DC2626]" />
              Горизонтальное меню
            </span>
          </div>

          <div className="space-y-[36px]">
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

            <div className="grid grid-cols-2 gap-[36px]">
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
              className="mt-[18px] w-full rounded-[16px] bg-[#DC2626] py-[22px] text-[18px] font-semibold text-white transition-colors hover:bg-[#c11f1f] active:bg-[#a91b1b]"
            >
              Уточнить адрес
            </button>
          </div>
        </div>
      </main>
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
      <span className="mb-[14px] block text-[18px] font-medium leading-tight text-[#141313]">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClasses =
  "h-[70px] w-full rounded-[16px] border-none bg-[#F3F3F4] px-[28px] text-[18px] text-[#141313] outline-none transition-colors focus:ring-2 focus:ring-[#DC2626]/30";
