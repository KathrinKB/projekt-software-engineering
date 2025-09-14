import { useEffect, useState } from "react";
import { fetchQuestionsMock } from "../api/questions";

export default function Quiz({ roomId, onEnd }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await fetchQuestionsMock(); // Mock-Daten
      setQuestions(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <p>Lade Fragen…</p>;
  if (currentIndex >= questions.length) {
    return (
      <div>
        <p>Spiel beendet! Punkte: {score}</p>
        <button onClick={onEnd}>Zurück zur Lobby</button>
      </div>
    );
  }

  const current = questions[currentIndex];

  const handleAnswer = (option) => {
    if (option === current.answer) setScore((s) => s + 1);
    setCurrentIndex((i) => i + 1);
  };
  return (
    <div>
      <h2>{current.question}</h2>
      {current.options.map((opt) => (
        <button key={opt} onClick={() => handleAnswer(opt)}>
          {opt}
        </button>
      ))}
      <p>Punkte: {score}</p>
    </div>
  );
}
