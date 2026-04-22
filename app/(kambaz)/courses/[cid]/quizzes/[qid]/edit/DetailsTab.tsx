"use client";

import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormSelect from "react-bootstrap/FormSelect";
import FormCheck from "react-bootstrap/FormCheck";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import type { Quiz } from "../../../../../courses/quizzes/reducer";

type Props = {
  quiz: Quiz;
  setQuiz: (q: Quiz) => void;
};

export default function DetailsTab({ quiz, setQuiz }: Props) {
  const set = (patch: Partial<Quiz>) => setQuiz({ ...quiz, ...patch });

  return (
    <Form id="wd-quiz-details-form">
      {/* Title */}
      <FormGroup className="mb-3">
        <FormControl
          id="wd-quiz-title"
          value={quiz.title}
          placeholder="Quiz Title"
          className="fw-bold fs-5"
          onChange={(e) => set({ title: e.target.value })}
        />
      </FormGroup>

      {/* Description */}
      <FormGroup className="mb-4">
        <FormLabel>Quiz Instructions</FormLabel>
        <FormControl
          id="wd-quiz-description"
          as="textarea"
          rows={5}
          value={quiz.description}
          placeholder="Quiz instructions..."
          onChange={(e) => set({ description: e.target.value })}
        />
      </FormGroup>

      {/* Quiz Type */}
      <Row className="align-items-center mb-3">
        <Col xs={4} className="text-end">
          <FormLabel className="m-0">Quiz Type</FormLabel>
        </Col>
        <Col xs={8}>
          <FormSelect
            id="wd-quiz-type"
            value={quiz.quizType}
            onChange={(e) => set({ quizType: e.target.value })}
          >
            <option>Graded Quiz</option>
            <option>Practice Quiz</option>
            <option>Graded Survey</option>
            <option>Ungraded Survey</option>
          </FormSelect>
        </Col>
      </Row>

      {/* Assignment Group */}
      <Row className="align-items-center mb-3">
        <Col xs={4} className="text-end">
          <FormLabel className="m-0">Assignment Group</FormLabel>
        </Col>
        <Col xs={8}>
          <FormSelect
            id="wd-quiz-assignment-group"
            value={quiz.assignmentGroup}
            onChange={(e) => set({ assignmentGroup: e.target.value })}
          >
            <option>Quizzes</option>
            <option>Exams</option>
            <option>Assignments</option>
            <option>Project</option>
          </FormSelect>
        </Col>
      </Row>

      {/* Points — auto-computed from questions (read-only) */}
      <Row className="align-items-center mb-3">
        <Col xs={4} className="text-end">
          <FormLabel className="m-0">Points</FormLabel>
        </Col>
        <Col xs={8}>
          <FormControl
            id="wd-quiz-points"
            type="number"
            readOnly
            value={quiz.questions.reduce((sum, q) => sum + (q.points || 0), 0)}
          />
          <div className="text-muted small mt-1">Automatically computed from questions</div>
        </Col>
      </Row>

      {/* Options section */}
      <Row className="mb-3">
        <Col xs={4} className="text-end pt-2">
          <FormLabel className="m-0">Options</FormLabel>
        </Col>
        <Col xs={8}>
          <div className="border rounded p-3 d-flex flex-column gap-2">
            <FormCheck
              id="wd-shuffle-answers"
              label="Shuffle Answers"
              checked={quiz.shuffleAnswers}
              onChange={(e) => set({ shuffleAnswers: e.target.checked })}
            />

            <div className="d-flex align-items-center gap-2">
              <FormCheck
                id="wd-time-limit-check"
                label="Time Limit"
                checked={quiz.timeLimit > 0}
                onChange={(e) => set({ timeLimit: e.target.checked ? 20 : 0 })}
              />
              {quiz.timeLimit > 0 && (
                <>
                  <FormControl
                    id="wd-time-limit"
                    type="number"
                    min={1}
                    value={quiz.timeLimit}
                    style={{ width: 80 }}
                    onChange={(e) =>
                      set({ timeLimit: parseInt(e.target.value || "1") })
                    }
                  />
                  <span>Minutes</span>
                </>
              )}
            </div>

            <div className="d-flex align-items-center gap-2">
              <FormCheck
                id="wd-multiple-attempts"
                label="Allow Multiple Attempts"
                checked={quiz.multipleAttempts}
                onChange={(e) => set({ multipleAttempts: e.target.checked })}
              />
              {quiz.multipleAttempts && (
                <>
                  <FormLabel className="m-0">Max:</FormLabel>
                  <FormControl
                    id="wd-how-many-attempts"
                    type="number"
                    min={1}
                    value={quiz.howManyAttempts}
                    style={{ width: 80 }}
                    onChange={(e) =>
                      set({ howManyAttempts: parseInt(e.target.value || "1") })
                    }
                  />
                </>
              )}
            </div>

            <FormCheck
              id="wd-show-correct-answers"
              label="Show Correct Answers"
              checked={quiz.showCorrectAnswers}
              onChange={(e) => set({ showCorrectAnswers: e.target.checked })}
            />

            <FormCheck
              id="wd-one-question-at-a-time"
              label="One Question at a Time"
              checked={quiz.oneQuestionAtATime}
              onChange={(e) => set({ oneQuestionAtATime: e.target.checked })}
            />

            <FormCheck
              id="wd-webcam-required"
              label="Webcam Required"
              checked={quiz.webcamRequired}
              onChange={(e) => set({ webcamRequired: e.target.checked })}
            />

            <FormCheck
              id="wd-lock-questions"
              label="Lock Questions After Answering"
              checked={quiz.lockQuestionsAfterAnswering}
              onChange={(e) =>
                set({ lockQuestionsAfterAnswering: e.target.checked })
              }
            />
          </div>
        </Col>
      </Row>

      {/* Access Code */}
      <Row className="align-items-center mb-3">
        <Col xs={4} className="text-end">
          <FormLabel className="m-0">Access Code</FormLabel>
        </Col>
        <Col xs={8}>
          <FormControl
            id="wd-access-code"
            value={quiz.accessCode}
            placeholder="Leave blank for no code"
            onChange={(e) => set({ accessCode: e.target.value })}
          />
        </Col>
      </Row>

      {/* Dates */}
      <Row className="align-items-center mb-3">
        <Col xs={4} className="text-end">
          <FormLabel className="m-0">Due</FormLabel>
        </Col>
        <Col xs={8}>
          <FormControl
            id="wd-due-date"
            type="datetime-local"
            value={quiz.dueDate ? quiz.dueDate.slice(0, 16) : ""}
            onChange={(e) => set({ dueDate: e.target.value })}
          />
        </Col>
      </Row>

      <Row className="align-items-center mb-3">
        <Col xs={4} className="text-end">
          <FormLabel className="m-0">Available from</FormLabel>
        </Col>
        <Col xs={8}>
          <FormControl
            id="wd-available-date"
            type="datetime-local"
            value={quiz.availableDate ? quiz.availableDate.slice(0, 16) : ""}
            onChange={(e) => set({ availableDate: e.target.value })}
          />
        </Col>
      </Row>

      <Row className="align-items-center mb-3">
        <Col xs={4} className="text-end">
          <FormLabel className="m-0">Until</FormLabel>
        </Col>
        <Col xs={8}>
          <FormControl
            id="wd-until-date"
            type="datetime-local"
            value={quiz.untilDate ? quiz.untilDate.slice(0, 16) : ""}
            onChange={(e) => set({ untilDate: e.target.value })}
          />
        </Col>
      </Row>
    </Form>
  );
}
