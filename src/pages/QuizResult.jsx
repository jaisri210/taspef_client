import { useLocation, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import useWindowSize from "../hooks/useWindowSize";

export default function QuizResult() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const answers = state?.answers || [];

  const score = answers.filter((a) => a === "correct").length;
  const total = answers.length;
  const percent = Math.round((score / total) * 100);
  const { width, height } = useWindowSize();

  let title = "Forest Beginner 🌱";
  if (score === total) title = "Forest Guardian 🌳";
  else if (score >= Math.ceil(total / 2)) title = "Nature Protector 🌿";

  return (
    <div className="min-h-screen bg-primary-900 text-white flex flex-col items-center justify-center">
      <Confetti
        width={width}
        height={height}
        recycle={true}
        numberOfPieces={300}
      />

      <h1 className="text-3xl font-bold">Quiz Completed</h1>

      <p className="text-5xl mt-4">
        {score} / {total}
      </p>

      <p className="text-xl text-accent-400 mt-2">{percent}%</p>

      <div className="mt-6 px-6 py-3 rounded-full bg-primary-700">{title}</div>

      <button
        onClick={() => navigate("/quiz")}
        className="mt-8 px-8 py-3 bg-accent-500 text-primary-900 rounded-full"
      >
        Play Again
      </button>
    </div>
  );
}
