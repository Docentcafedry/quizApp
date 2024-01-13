import { useQuiz } from "./providers/QuizContext";

export default function Question() {
  const { dispatcher, answer, index, questions } = useQuiz();
  const question = questions[index];
  const isAnswered = answer != null;
  return (
    <div>
      <h3>{question.question}</h3>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`btn btn-option ${isAnswered ? "answer" : ""} ${
              isAnswered
                ? question.correctOption === index
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            onClick={() => dispatcher({ type: "setAnswer", payload: index })}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
