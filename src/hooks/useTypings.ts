import { useCallback, useEffect, useRef, useState } from "react";
import { isKeyboardCodeAllowed } from "../utils/helpers";

const useTypings = (enabled: boolean) => {
  // Состояние для хранения позиции курсора
  const [cursor, setCursor] = useState(0);

  // Состояние для хранения введенного текста
  const [typed, setTyped] = useState<string>("");

  // Ссылка для хранения общего количества набранных символов
  const totalTyped = useRef(0);

  // Обработчик события keydown для обработки нажатий клавиш
  const keydownHandler = useCallback(
    ({ key, code }: KeyboardEvent) => {
      // Проверка, включен ли ввод и разрешен ли код клавиши
      if (!enabled || !isKeyboardCodeAllowed(code)) {
        return;
      }

      switch (key) {
        case "Backspace":
          // Удаление последнего символа
          setTyped((prev) => prev.slice(0, -1));
          setCursor((cursor) => cursor - 1);
          totalTyped.current -= 1;
          break;
        default:
          // Добавление нового символа
          setTyped((prev) => prev.concat(key));
          setCursor((cursor) => cursor + 1);
          totalTyped.current += 1;
      }
    },
    [enabled]
  );

  // Очистка введенного текста и сброс курсора
  const clearTyped = useCallback(() => {
    setTyped("");
    setCursor(0);
  }, []);

  // Сброс общего количества набранных символов
  const resetTotalTyped = useCallback(() => {
    totalTyped.current = 0;
  }, []);

  // Привязка обработчика события keydown и очистка при размонтировании компонента
  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);

    // Очистка обработчика события при размонтировании компонента
    return () => {
      window.removeEventListener("keydown", keydownHandler);
    };
  }, [keydownHandler]);

  // Возвращаем значения и функции для работы с введенным текстом
  return {
    typed,
    cursor,
    clearTyped,
    resetTotalTyped,
    totalTyped: totalTyped.current,
  };
};

export default useTypings;
