import { useQuiz } from "./providers/QuizContext";

export default function ProgressBar({}) {
  const {
    questions,
    index,
    questionsCount: numQuestions,
    points,
    numPoints,
  } = useQuiz();
  return (
    <header className="progress">
      <progress max={numQuestions} value={index}></progress>
      <p>
        Question {index}/{numQuestions}
      </p>
      <p>
        {points}/{numPoints} points
      </p>
    </header>
  );
}
