import Header from "./Header";
import Main from "./Main";
import { useReducer, useEffect } from "react";
import LoadWindow from "./LoadWindow";
import ErrorWindow from "./ErrorWindow";
import StartWindow from "./StartWindow";
import Question from "./Question";
import ProgressBar from "./ProgressBar";
import FinalWindow from "./FinalWindow";
import Timer from "./Timer";
import NextButton from "./NextButton";
import { QuizProvider, useQuiz } from "./providers/QuizContext";

export default function App() {
  const { status, answer } = useQuiz();
  return (
    <div className="app">
      <Header></Header>
      <Main>
        {status === "loading" && <LoadWindow />}
        {status === "error" && <ErrorWindow />}
        {status === "ready" && <StartWindow />}
        {status === "start" && (
          <>
            <ProgressBar />
            <Question />
            <Timer />
            {answer && <NextButton />}
          </>
        )}
        {status === "finish" && <FinalWindow />}
      </Main>
    </div>
  );
}
