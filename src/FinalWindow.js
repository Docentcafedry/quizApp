export default function FinalWindow({
  dispatcher,
  points,
  maxPoints,
  highScore,
}) {
  const percentage = (points / maxPoints) * 100;
  return (
    <div>
      <p className="result">
        You scored {points} of {maxPoints}({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">Hightscore: {highScore} points</p>
      <button
        className="btn btn-u"
        onClick={() => dispatcher({ type: "resetQuiz" })}
      >
        Reset Quiz
      </button>
    </div>
  );
}
