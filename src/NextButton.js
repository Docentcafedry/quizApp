export default function NextButton({
  dispatcher,
  answer,
  index,
  questionsNum,
}) {
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
