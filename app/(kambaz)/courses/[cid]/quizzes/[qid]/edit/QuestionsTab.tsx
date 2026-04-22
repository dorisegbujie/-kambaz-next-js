"use client";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import type { Quiz, Question } from "../../../../../courses/quizzes/reducer";
import QuestionEditor from "./QuestionEditor";

type Props = {
  quiz: Quiz;
  setQuiz: (q: Quiz) => void;
};

export default function QuestionsTab({ quiz, setQuiz }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);

  const addQuestion = () => {
    const newQ: Question = {
      _id: Date.now().toString(),
      type: "multiple-choice",
      title: "New Question",
      points: 1,
      question: "",
      choices: [
        { _id: Date.now().toString() + "-a", text: "", correct: true },
        { _id: Date.now().toString() + "-b", text: "", correct: false },
      ],
      correctAnswer: true,
      possibleAnswers: [],
    };
    setQuiz({ ...quiz, questions: [...quiz.questions, newQ] });
    setEditingId(newQ._id);
  };

  const removeQuestion = (id: string) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.filter((q) => q._id !== id),
    });
    if (editingId === id) setEditingId(null);
  };

  const updateQuestion = (updated: Question) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((q) =>
        q._id === updated._id ? updated : q
      ),
    });
  };

  const totalPoints = quiz.questions.reduce((sum, q) => sum + (q.points || 0), 0);

  return (
    <div id="wd-quiz-questions">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="text-muted small">
          {quiz.questions.length} question{quiz.questions.length !== 1 ? "s" : ""} &mdash; {totalPoints} pts total
        </span>
        <Button
          variant="secondary"
          size="sm"
          id="wd-add-question-btn"
          onClick={addQuestion}
        >
          <FaPlus className="me-1" /> New Question
        </Button>
      </div>

      {quiz.questions.length === 0 && (
        <p className="text-muted text-center py-4">No questions yet. Click &quot;New Question&quot; to add one.</p>
      )}

      {quiz.questions.map((q, idx) => (
        <div key={q._id} className="border rounded mb-3">
          {/* Question header */}
          <div className="d-flex align-items-center px-3 py-2 bg-light">
            <span className="fw-bold me-2">Q{idx + 1}.</span>
            <span className="flex-fill">{q.title || "Untitled"}</span>
            <span className="text-muted small me-3">{q.type}</span>
            <span className="me-3">{q.points} pts</span>
            <FaEdit
              className="me-2 text-secondary"
              style={{ cursor: "pointer" }}
              id={`wd-edit-question-${q._id}`}
              onClick={() =>
                setEditingId(editingId === q._id ? null : q._id)
              }
            />
            <FaTrash
              className="text-danger"
              style={{ cursor: "pointer" }}
              id={`wd-delete-question-${q._id}`}
              onClick={() => removeQuestion(q._id)}
            />
          </div>

          {/* Inline question editor */}
          {editingId === q._id && (
            <div className="p-3">
              <QuestionEditor
                question={q}
                onChange={updateQuestion}
                onDone={() => setEditingId(null)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
