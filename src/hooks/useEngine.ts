import { useCallback, useEffect, useState } from "react";
import { countErrors, debug } from "../utils/helpers";
import useCountdown from "./useCountdown";
import useTypings from "./useTypings";
import useWords from "./useWords";

export type State = "start" | "run" | "finish";

const NUMBER_OF_WORDS = 12;
const COUNTDOWN_SECONDS = 60;

const useEngine = () => {
  // Состояние текущего этапа игры
  const [state, setState] = useState<State>("start");

  // Хук для обратного отсчета времени
  const { timeLeft, startCountdown, resetCountdown } =
    useCountdown(COUNTDOWN_SECONDS);

  // Хук для управления словами (их генерация и обновление)
  const { words, updateWords } = useWords(NUMBER_OF_WORDS);

  // Хук для отслеживания ввода пользователя (счетчик и введенные символы)
  const { cursor, typed, clearTyped, totalTyped, resetTotalTyped } = useTypings(
    state !== "finish"
  );

  // Состояние для хранения количества ошибок
  const [errors, setErrors] = useState(0);

  // Начальное время отсчета
  const initialTime = COUNTDOWN_SECONDS;

  // Проверка, нужно ли начать игру
  const isStarting = state === "start" && cursor > 0;

  // Проверка, завершены ли все слова
  const areWordsFinished = cursor === words.length;

  /**
   * Функция для перезапуска игры: сброс таймера, текста и состояния
   */
  const restart = useCallback(() => {
    debug("restarting...");
    resetCountdown();
    resetTotalTyped();
    setState("start");
    setErrors(0);
    updateWords();
    clearTyped();
  }, [clearTyped, updateWords, resetCountdown, resetTotalTyped]);

  // Функция для подсчета ошибок после завершения ввода
  const sumErrors = useCallback(() => {
    debug(`cursor: ${cursor} - words.length: ${words.length}`);
    const wordsReached = words.substring(0, Math.min(cursor, words.length));
    setErrors((prevErrors) => prevErrors + countErrors(typed, wordsReached));
  }, [typed, words, cursor]);

  // Запуск игры и таймера, когда пользователь начинает вводить первый символ
  useEffect(() => {
    if (isStarting) {
      setState("run");
      startCountdown();
    }
  }, [isStarting, startCountdown]);

  // Завершение игры, когда время истекает
  useEffect(() => {
    if (!timeLeft && state === "run") {
      debug("time is up...");
      setState("finish");
      sumErrors();
    }
  }, [timeLeft, state, sumErrors]);

  // Генерация нового набора слов, когда текущие слова завершены
  useEffect(() => {
    if (areWordsFinished) {
      debug("words are finished...");
      sumErrors(); // Подсчет ошибок
      updateWords(); // Обновление слов
      clearTyped(); // Очистка введенного текста
    }
  }, [clearTyped, areWordsFinished, updateWords, sumErrors]);

  return {
    state,
    words,
    typed,
    errors,
    restart,
    timeLeft,
    totalTyped,
    initialTime,
  };
};

export default useEngine;
