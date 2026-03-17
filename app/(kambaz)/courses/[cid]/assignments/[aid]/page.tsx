"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { addAssignment, updateAssignment, type Assignment } from "../../../assignments/reducer";
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";

export default function AssignmentEditor() {
  const { cid, aid } = useParams() as { cid: string; aid: string };
  const router = useRouter();
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.accountReducer.currentUser);
  const assignments = useAppSelector((state) => state.assignmentsReducer.assignments);

  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const existing = assignments.find((a: Assignment) => a._id === aid && a.course === cid);

  const [assignment, setAssignment] = useState<Assignment>(() => {
    if (aid !== "new" && existing) return existing;
    return {
      _id: "",
      title: "",
      course: cid,
      available: "",
      due: "",
      points: 100,
      description: "",
    };
  });

  const back = () => router.push(`/courses/${cid}/assignments`);

  const save = () => {
    if (!isFaculty) return back();

    if (aid === "new") {
      dispatch(
        addAssignment({
          title: assignment.title || "New Assignment",
          course: cid,
          available: assignment.available,
          due: assignment.due,
          points: assignment.points,
          description: assignment.description,
        })
      );
    } else {
      dispatch(updateAssignment({ ...assignment, _id: aid, course: cid }));
    }
    back();
  };

  return (
    <div id="wd-assignment-editor" className="pb-5">
      <div className="mx-auto" style={{ maxWidth: 720 }}>
        <Form>
          <FormGroup className="mb-3">
            <FormLabel>Assignment Name</FormLabel>
            <FormControl
              value={assignment.title}
              disabled={!isFaculty}
              onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
            />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Description</FormLabel>
            <FormControl
              as="textarea"
              rows={8}
              value={assignment.description}
              disabled={!isFaculty}
              onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
            />
          </FormGroup>

          <Row className="align-items-center mb-3">
            <Col xs={4} className="text-end">
              <FormLabel className="m-0">Points</FormLabel>
            </Col>
            <Col xs={8}>
              <FormControl
                type="number"
                value={assignment.points}
                disabled={!isFaculty}
                onChange={(e) =>
                  setAssignment({ ...assignment, points: parseInt(e.target.value || "0") })
                }
              />
            </Col>
          </Row>

          <Row className="align-items-center mb-3">
            <Col xs={4} className="text-end">
              <FormLabel className="m-0">Due</FormLabel>
            </Col>
            <Col xs={8}>
              <FormControl
                type="datetime-local"
                value={assignment.due}
                disabled={!isFaculty}
                onChange={(e) => setAssignment({ ...assignment, due: e.target.value })}
              />
            </Col>
          </Row>

          <Row className="align-items-center mb-3">
            <Col xs={4} className="text-end">
              <FormLabel className="m-0">Available</FormLabel>
            </Col>
            <Col xs={8}>
              <FormControl
                type="datetime-local"
                value={assignment.available}
                disabled={!isFaculty}
                onChange={(e) => setAssignment({ ...assignment, available: e.target.value })}
              />
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="light" onClick={back}>
              Cancel
            </Button>
            {isFaculty && (
              <Button variant="danger" onClick={save}>
                Save
              </Button>
            )}
          </div>
        </Form>
      </div>
    </div>
  );
}