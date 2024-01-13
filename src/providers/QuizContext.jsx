import { createContext, useContext, useReducer, useEffect } from "react";

const QuizContext = createContext();

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

function QuizProvider({ children }) {
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
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        remainingTime,
        questionsCount,
        numPoints,
        dispatcher,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  //   if (!context) throw new Error("You trying use useQuiz out of provider");
  return context;
}

export { QuizProvider, useQuiz };
