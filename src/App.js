import Header from "./Header";
import Main from "./Main";
import { useReducer, useEffect } from "react";
import LoaderWindow from "./LoadWindow";
import ErrorWindow from "./ErrorWindow";
import StartWindow from "./StartWindow";
import Question from "./Question";
import ProgressBar from "./ProgressBar";
import FinalWindow from "./FinalWindow";
import Timer from "./Timer";
import NextButton from "./NextButton";

const defState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  remainingTime: 30,
};

function reducer(state, action) {
  switch (action.type) {
    case "setQuestions":
      return { ...state, questions: action.payload, status: "ready" };

    case "fetchError":
      return { ...state, status: "error" };

    case "startQuiz":
      return { ...state, status: "start" };

    case "setAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
        remainingTime: 30,
      };

    case "finishQuiz":
      return {
        ...state,
        status: "finish",
      };

    case "resetQuiz":
      return {
        ...defState,
        questions: state.questions,
        status: "ready",
        highscore: state.highscore,
      };

    case "tick":
      if (state.remainingTime === 0) return { ...state, status: "finish" };
      return {
        ...state,
        remainingTime: state.remainingTime - 1,
      };

    default:
      throw new Error("Unknown action");
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highscore, remainingTime },
    dispatcher,
  ] = useReducer(reducer, defState);
  const questionsCount = questions.length;
  const numPoints = questions.reduce((prev, next) => prev + next.points, 0);

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((res) => dispatcher({ type: "setQuestions", payload: res }))
      .catch((err) => dispatcher({ type: "fetchError" }));
  }, []);

  return (
    <div className="app">
      <Header></Header>
      <Main>
        {status === "loading" && <LoaderWindow />}
        {status === "error" && <ErrorWindow />}
        {status === "ready" && (
          <StartWindow
            questionsCount={questionsCount}
            dispatcher={dispatcher}
          />
        )}
        {status === "start" && (
          <>
            <ProgressBar
              questions={questions}
              index={index}
              numQuestions={questionsCount}
              points={points}
              numPoints={numPoints}
            />
            <Question
              question={questions[index]}
              dispatcher={dispatcher}
              answer={answer}
            />
            <Timer currentTime={remainingTime} dispatcher={dispatcher} />
            {answer && (
              <NextButton
                dispatcher={dispatcher}
                answer={answer}
                index={index}
                questionsNum={questionsCount - 1}
              />
            )}
          </>
        )}
        {status === "finish" && (
          <FinalWindow
            dispatcher={dispatcher}
            points={points}
            maxPoints={numPoints}
            highScore={highscore}
          />
        )}
      </Main>
    </div>
  );
}
