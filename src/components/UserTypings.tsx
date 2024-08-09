import cn from "classnames";
import Caret from "./Caret";

interface UserTypingsProps {
  userInput: string;
  words: string;
  className?: string;
}

const UserTypings = ({
  userInput,
  words,
  className = "",
}: UserTypingsProps) => {
  // Разделение введенного текста на отдельные символы
  const typedCharacters = userInput.split("");

  return (
    <div className={className}>
      {typedCharacters.map((char, index) => (
        <Character
          key={`${char}_${index}`} // Уникальный ключ для каждого символа
          actual={char}
          expected={words[index]}
        />
      ))}
      <Caret />
    </div>
  );
};

interface CharacterProps {
  actual: string;
  expected: string;
}

// Компонент отображения одного символа с его статусом
const Character = ({ actual, expected }: CharacterProps) => {
  // Проверка правильности символа и его типа
  const isCorrect = actual === expected;
  const isWhiteSpace = expected === " ";

  return (
    <span
      className={cn({
        "text-red-500": !isCorrect && !isWhiteSpace, // Неправильный символ
        "text-primary-400": isCorrect && !isWhiteSpace, // Правильный символ
        "bg-red-500/50": !isCorrect && isWhiteSpace, // Неправильный пробел
      })}
    >
      {expected}
    </span>
  );
};

export default UserTypings;
