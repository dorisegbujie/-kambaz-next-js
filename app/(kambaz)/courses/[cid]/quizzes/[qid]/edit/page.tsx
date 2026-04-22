"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { useAppDispatch } from "../../../../../hooks";
import { updateQuiz as updateQuizInStore } from "../../../../../courses/quizzes/reducer";
import * as client from "../../../../../courses/client";
import type { Quiz } from "../../../../../courses/quizzes/reducer";
import DetailsTab from "./DetailsTab";
import QuestionsTab from "./QuestionsTab";

const DEFAULT_QUIZ: Omit<Quiz, "_id"> = {
  title: "New Quiz",
  course: "",
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
};

export default function QuizEditor() {
  const { cid, qid } = useParams() as { cid: string; qid: string };
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [quiz, setQuiz] = useState<Quiz>({ ...DEFAULT_QUIZ, _id: qid, course: cid } as Quiz);
  const [activeTab, setActiveTab] = useState<"details" | "questions">("details");

  useEffect(() => {
    client.findQuizById(qid).then((data) => {
      if (data) setQuiz(data);
    });
  }, [qid]);

  const save = async (andPublish = false) => {
    // auto-compute points from questions
    const totalPoints = quiz.questions.reduce((sum, q) => sum + (q.points || 0), 0);
    const toSave = {
      ...quiz,
      points: totalPoints,
      ...(andPublish ? { published: true } : {}),
    };
    const updated = await client.updateQuiz({ ...toSave, _id: qid });
    dispatch(updateQuizInStore(updated));
    if (andPublish) {
      router.push(`/courses/${cid}/quizzes`);
    } else {
      router.push(`/courses/${cid}/quizzes/${qid}`);
    }
  };

  const cancel = () => router.push(`/courses/${cid}/quizzes`);

  return (
    <div id="wd-quiz-editor" className="pb-5">
      <Nav
        variant="tabs"
        className="mb-4"
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k as "details" | "questions")}
      >
        <Nav.Item>
          <Nav.Link eventKey="details" id="wd-quiz-details-tab">
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="questions" id="wd-quiz-questions-tab">
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>

      {activeTab === "details" && (
        <DetailsTab quiz={quiz} setQuiz={setQuiz} />
      )}
      {activeTab === "questions" && (
        <QuestionsTab quiz={quiz} setQuiz={setQuiz} />
      )}

      <hr />
      <div className="d-flex justify-content-end gap-2">
        <Button variant="light" onClick={cancel} id="wd-cancel-quiz-btn">
          Cancel
        </Button>
        <Button
          variant="secondary"
          onClick={() => save(false)}
          id="wd-save-quiz-btn"
        >
          Save
        </Button>
        <Button
          variant="danger"
          onClick={() => save(true)}
          id="wd-save-publish-quiz-btn"
        >
          Save &amp; Publish
        </Button>
      </div>
    </div>
  );
}
