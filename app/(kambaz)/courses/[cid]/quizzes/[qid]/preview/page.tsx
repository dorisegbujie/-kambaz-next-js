"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormCheck from "react-bootstrap/FormCheck";
import FormControl from "react-bootstrap/FormControl";
import Alert from "react-bootstrap/Alert";
import { FaEdit, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useAppSelector } from "../../../../../hooks";
import * as client from "../../../../../courses/client";
import type { Quiz, Question } from "../../../../../courses/quizzes/reducer";

type Answer = { questionId: string; answer: unknown };

export default function QuizPreview() {
  const { cid, qid } = useParams() as { cid: string; qid: string };
  const router = useRouter();

  const currentUser = useAppSelector((s) => s.accountReducer.currentUser);
  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    client.findQuizById(qid).then((data) => {
      setQuiz(data);
      // initialise blank answers
      if (data?.questions) {
        setAnswers(
          data.questions.map((q: Question) => ({
            questionId: q._id,
            answer: q.type === "true-false" ? true : "",
          }))
        );
      }
    });
  }, [qid]);

  if (!quiz) return <div className="p-4 text-muted">Loading...</div>;

  const questions = quiz.questions ?? [];
  const oneAtATime = quiz.oneQuestionAtATime;
  const visibleQuestions = oneAtATime ? [questions[currentIdx]] : questions;

  /* ── answer helpers ── */
  const getAnswer = (questionId: string) =>
    answers.find((a) => a.questionId === questionId)?.answer;

  const setAnswer = (questionId: string, value: unknown) => {
    setAnswers((prev) =>
      prev.map((a) => (a.questionId === questionId ? { ...a, answer: value } : a))
    );
  };

  /* ── submit ── */
  const handleSubmit = async () => {
    if (isFaculty) {
      // Faculty preview: compute score locally, do NOT persist to DB
      if (!quiz) return;
      let localScore = 0;
      for (const q of quiz.questions) {
        const submitted = answers.find((a) => a.questionId === q._id);
        if (!submitted) continue;
        if (q.type === "multiple-choice") {
          const correct = q.choices.find((c) => c.correct);
          if (correct && submitted.answer === correct._id) localScore += q.points;
        } else if (q.type === "true-false") {
          if (submitted.answer === q.correctAnswer) localScore += q.points;
        } else if (q.type === "fill-in-blank") {
          const norm = String(submitted.answer ?? "").toLowerCase().trim();
          if (q.possibleAnswers.some((a) => a.toLowerCase().trim() === norm)) {
            localScore += q.points;
          }
        }
      }
      setScore(localScore);
    } else {
      const result = await client.submitAttempt(qid, cid, answers);
      setScore(result.score);
    }
    setSubmitted(true);
  };

  /* ── score display ── */
  if (submitted && score !== null) {
    return (
      <div id="wd-quiz-score" className="pb-5">
        <Alert variant="success" className="mb-4">
          <Alert.Heading>Quiz Submitted!</Alert.Heading>
          <p className="mb-0">
            Your score:{" "}
            <strong>
              {score} / {quiz.points}
            </strong>
          </p>
        </Alert>

        {quiz.showCorrectAnswers && (
          <div>
            <h5 className="mb-3">Review</h5>
            {questions.map((q, idx) => (
              <ReviewQuestion
                key={q._id}
                idx={idx}
                question={q}
                submitted={answers.find((a) => a.questionId === q._id)?.answer}
              />
            ))}
          </div>
        )}

        <div className="d-flex gap-2 mt-4">
          <Button
            variant="secondary"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}`)}
          >
            Back to Quiz
          </Button>
          {isFaculty && (
            <Button
              variant="outline-secondary"
              id="wd-keep-editing-btn"
              onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit`)}
            >
              Keep Editing This Quiz
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div id="wd-quiz-preview" className="pb-5">
      {/* Faculty banner */}
      {isFaculty && (
        <Alert variant="warning" className="d-flex align-items-center gap-2">
          <span>This is a preview of the published version of the quiz.</span>
          <Button
            variant="link"
            className="ms-auto p-0"
            id="wd-preview-edit-btn"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit`)}
          >
            <FaEdit className="me-1" /> Edit
          </Button>
        </Alert>
      )}

      <h3 id="wd-quiz-preview-title" className="mb-1">{quiz.title}</h3>
      {quiz.timeLimit > 0 && (
        <p className="text-muted small mb-3">
          Time Limit: {quiz.timeLimit} minutes
        </p>
      )}

      <hr />

      {/* Questions */}
      {(visibleQuestions ?? []).map((q, relIdx) => {
        const absIdx = oneAtATime ? currentIdx : relIdx;
        if (!q) return null;
        return (
          <QuestionBlock
            key={q._id}
            idx={absIdx}
            question={q}
            answer={getAnswer(q._id)}
            onChange={(val) => setAnswer(q._id, val)}
            isFaculty={isFaculty}
            submitted={false}
          />
        );
      })}

      {/* Navigation */}
      {oneAtATime && questions.length > 1 && (
        <div className="d-flex gap-2 mt-4">
          <Button
            variant="secondary"
            disabled={currentIdx === 0}
            id="wd-quiz-prev-btn"
            onClick={() => setCurrentIdx((i) => i - 1)}
          >
            <FaChevronLeft className="me-1" /> Previous
          </Button>
          <Button
            variant="secondary"
            disabled={currentIdx === questions.length - 1}
            id="wd-quiz-next-btn"
            onClick={() => setCurrentIdx((i) => i + 1)}
          >
            Next <FaChevronRight className="ms-1" />
          </Button>
        </div>
      )}

      {/* Submit button — available for both faculty (local score) and students */}
      {(!oneAtATime || currentIdx === questions.length - 1) && (
        <div className="mt-4">
          <Button
            variant="danger"
            id="wd-submit-quiz-btn"
            onClick={handleSubmit}
          >
            Submit Quiz
          </Button>
        </div>
      )}
    </div>
  );
}

/* ── Question rendering ── */
function QuestionBlock({
  idx,
  question,
  answer,
  onChange,
  isFaculty,
  submitted,
}: {
  idx: number;
  question: Question;
  answer: unknown;
  onChange: (val: unknown) => void;
  isFaculty: boolean;
  submitted: boolean;
}) {
  // faculty can interact during preview; only disable after student has submitted
  const disabled = submitted;

  return (
    <div
      className="border rounded p-3 mb-4"
      id={`wd-question-block-${question._id}`}
    >
      <div className="d-flex justify-content-between mb-2">
        <strong>Question {idx + 1}</strong>
        <span className="text-muted small">{question.points} pts</span>
      </div>

      {question.question && (
        <div
          className="mb-3"
          dangerouslySetInnerHTML={{ __html: question.question }}
        />
      )}

      {question.type === "multiple-choice" && (
        <Form>
          {question.choices.map((c) => (
            <FormCheck
              key={c._id}
              type="radio"
              id={`wd-choice-${c._id}`}
              name={`q-${question._id}`}
              label={c.text}
              checked={answer === c._id}
              disabled={disabled}
              onChange={() => onChange(c._id)}
              className={
                isFaculty && c.correct ? "text-success fw-bold" : ""
              }
            />
          ))}
        </Form>
      )}

      {question.type === "true-false" && (
        <Form>
          {[true, false].map((val) => (
            <FormCheck
              key={String(val)}
              type="radio"
              id={`wd-tf-${question._id}-${val}`}
              name={`q-${question._id}`}
              label={val ? "True" : "False"}
              checked={answer === val}
              disabled={disabled}
              onChange={() => onChange(val)}
              className={
                isFaculty && question.correctAnswer === val
                  ? "text-success fw-bold"
                  : ""
              }
            />
          ))}
        </Form>
      )}

      {question.type === "fill-in-blank" && (
        <FormControl
          id={`wd-blank-${question._id}`}
          placeholder="Your answer..."
          value={typeof answer === "string" ? answer : ""}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

/* ── Post-submit review ── */
function ReviewQuestion({
  idx,
  question,
  submitted,
}: {
  idx: number;
  question: Question;
  submitted: unknown;
}) {
  const isCorrect = checkCorrect(question, submitted);

  return (
    <div
      className={`border rounded p-3 mb-3 border-${isCorrect ? "success" : "danger"}`}
      id={`wd-review-question-${question._id}`}
    >
      <div className="d-flex justify-content-between mb-1">
        <strong>Question {idx + 1}</strong>
        <span className={`small ${isCorrect ? "text-success" : "text-danger"}`}>
          {isCorrect ? `+${question.points} pts` : "0 pts"}
        </span>
      </div>

      {question.question && (
        <div
          className="mb-2 small"
          dangerouslySetInnerHTML={{ __html: question.question }}
        />
      )}

      <div className="small">
        <span className="text-muted">Your answer: </span>
        <strong>{formatSubmitted(question, submitted)}</strong>
      </div>

      {!isCorrect && (
        <div className="small text-success mt-1">
          <span>Correct answer: </span>
          <strong>{formatCorrect(question)}</strong>
        </div>
      )}
    </div>
  );
}

function checkCorrect(q: Question, submitted: unknown): boolean {
  if (q.type === "multiple-choice") {
    const correct = q.choices.find((c) => c.correct);
    return !!correct && submitted === correct._id;
  }
  if (q.type === "true-false") {
    return submitted === q.correctAnswer;
  }
  if (q.type === "fill-in-blank") {
    const norm = String(submitted ?? "").toLowerCase().trim();
    return q.possibleAnswers.some(
      (a) => a.toLowerCase().trim() === norm
    );
  }
  return false;
}

function formatSubmitted(q: Question, submitted: unknown): string {
  if (q.type === "multiple-choice") {
    const c = q.choices.find((ch) => ch._id === submitted);
    return c?.text ?? String(submitted);
  }
  if (q.type === "true-false") {
    return submitted ? "True" : "False";
  }
  return String(submitted ?? "");
}

function formatCorrect(q: Question): string {
  if (q.type === "multiple-choice") {
    const c = q.choices.find((ch) => ch.correct);
    return c?.text ?? "";
  }
  if (q.type === "true-false") {
    return q.correctAnswer ? "True" : "False";
  }
  return q.possibleAnswers.join(" / ");
}
