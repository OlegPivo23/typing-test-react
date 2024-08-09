import React from "react";
import { CountdownTimer } from "./components/CountdownTimer";
import { WordsContainer } from "./components/WordsContainer";
import GeneratedWords from "./components/GeneratedWords";
import RestartButton from "./components/RestartButton";
import Results from "./components/Results";
import UserTypings from "./components/UserTypings";
import useEngine from "./hooks/useEngine";
import { calculateAccuracyPercentage } from "./utils/helpers";

const App = () => {
  const {
    words,
    typed,
    timeLeft,
    errors,
    state,
    restart,
    totalTyped,
    initialTime,
  } = useEngine();

  return (
    <div className="p-5">
      <CountdownTimer timeLeft={timeLeft} />
      <WordsContainer>
        <GeneratedWords key={words} words={words} />
        <UserTypings
          className="absolute inset-0"
          words={words}
          userInput={typed}
        />
      </WordsContainer>
      <Results
        className="mt-10"
        state={state}
        errors={errors}
        accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped)}
        total={totalTyped}
        restart={restart}
        duration={initialTime}
      />
    </div>
  );
};

export default App;
