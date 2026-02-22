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
import * as db from "../../../database";

type Assignment = {
  _id: string;
  title: string;
  course: string;
  available?: string;
  due?: string;
  points?: number;
  description?: string;
};

export default function Assignments({
  params,
}: {
  params: Promise<{ cid: string }>;
}) {
  const { cid } = use(params);

  const assignments = (db.assignments as Assignment[]).filter(
    (a) => a.course === cid
  );

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

        {/* assignment rows */}
        {assignments.map((a) => (
          <ListGroupItem
            key={`${a.course}-${a._id}`}
            className="d-flex align-items-start border-start border-success border-4"
          >
            <BsGripVertical className="me-2 fs-3 mt-1" />
            <FaFileLines className="me-3 fs-4 text-success mt-2" />

            <div className="flex-fill">
              <div className="fw-bold">
                <Link
                  href={`/courses/${cid}/assignments/${a._id}`}
                  className="text-decoration-none text-dark"
                >
                  {a.title}
                </Link>
              </div>

              <div className="small text-danger">Multiple Modules</div>

              <div className="text-muted small">
                Not available until {a.available ?? "TBD"} | Due {a.due ?? "TBD"} |{" "}
                {a.points ?? 100} pts
              </div>
            </div>

            <div className="d-flex align-items-center gap-3">
              <GreenCheckmark />
              <FaEllipsisV className="mt-2" />
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}