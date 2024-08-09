import { useRef } from "react";
import { MdRefresh } from "react-icons/md";

interface RestartButtonProps {
  onRestart: () => void;
  className?: string;
}

const RestartButton = ({
  onRestart: handleRestart,
  className = "",
}: RestartButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleClick = () => {
    buttonRef.current?.blur();
    handleRestart();
  };

  return (
    <button
      tabIndex={-1}
      ref={buttonRef}
      className={`block rounded px-8 py-2 flex gap-4 hover:bg-slate-700/50 ${className}`} // Стили кнопки
      onClick={handleClick}
    >
      <span>Рестарт</span>
      <MdRefresh className="w-6 h-6" />
    </button>
  );
};

export default RestartButton;
