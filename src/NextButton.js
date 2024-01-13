import { useQuiz } from "./providers/QuizContext";

export default function NextButton() {
  const { dispatcher, answer, index, questionsCount: questionsNum } = useQuiz();
  if (!answer) return null;
  if (index === questionsNum)
    return (
      <button
        className="btn btn-u"
        onClick={() => dispatcher({ type: "finishQuiz" })}
      >
        Finish quiz
      </button>
    );
  return (
    <button
      className="btn btn-u"
      onClick={() => dispatcher({ type: "nextQuestion" })}
    >
      Next question
    </button>
  );
}
