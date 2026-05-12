import { useState } from "react";
import Confetti from "react-confetti";

import { forestQuizQuestions } from "../data/forestQuizData";

import useWindowSize from "../hooks/useWindowSize";
import { useNavigate } from "react-router-dom";

export default function ForestQuiz() {
  const questions = forestQuizQuestions;

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [selected, setSelected] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  const { width, height } = useWindowSize();
  const current = questions[index];

  const handleSelect = (option) => {
    if (selected) return;

    setSelected(option);
    const isCorrect = option === current.answer;

    const updated = [...answers];
    updated[index] = isCorrect ? "correct" : "wrong";
    setAnswers(updated);

    if (isCorrect) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 900);
    }

    setTimeout(() => {
      if (index < questions.length - 1) {
        setIndex(index + 1);
        setSelected(null);
      } else {
        // ✅ QUIZ FINISHED → GO TO RESULT PAGE
        navigate("/quiz/result", {
          state: { answers: updated },
          replace: true,
        });
      }
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-primary-900 text-white px-6 flex flex-col justify-center relative">
      {/* 🎉 Confetti for correct answers */}
      {showConfetti && (
        <div className="fixed inset-0 z-[9999] pointer-events-none">
          <Confetti
            width={width}
            height={height}
            recycle={false}
            numberOfPieces={200}
            gravity={0.3}
          />
        </div>
      )}

      {/* Progress bar */}
      {/* <ProgressBar answers={answers} /> */}

      <h2 className="text-sm text-gray-300 mt-6">
        Question {index + 1} / {questions.length}
      </h2>

      <h1 className="text-xl font-semibold mt-3 min-h-[60px]">
        {current.question}
      </h1>

      <div className="mt-6 space-y-4">
        {current.options.map((opt) => {
          let style = "bg-primary-700";

          if (selected) {
            if (opt === current.answer) style = "bg-green-600";
            else if (opt === selected) style = "bg-red-600";
            else style = "bg-primary-700 opacity-50";
          }

          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              className={`w-full py-4 px-4 text-left rounded-xl border border-white/10 transition ${style}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {selected && (
        <div className="mt-6 p-4 bg-primary-800 border border-primary-600 rounded-xl">
          <p className="text-accent-400 font-bold text-xs mb-1">
            DID YOU KNOW?
          </p>
          <p className="text-gray-200 text-sm">{current.explanation}</p>
        </div>
      )}
    </div>
  );
}
