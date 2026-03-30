"use client";
import { useState } from "react";
import { FormControl } from "react-bootstrap";
import { fetchAssignment, updateTitle } from "./client";

export default function WorkingWithObjectsAsynchronously() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
    score: 0,
  });

  return (
    <div id="wd-working-with-objects-async">
      <h2>Working With Objects Asynchronously</h2>
      <button
        id="wd-fetch-assignment"
        onClick={async () => {
          const data = await fetchAssignment();
          setAssignment(data);
        }}
        className="btn btn-primary me-2"
      >
        Fetch Assignment
      </button>
      <button
        id="wd-update-assignment-title"
        onClick={async () => {
          const data = await updateTitle(assignment.title);
          setAssignment(data);
        }}
        className="btn btn-warning me-2"
      >
        Update Title
      </button>
      <hr />
      <FormControl
        className="mb-2"
        id="wd-assignment-title"
        value={assignment.title}
        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
      />
      <textarea
        className="form-control mb-2"
        id="wd-assignment-description"
        rows={3}
        value={assignment.description}
        onChange={(e) =>
          setAssignment({ ...assignment, description: e.target.value })
        }
      />
      <FormControl
        className="mb-2"
        id="wd-assignment-due"
        type="date"
        value={assignment.due}
        onChange={(e) => setAssignment({ ...assignment, due: e.target.value })}
      />
      <label>
        <input
          id="wd-assignment-completed"
          type="checkbox"
          className="me-2"
          checked={assignment.completed}
          onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
        />
        Completed
      </label>
      <br />
      <br />
      <pre id="wd-assignment-preview">
        {JSON.stringify(assignment, null, 2)}
      </pre>
      <hr />
    </div>
  );
}
