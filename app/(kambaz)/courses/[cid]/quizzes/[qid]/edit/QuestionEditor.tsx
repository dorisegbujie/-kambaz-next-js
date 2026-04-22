"use client";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import FormSelect from "react-bootstrap/FormSelect";
import FormCheck from "react-bootstrap/FormCheck";
import { FaTrash, FaPlus } from "react-icons/fa";
import type { Question, Choice } from "../../../../../courses/quizzes/reducer";

type Props = {
  question: Question;
  onChange: (q: Question) => void;
  onDone: () => void;
};

export default function QuestionEditor({ question, onChange, onDone }: Props) {
  const [q, setQ] = useState<Question>(question);
  const set = (patch: Partial<Question>) => setQ((prev) => ({ ...prev, ...patch }));

  const save = () => {
    onChange(q);
    onDone();
  };

  /* ── Multiple Choice helpers ── */
  const addChoice = () => {
    const newChoice: Choice = {
      _id: Date.now().toString(),
      text: "",
      correct: false,
    };
    set({ choices: [...q.choices, newChoice] });
  };

  const updateChoice = (id: string, patch: Partial<Choice>) => {
    set({
      choices: q.choices.map((c) => (c._id === id ? { ...c, ...patch } : c)),
    });
  };

  const removeChoice = (id: string) => {
    set({ choices: q.choices.filter((c) => c._id !== id) });
  };

  const setCorrectChoice = (id: string) => {
    set({
      choices: q.choices.map((c) => ({ ...c, correct: c._id === id })),
    });
  };

  /* ── Fill-in-blank helpers ── */
  const addAnswer = () => set({ possibleAnswers: [...q.possibleAnswers, ""] });
  const updateAnswer = (idx: number, val: string) => {
    const updated = [...q.possibleAnswers];
    updated[idx] = val;
    set({ possibleAnswers: updated });
  };
  const removeAnswer = (idx: number) => {
    set({ possibleAnswers: q.possibleAnswers.filter((_, i) => i !== idx) });
  };

  return (
    <Form>
      {/* Type selector */}
      <div className="d-flex gap-3 align-items-center mb-3">
        <FormGroup className="flex-fill">
          <FormLabel>Title</FormLabel>
          <FormControl
            id="wd-question-title"
            value={q.title}
            onChange={(e) => set({ title: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Type</FormLabel>
          <FormSelect
            id="wd-question-type"
            value={q.type}
            onChange={(e) =>
              set({ type: e.target.value as Question["type"] })
            }
          >
            <option value="multiple-choice">Multiple Choice</option>
            <option value="true-false">True / False</option>
            <option value="fill-in-blank">Fill in the Blank</option>
          </FormSelect>
        </FormGroup>
        <FormGroup>
          <FormLabel>Points</FormLabel>
          <FormControl
            id="wd-question-points"
            type="number"
            min={0}
            value={q.points}
            style={{ width: 80 }}
            onChange={(e) => set({ points: parseInt(e.target.value || "0") })}
          />
        </FormGroup>
      </div>

      {/* Question text */}
      <FormGroup className="mb-3">
        <FormLabel>Question</FormLabel>
        <FormControl
          id="wd-question-text"
          as="textarea"
          rows={3}
          value={q.question}
          onChange={(e) => set({ question: e.target.value })}
        />
      </FormGroup>

      {/* Multiple Choice */}
      {q.type === "multiple-choice" && (
        <FormGroup className="mb-3">
          <FormLabel>Choices (select the correct answer)</FormLabel>
          {q.choices.map((c) => (
            <div key={c._id} className="d-flex align-items-center gap-2 mb-2">
              <FormCheck
                type="radio"
                name={`correct-${q._id}`}
                id={`wd-choice-correct-${c._id}`}
                checked={c.correct}
                onChange={() => setCorrectChoice(c._id)}
                title="Correct answer"
              />
              <FormControl
                id={`wd-choice-text-${c._id}`}
                value={c.text}
                placeholder="Choice text"
                onChange={(e) => updateChoice(c._id, { text: e.target.value })}
              />
              <FaTrash
                className="text-danger flex-shrink-0"
                style={{ cursor: "pointer" }}
                onClick={() => removeChoice(c._id)}
              />
            </div>
          ))}
          <Button variant="link" size="sm" onClick={addChoice} id="wd-add-choice-btn">
            <FaPlus className="me-1" /> Add Choice
          </Button>
        </FormGroup>
      )}

      {/* True / False */}
      {q.type === "true-false" && (
        <FormGroup className="mb-3">
          <FormLabel>Correct Answer</FormLabel>
          <div className="d-flex gap-3">
            <FormCheck
              type="radio"
              id="wd-tf-true"
              label="True"
              name={`tf-${q._id}`}
              checked={q.correctAnswer === true}
              onChange={() => set({ correctAnswer: true })}
            />
            <FormCheck
              type="radio"
              id="wd-tf-false"
              label="False"
              name={`tf-${q._id}`}
              checked={q.correctAnswer === false}
              onChange={() => set({ correctAnswer: false })}
            />
          </div>
        </FormGroup>
      )}

      {/* Fill in the Blank */}
      {q.type === "fill-in-blank" && (
        <FormGroup className="mb-3">
          <FormLabel>Possible Correct Answers (case-insensitive)</FormLabel>
          {q.possibleAnswers.map((ans, idx) => (
            <div key={idx} className="d-flex align-items-center gap-2 mb-2">
              <FormControl
                id={`wd-blank-answer-${idx}`}
                value={ans}
                placeholder={`Answer ${idx + 1}`}
                onChange={(e) => updateAnswer(idx, e.target.value)}
              />
              <FaTrash
                className="text-danger flex-shrink-0"
                style={{ cursor: "pointer" }}
                onClick={() => removeAnswer(idx)}
              />
            </div>
          ))}
          <Button variant="link" size="sm" onClick={addAnswer} id="wd-add-answer-btn">
            <FaPlus className="me-1" /> Add Answer
          </Button>
        </FormGroup>
      )}

      <div className="d-flex justify-content-end gap-2 mt-2">
        <Button variant="light" size="sm" onClick={onDone}>
          Cancel
        </Button>
        <Button variant="danger" size="sm" id="wd-save-question-btn" onClick={save}>
          Done
        </Button>
      </div>
    </Form>
  );
}
