"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Button from "react-bootstrap/Button";
import { FaBan, FaCheckCircle, FaEdit } from "react-icons/fa";
import { useAppSelector } from "../../../../hooks";
import * as client from "../../../../courses/client";
import type { Quiz } from "../../../../courses/quizzes/reducer";

function formatDate(dateStr: string | undefined): string {
  if (!dateStr) return "N/A";
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function QuizDetails() {
  const { cid, qid } = useParams() as { cid: string; qid: string };
  const router = useRouter();

  const currentUser = useAppSelector((state) => state.accountReducer.currentUser);
  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [latestAttempt, setLatestAttempt] = useState<{
    score: number;
    attemptNumber: number;
  } | null>(null);
  const [attemptCount, setAttemptCount] = useState(0);

  useEffect(() => {
    client.findQuizById(qid).then(setQuiz);
    if (!isFaculty) {
      client
        .getLatestAttempt(qid)
        .then((a) => setLatestAttempt(a))
        .catch(() => {});
      client
        .getAttemptCount(qid)
        .then(({ count }) => setAttemptCount(count))
        .catch(() => {});
    }
  }, [qid, isFaculty]);

  const handleTogglePublish = async () => {
    if (!quiz) return;
    if (quiz.published) {
      await client.unpublishQuiz(qid);
    } else {
      await client.publishQuiz(qid);
    }
    const updated = await client.findQuizById(qid);
    setQuiz(updated);
  };

  if (!quiz) return <div className="p-4 text-muted">Loading...</div>;

  const attemptsLeft =
    quiz.multipleAttempts
      ? quiz.howManyAttempts - attemptCount
      : attemptCount === 0
      ? 1
      : 0;

  return (
    <div id="wd-quiz-details" className="pb-5">
      {/* Faculty action bar */}
      {isFaculty && (
        <div className="d-flex gap-2 mb-4">
          <Button
            variant="secondary"
            id="wd-quiz-preview-btn"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/preview`)}
          >
            Preview
          </Button>
          <Button
            variant="secondary"
            id="wd-quiz-edit-btn"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit`)}
          >
            <FaEdit className="me-1" /> Edit
          </Button>
        </div>
      )}

      <hr />

      {/* Title + published status */}
      <div className="d-flex align-items-center gap-3 mb-3">
        <h2 className="mb-0" id="wd-quiz-title">{quiz.title}</h2>
        {isFaculty && (
          <span
            id="wd-quiz-published-status"
            style={{ cursor: "pointer" }}
            onClick={handleTogglePublish}
            title={quiz.published ? "Click to unpublish" : "Click to publish"}
          >
            {quiz.published ? (
              <FaCheckCircle className="text-success fs-4" />
            ) : (
              <FaBan className="text-secondary fs-4" />
            )}
          </span>
        )}
      </div>

      {/* Details table */}
      <table className="table table-borderless w-auto mb-4">
        <tbody>
          <DetailRow label="Quiz Type" value={quiz.quizType} />
          <DetailRow label="Points" value={String(quiz.points ?? 0)} />
          <DetailRow label="Assignment Group" value={quiz.assignmentGroup} />
          <DetailRow
            label="Shuffle Answers"
            value={quiz.shuffleAnswers ? "Yes" : "No"}
          />
          <DetailRow
            label="Time Limit"
            value={quiz.timeLimit ? `${quiz.timeLimit} Minutes` : "No Limit"}
          />
          <DetailRow
            label="Multiple Attempts"
            value={quiz.multipleAttempts ? "Yes" : "No"}
          />
          {quiz.multipleAttempts && (
            <DetailRow
              label="How Many Attempts"
              value={String(quiz.howManyAttempts)}
            />
          )}
          <DetailRow
            label="Show Correct Answers"
            value={quiz.showCorrectAnswers ? "Yes" : "No"}
          />
          <DetailRow
            label="Access Code"
            value={quiz.accessCode || "None"}
          />
          <DetailRow
            label="One Question at a Time"
            value={quiz.oneQuestionAtATime ? "Yes" : "No"}
          />
          <DetailRow
            label="Webcam Required"
            value={quiz.webcamRequired ? "Yes" : "No"}
          />
          <DetailRow
            label="Lock Questions After Answering"
            value={quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
          />
        </tbody>
      </table>

      {/* Dates table */}
      <table className="table table-bordered text-center mb-4" style={{ maxWidth: 600 }}>
        <thead className="table-secondary">
          <tr>
            <th>Due</th>
            <th>Available from</th>
            <th>Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{formatDate(quiz.dueDate)}</td>
            <td>{formatDate(quiz.availableDate)}</td>
            <td>{formatDate(quiz.untilDate)}</td>
          </tr>
        </tbody>
      </table>

      {/* Student: attempt info + start button */}
      {!isFaculty && (
        <div className="mt-3">
          {latestAttempt && (
            <p className="mb-2" id="wd-quiz-last-score">
              Your last attempt score:{" "}
              <strong>
                {latestAttempt.score} / {quiz.points}
              </strong>{" "}
              (Attempt {latestAttempt.attemptNumber})
            </p>
          )}

          {attemptsLeft > 0 ? (
            <Button
              variant="danger"
              id="wd-quiz-start-btn"
              onClick={() =>
                router.push(`/courses/${cid}/quizzes/${qid}/preview`)
              }
            >
              {latestAttempt ? "Retake Quiz" : "Start Quiz"}
            </Button>
          ) : (
            <p className="text-muted" id="wd-quiz-no-attempts">
              No attempts remaining.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <td className="text-end fw-bold pe-3">{label}</td>
      <td>{value}</td>
    </tr>
  );
}
