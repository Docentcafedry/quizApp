import { useEffect } from "react";
import { useQuiz } from "./providers/QuizContext";

export default function TimerHandler() {
  const { remainingTime: currentTime, dispatcher } = useQuiz();
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatcher({ type: "tick" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatcher]
  );
  return (
    <footer>
      <div className="timer">You time {currentTime}</div>
    </footer>
  );
}
