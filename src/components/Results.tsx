import { motion } from "framer-motion";
import { State } from "../hooks/useEngine";
import { formatPercentage } from "../utils/helpers";
import RestartButton from "./RestartButton";

// Определение типа для пропсов
interface ResultsProps {
  state: State;
  errors: number;
  accuracyPercentage: number;
  total: number;
  duration: number; // Добавление продолжительности в секундах
  className?: string;
  restart: () => void;
}

const Results: React.FC<ResultsProps> = ({
  state,
  errors,
  accuracyPercentage,
  total,
  duration,
  className = "",
  restart,
}) => {
  // Проверка состояния перед рендером
  if (state !== "finish") {
    return null;
  }

  // Расчет WPM
  const wordsPerMinute = Math.round(total / 5 / (duration / 60));

  // Анимационные параметры
  const initial = { opacity: 0 };
  const animate = { opacity: 1 };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <motion.div
        initial={initial}
        animate={animate}
        className={`p-6 sm:p-8 md:p-10 lg:p-12 bg-white rounded-lg shadow-lg border-2 sm:border-4 md:border-6 border-blue-500 text-black w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl ${className}`}
      >
        <motion.ul
          initial={initial}
          animate={animate}
          className="flex flex-col justify-center items-center gap-3 sm:gap-4 md:gap-5 text-lg sm:text-xl md:text-2xl"
        >
          <motion.li
            initial={initial}
            animate={animate}
            transition={{ duration: 0.3 }}
            className="font-bold text-xl sm:text-2xl md:text-3xl"
          >
            Результаты
          </motion.li>
          <motion.li
            initial={initial}
            animate={animate}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            Точность: {formatPercentage(accuracyPercentage)}
          </motion.li>
          <motion.li
            initial={initial}
            animate={animate}
            transition={{ duration: 0.3, delay: 1 }}
            className="text-red-600"
          >
            Ошибки: {errors}
          </motion.li>
          <motion.li
            initial={initial}
            animate={animate}
            transition={{ duration: 0.3, delay: 1.8 }}
          >
            WPM: {wordsPerMinute}
          </motion.li>
        </motion.ul>
        <RestartButton
          className="mx-auto mt-6 sm:mt-8 px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          onRestart={restart}
        />
      </motion.div>
    </div>
  );
};

export default Results;
