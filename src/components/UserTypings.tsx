import cn from "classnames";
import Caret from "./Caret";

interface UserTypingsProps {
  userInput: string;
  words: string;
  className?: string;
  onCharacterClick?: (index: number) => void;
}

const UserTypings = ({
  userInput,
  words,
  className = "",
  onCharacterClick,
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
          onClick={() => onCharacterClick?.(index)} // Передача индекса при клике
        />
      ))}
      <Caret />
    </div>
  );
};

interface CharacterProps {
  actual: string;
  expected: string;
  onClick?: () => void; 
}

// Компонент отображения одного символа с его статусом
const Character = ({ actual, expected, onClick }: CharacterProps) => {
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
      onClick={onClick} // Обработка клика
      onTouchStart={onClick} // Обработка касания для мобильных устройств
    >
      {expected}
    </span>
  );
};

export default UserTypings;
