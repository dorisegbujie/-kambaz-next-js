"use client";

import Link from "next/link";
import {
  Col,
  Form,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";
import { useParams } from "next/navigation";
import * as db from "../../../../database";

type Assignment = {
  _id: string;
  title: string;
  course: string;
  description?: string;
  points?: number;
  due?: string;       
  available?: string; 
  until?: string;     
};

export default function EditAssignment() {
  const { cid, aid } = useParams();

  const assignments = db.assignments as Assignment[];
  const assignment = assignments.find(
    (a) => a.course === cid && a._id === aid
  );

  return (
    <div id="wd-assignment-editor" className="pb-5">
      <div className="text-muted mb-3">
        <span className="me-2">Assignments</span>
        <span className="me-2">›</span>
        <span className="text-dark">{assignment?.title ?? String(aid)}</span>
      </div>

      <div className="mx-auto" style={{ maxWidth: 720 }}>
        <Form>
          {/* Assignment Name */}
          <FormGroup className="mb-3">
            <FormLabel>Assignment Name</FormLabel>
            <FormControl defaultValue={assignment?.title ?? String(aid)} />
          </FormGroup>

          {/* Description */}
          <FormGroup className="mb-3">
            <FormControl
              as="textarea"
              rows={8}
              defaultValue={
                assignment?.description ??
                `The assignment is available online

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
• Your full name and section
• Links to each of the lab assignments
• Link to the Kambaz application
• Links to all relevant source code repositories

The Kambaz application should include a link to navigate back to the landing page.`
              }
            />
          </FormGroup>

          {/* Points */}
          <Row className="align-items-center mb-3">
            <Col xs={4} className="text-end">
              <FormLabel className="m-0">Points</FormLabel>
            </Col>
            <Col xs={8}>
              <FormControl type="number" defaultValue={assignment?.points ?? 100} />
            </Col>
          </Row>

          {/* Assignment Group */}
          <Row className="align-items-center mb-3">
            <Col xs={4} className="text-end">
              <FormLabel className="m-0">Assignment Group</FormLabel>
            </Col>
            <Col xs={8}>
              <FormSelect defaultValue="ASSIGNMENTS">
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="QUIZZES">QUIZZES</option>
                <option value="EXAMS">EXAMS</option>
                <option value="PROJECT">PROJECT</option>
              </FormSelect>
            </Col>
          </Row>

          {/* Display Grade as */}
          <Row className="align-items-center mb-3">
            <Col xs={4} className="text-end">
              <FormLabel className="m-0">Display Grade as</FormLabel>
            </Col>
            <Col xs={8}>
              <FormSelect defaultValue="Percentage">
                <option>Percentage</option>
                <option>Points</option>
                <option>Letter Grade</option>
                <option>Complete/Incomplete</option>
              </FormSelect>
            </Col>
          </Row>

          {/* Submission Type */}
          <Row className="align-items-center mb-3">
            <Col xs={4} className="text-end">
              <FormLabel className="m-0">Submission Type</FormLabel>
            </Col>
            <Col xs={8}>
              <FormSelect defaultValue="Online">
                <option>Online</option>
                <option>On Paper</option>
                <option>External Tool</option>
                <option>No Submission</option>
              </FormSelect>
            </Col>
          </Row>

          {/* Online Entry Options */}
          <Row className="mb-3">
            <Col xs={4} />
            <Col xs={8}>
              <div className="border p-3">
                <div className="fw-semibold mb-2">Online Entry Options</div>
                <FormCheck label="Text Entry" />
                <FormCheck label="Website URL" defaultChecked />
                <FormCheck label="Media Recordings" />
                <FormCheck label="Student Annotation" />
                <FormCheck label="File Uploads" />
              </div>
            </Col>
          </Row>

          {/* Assign section with Due + Available */}
          <Row className="mb-3">
            <Col xs={4} className="text-end">
              <FormLabel className="m-0">Assign</FormLabel>
            </Col>
            <Col xs={8}>
              <div className="border p-3">
                <div className="fw-semibold mb-2">Assign to</div>
                <FormControl defaultValue="Everyone" className="mb-3" />

                <FormLabel className="fw-semibold">Due</FormLabel>
                <FormControl
                  type="datetime-local"
                  className="mb-3"
                  defaultValue={assignment?.due ?? ""}
                />

                <Row>
                  <Col>
                    <FormLabel className="fw-semibold">Available from</FormLabel>
                    <FormControl
                      type="datetime-local"
                      defaultValue={assignment?.available ?? ""}
                    />
                  </Col>
                  <Col>
                    <FormLabel className="fw-semibold">Until</FormLabel>
                    <FormControl
                      type="datetime-local"
                      defaultValue={assignment?.until ?? ""}
                    />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>

          {/* Buttons */}
          <div className="d-flex justify-content-end gap-2 mt-4">
            <Link href={`/courses/${cid}/assignments`} className="btn btn-light">
              Cancel
            </Link>
            <Link href={`/courses/${cid}/assignments`} className="btn btn-danger">
              Save
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}