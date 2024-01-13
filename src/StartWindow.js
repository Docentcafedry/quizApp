import { useQuiz } from "./providers/QuizContext";

export default function StartWindow() {
  const { questionsCount, dispatcher } = useQuiz();
  return (
    <div className="start">
      <h2>Lets start the quiz!</h2>
      <h3>
        There is {questionsCount} questions<span>⁉</span>
      </h3>
      <button
        className="btn btn-u"
        onClick={() => dispatcher({ type: "startQuiz" })}
      >
        Let's start!
      </button>
    </div>
  );
}
