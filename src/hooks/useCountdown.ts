import { useCallback, useEffect, useRef, useState } from "react";

const useCountdown = (seconds: number) => {
  // Состояние для хранения оставшегося времени
  const [timeLeft, setTimeLeft] = useState(seconds);

  // Ссылка для хранения идентификатора интервала
  const intervalRef = useRef<NodeJS.Timer | null>(null);

  // Флаг, указывающий, завершился ли таймер
  const hasTimerEnded = timeLeft <= 0;

  // Флаг, указывающий, запущен ли таймер
  const isRunning = intervalRef.current != null;

  // Запускает обратный отсчет, если таймер не завершен и не запущен.
  const startCountdown = useCallback(() => {
    if (!hasTimerEnded && !isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    }
  }, [hasTimerEnded, isRunning]);

  //    Сбрасывает таймер до исходного значения и очищает текущий интервал.
  const resetCountdown = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = null;
    setTimeLeft(seconds);
  }, [seconds]);

  // Очистка интервала, когда таймер достигает нуля
  useEffect(() => {
    if (hasTimerEnded) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [hasTimerEnded]);

  // Очистка интервала при размонтировании компонента
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Возвращаем текущее оставшееся время и функции для управления таймером
  return { timeLeft, startCountdown, resetCountdown };
};

export default useCountdown;
