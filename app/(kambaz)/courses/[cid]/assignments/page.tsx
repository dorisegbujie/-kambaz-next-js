"use client";

import { use } from "react";
import Link from "next/link";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { FaSearch, FaPlus, FaEllipsisV } from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import { FaFileLines } from "react-icons/fa6";
import GreenCheckmark from "../modules/GreenCheckmark";

export default function Assignments({
  params,
}: {
  params: Promise<{ cid: string }>;
}) {
  const { cid } = use(params);

  return (
    <div id="wd-assignments">
      {/* top controls */}
      <div className="d-flex align-items-center mb-4">
        <div
          className="d-flex align-items-center border rounded px-2"
          style={{ maxWidth: 300, width: "100%" }}
        >
          <FaSearch className="text-secondary me-2" />
          <FormControl
            id="wd-search-assignment"
            placeholder="Search..."
            className="border-0"
          />
        </div>

        <div className="ms-auto d-flex gap-2">
          <Button variant="secondary" className="text-nowrap">
            <FaPlus className="me-2" />
            Group
          </Button>

          <Button variant="danger" className="text-nowrap">
            <FaPlus className="me-2" />
            Assignment
          </Button>
        </div>
      </div>

      <ListGroup className="rounded-0">
        {/* assignments header row */}
        <ListGroupItem className="d-flex align-items-center bg-secondary">
          <BsGripVertical className="me-2 fs-3" />
          <FaEllipsisV className="me-2" />
          <div className="fw-bold">ASSIGNMENTS</div>

          <div className="ms-auto d-flex align-items-center gap-3">
            <span className="border rounded-pill px-2 py-1 small bg-white">
              40% of Total
            </span>
            <FaPlus />
            <FaEllipsisV />
          </div>
        </ListGroupItem>

        {/* A1 */}
        <ListGroupItem className="d-flex align-items-start border-start border-success border-4">
          <BsGripVertical className="me-2 fs-3 mt-1" />
          <FaFileLines className="me-3 fs-4 text-success mt-2" />

          <div className="flex-fill">
            <div className="fw-bold">
              <Link
                href={`/courses/${cid}/assignments/A1`}
                className="text-decoration-none text-dark"
              >
                A1
              </Link>
            </div>

            <div className="small text-danger">Multiple Modules</div>

            <div className="text-muted small">
              Not available until May 6 at 12:00am | Due May 13 at 11:59pm | 100
              pts
            </div>
          </div>

          <div className="d-flex align-items-center gap-3">
            <GreenCheckmark />
            <FaEllipsisV className="mt-2" />
          </div>
        </ListGroupItem>

        {/* A2 */}
        <ListGroupItem className="d-flex align-items-start border-start border-success border-4">
          <BsGripVertical className="me-2 fs-3 mt-1" />
          <FaFileLines className="me-3 fs-4 text-success mt-2" />

          <div className="flex-fill">
            <div className="fw-bold">
              <Link
                href={`/courses/${cid}/assignments/A2`}
                className="text-decoration-none text-dark"
              >
                A2
              </Link>
            </div>

            <div className="small text-danger">Multiple Modules</div>

            <div className="text-muted small">
              Not available until May 13 at 12:00am | Due May 20 at 11:59pm |
              100 pts
            </div>
          </div>

          <div className="d-flex align-items-center gap-3">
            <GreenCheckmark />
            <FaEllipsisV className="mt-2" />
          </div>
        </ListGroupItem>

        {/* A3 */}
        <ListGroupItem className="d-flex align-items-start border-start border-success border-4">
          <BsGripVertical className="me-2 fs-3 mt-1" />
          <FaFileLines className="me-3 fs-4 text-success mt-2" />

          <div className="flex-fill">
            <div className="fw-bold">
              <Link
                href={`/courses/${cid}/assignments/A3`}
                className="text-decoration-none text-dark"
              >
                A3
              </Link>
            </div>

            <div className="small text-danger">Multiple Modules</div>

            <div className="text-muted small">
              Not available until May 20 at 12:00am | Due May 27 at 11:59pm |
              100 pts
            </div>
          </div>

          <div className="d-flex align-items-center gap-3">
            <GreenCheckmark />
            <FaEllipsisV className="mt-2" />
          </div>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
