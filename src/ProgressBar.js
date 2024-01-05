export default function ProgressBar({
  questions,
  index,
  numQuestions,
  points,
  numPoints,
}) {
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
