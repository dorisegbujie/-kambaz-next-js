"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { Modal } from "react-bootstrap";
import { FaPlus, FaEllipsisV, FaTrash, FaEdit } from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import { FaBan, FaCheckCircle, FaRocket } from "react-icons/fa";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { setQuizzes, Quiz } from "../../../courses/quizzes/reducer";
import * as client from "../../../courses/client";

function availabilityLabel(quiz: Quiz): string {
  const now = new Date();
  const available = quiz.availableDate ? new Date(quiz.availableDate) : null;
  const until = quiz.untilDate ? new Date(quiz.untilDate) : null;

  if (until && now > until) return "Closed";
  if (available && now < available)
    return `Not available until ${available.toLocaleDateString()}`;
  return "Available";
}

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

export default function QuizList() {
  const { cid } = useParams() as { cid: string };
  const router = useRouter();
  const dispatch = useAppDispatch();

  const quizzes = useAppSelector((state) =>
    state.quizzesReducer.quizzes.filter((q) => q.course === cid)
  );
  const currentUser = useAppSelector((state) => state.accountReducer.currentUser);
  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  // student scores: map of quizId → last attempt score
  const [scores, setScores] = useState<Record<string, number>>({});

  const fetchQuizzes = async () => {
    const data = await client.findQuizzesForCourse(cid);
    dispatch(setQuizzes(data));
    return data as Quiz[];
  };

  // fetch last attempt score for each quiz (students only)
  const fetchScores = async (quizList: Quiz[]) => {
    if (isFaculty) return;
    const entries = await Promise.all(
      quizList.map(async (q) => {
        try {
          const attempt = await client.getLatestAttempt(q._id);
          if (attempt && attempt.score !== undefined) {
            return [q._id, attempt.score] as [string, number];
          }
        } catch {
          // no attempt yet
        }
        return null;
      })
    );
    const map: Record<string, number> = {};
    for (const entry of entries) {
      if (entry) map[entry[0]] = entry[1];
    }
    setScores(map);
  };

  useEffect(() => {
    fetchQuizzes().then(fetchScores);
  }, [cid]);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleAddQuiz = async () => {
    const newQuiz = await client.createQuiz(cid, {
      title: "New Quiz",
      course: cid,
      description: "",
      quizType: "Graded Quiz",
      points: 0,
      assignmentGroup: "Quizzes",
      shuffleAnswers: true,
      timeLimit: 20,
      multipleAttempts: false,
      howManyAttempts: 1,
      showCorrectAnswers: true,
      accessCode: "",
      oneQuestionAtATime: true,
      webcamRequired: false,
      lockQuestionsAfterAnswering: false,
      dueDate: "",
      availableDate: "",
      untilDate: "",
      published: false,
      questions: [],
    });
    router.push(`/courses/${cid}/quizzes/${newQuiz._id}/edit`);
  };

  const handleTogglePublish = async (quiz: Quiz) => {
    if (quiz.published) {
      await client.unpublishQuiz(quiz._id);
    } else {
      await client.publishQuiz(quiz._id);
    }
    fetchQuizzes();
    setOpenMenuId(null);
  };

  const handleDelete = async () => {
    if (deleteId) {
      await client.deleteQuiz(deleteId);
      fetchQuizzes();
    }
    setDeleteId(null);
  };

  return (
    <div id="wd-quizzes">
      {/* top controls */}
      <div className="d-flex align-items-center mb-4">
        <div className="ms-auto d-flex gap-2">
          {isFaculty && (
            <Button
              variant="danger"
              className="text-nowrap"
              id="wd-add-quiz-btn"
              onClick={handleAddQuiz}
            >
              <FaPlus className="me-2" />
              Quiz
            </Button>
          )}
        </div>
      </div>

      <ListGroup className="rounded-0">
        {/* header row */}
        <ListGroupItem className="d-flex align-items-center bg-secondary">
          <BsGripVertical className="me-2 fs-3" />
          <FaEllipsisV className="me-2" />
          <div className="fw-bold">QUIZZES</div>
          <div className="ms-auto d-flex align-items-center gap-3">
            {isFaculty && (
              <Button
                variant="link"
                className="p-0 text-dark"
                onClick={handleAddQuiz}
              >
                <FaPlus />
              </Button>
            )}
            <FaEllipsisV />
          </div>
        </ListGroupItem>

        {quizzes.length === 0 && (
          <ListGroupItem className="text-muted text-center py-4">
            No quizzes yet.{isFaculty && " Click the + Quiz button to add one."}
          </ListGroupItem>
        )}

        {[...quizzes]
          .sort((a, b) => {
            // sort by available date; quizzes with no date go last
            const da = a.availableDate ? new Date(a.availableDate).getTime() : Infinity;
            const db = b.availableDate ? new Date(b.availableDate).getTime() : Infinity;
            return da - db;
          })
          .map((quiz) => {
          const avail = availabilityLabel(quiz);
          const studentScore = scores[quiz._id];
          return (
            <ListGroupItem
              key={quiz._id}
              className="d-flex align-items-start border-start border-success border-4"
              style={{ position: "relative" }}
            >
              <BsGripVertical className="me-2 fs-3 mt-1" />
              <FaRocket className="me-3 fs-4 text-success mt-2" />

              <div className="flex-fill">
                <div className="fw-bold">
                  <Link
                    href={`/courses/${cid}/quizzes/${quiz._id}`}
                    className="text-decoration-none text-dark"
                    id={`wd-quiz-link-${quiz._id}`}
                  >
                    {quiz.title}
                  </Link>
                </div>

                <div className="text-muted small">
                  <span
                    className={
                      avail === "Closed"
                        ? "text-danger"
                        : avail === "Available"
                        ? "text-success"
                        : ""
                    }
                  >
                    {avail}
                  </span>
                  {" | "}
                  <strong>Due</strong> {formatDate(quiz.dueDate)}
                  {" | "}
                  {quiz.points ?? 0} pts
                  {" | "}
                  {quiz.questions?.length ?? 0} Questions
                  {!isFaculty && studentScore !== undefined && (
                    <span className="ms-2 text-success fw-bold">
                      | Score: {studentScore}/{quiz.points}
                    </span>
                  )}
                </div>
              </div>

              <div className="d-flex align-items-center gap-2 mt-1">
                {/* publish icon — clickable for faculty */}
                <span
                  style={{ cursor: isFaculty ? "pointer" : "default" }}
                  onClick={isFaculty ? () => handleTogglePublish(quiz) : undefined}
                  title={
                    isFaculty
                      ? quiz.published
                        ? "Click to unpublish"
                        : "Click to publish"
                      : undefined
                  }
                >
                  {quiz.published ? (
                    <FaCheckCircle
                      className="text-success"
                      id={`wd-quiz-published-${quiz._id}`}
                    />
                  ) : (
                    <FaBan
                      className="text-secondary"
                      id={`wd-quiz-unpublished-${quiz._id}`}
                    />
                  )}
                </span>

                {isFaculty && (
                  <div style={{ position: "relative" }} ref={openMenuId === quiz._id ? menuRef : undefined}>
                    <FaEllipsisV
                      style={{ cursor: "pointer" }}
                      id={`wd-quiz-menu-${quiz._id}`}
                      onClick={() =>
                        setOpenMenuId(openMenuId === quiz._id ? null : quiz._id)
                      }
                    />
                    {openMenuId === quiz._id && (
                      <div
                        className="bg-white border rounded shadow-sm"
                        style={{
                          position: "absolute",
                          right: 0,
                          top: "100%",
                          zIndex: 100,
                          minWidth: 160,
                        }}
                      >
                        <div
                          className="px-3 py-2 d-flex align-items-center gap-2"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setOpenMenuId(null);
                            router.push(`/courses/${cid}/quizzes/${quiz._id}/edit`);
                          }}
                        >
                          <FaEdit /> Edit
                        </div>
                        <div
                          className="px-3 py-2 d-flex align-items-center gap-2 text-danger"
                          style={{ cursor: "pointer" }}
                          id={`wd-quiz-delete-${quiz._id}`}
                          onClick={() => {
                            setOpenMenuId(null);
                            setDeleteId(quiz._id);
                          }}
                        >
                          <FaTrash /> Delete
                        </div>
                        <div
                          className="px-3 py-2 d-flex align-items-center gap-2"
                          style={{ cursor: "pointer" }}
                          id={`wd-quiz-toggle-publish-${quiz._id}`}
                          onClick={() => handleTogglePublish(quiz)}
                        >
                          {quiz.published ? (
                            <><FaBan /> Unpublish</>
                          ) : (
                            <><FaCheckCircle className="text-success" /> Publish</>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </ListGroupItem>
          );
        })}
      </ListGroup>

      {/* Delete confirmation dialog */}
      <Modal show={deleteId !== null} onHide={() => setDeleteId(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this quiz?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteId(null)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            id="wd-confirm-delete-quiz-btn"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
