export const isKeyboardCodeAllowed = (code: string) => {
  return (
    code.startsWith("Key") || 
    code.startsWith("Digit") || 
    code === "Backspace" || 
    code === "Space" 
  );
};

// Подсчитывает количество ошибок в сравнении фактического текста с ожидаемым.
// Сравниваются символы фактического текста и ожидаемого текста по их позициям.
export const countErrors = (actual: string, expected: string) => {
  // Разделяем ожидаемый текст на отдельные символы
  const expectedCharacters = expected.split("");

  // Подсчитываем количество ошибок при сравнении фактического и ожидаемого текста
  return expectedCharacters.reduce((errors, expectedChar, i) => {
    const actualChar = actual[i];
    if (actualChar !== expectedChar) {
      errors++;
    }
    return errors;
  }, 0);
};

// Вычисляет процент точности на основе количества ошибок и общего числа символов.
export const calculateAccuracyPercentage = (errors: number, total: number) => {
  if (total > 0) {
    // Вычисляем количество правильных символов
    const corrects = total - errors;
    // Рассчитываем процент точности
    return (corrects / total) * 100;
  }

  return 0;
};

export const formatPercentage = (percentage: number) => {
  // Округляем процент до целого числа и добавляем знак процента
  return percentage.toFixed(0) + "%";
};

// Выводит отладочную информацию в консоль, если приложение работает в режиме разработки.
export const debug = (str: string) => {
  if (process.env.NODE_ENV === "development") {
    console.debug(str);
  }
};
