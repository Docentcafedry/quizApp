import { useEffect } from "react";

export default function TimerHandler({ currentTime, dispatcher }) {
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
