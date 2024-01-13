import { useQuiz } from "./providers/QuizContext";

export default function FinalWindow() {
  const { dispatcher, points, maxPoints, highscore } = useQuiz();
  const percentage = (points / maxPoints) * 100;
  return (
    <div>
      <p className="result">
        You scored {points} of {maxPoints}({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">Hightscore: {highscore} points</p>
      <button
        className="btn btn-u"
        onClick={() => dispatcher({ type: "resetQuiz" })}
      >
        Reset Quiz
      </button>
    </div>
  );
}
