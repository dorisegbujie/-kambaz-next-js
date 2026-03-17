"use client";

import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  addNewCourse,
  deleteCourse,
  updateCourse,
  // setCourses, // (imported in the book example, but you may not need it yet)
} from "../courses/reducer";

import {
  Row,
  Col,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Button,
  FormControl,
} from "react-bootstrap";

type Course = {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department?: string;
  credits?: number;
  description: string;
  image?: string;
};

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const dispatch = useDispatch();

  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    department: "D000",
    credits: 4,
    description: "New Description",
    image: "/images/reactjs.jpg",
  });

  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      <h5>
        New Course
        <Button
          className="btn btn-success float-end ms-2"
          id="wd-update-course-click"
          onClick={() => dispatch(updateCourse(course))}
        >
          Update
        </Button>

        <Button
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={() => dispatch(addNewCourse(course))}
        >
          Add
        </Button>
      </h5>

      <br />

      <FormControl
        value={course.name}
        className="mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <FormControl
        as="textarea"
        rows={3}
        value={course.description}
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />

      <hr />

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((c: Course) => (
            <Col
              key={c._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <CardImg
                  variant="top"
                  src={c.image || "/images/reactjs.jpg"}
                  width="100%"
                  height={160}
                />

                <CardBody>
                  <div className="d-flex align-items-start">
                    <div className="flex-fill">
                      <Link
                        href={`/courses/${c._id}/home`}
                        className="wd-dashboard-course-link text-decoration-none text-dark"
                      >
                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                          {c.number} {c.name}
                        </CardTitle>

                        <CardText
                          className="wd-dashboard-course-description overflow-hidden"
                          style={{ height: "100px" }}
                        >
                          {c.description}
                        </CardText>
                      </Link>
                    </div>

                    <Button
                      id="wd-edit-course-click"
                      className="btn btn-warning me-2"
                      size="sm"
                      onClick={(event) => {
                        event.preventDefault();
                        setCourse(c);
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      id="wd-delete-course-click"
                      className="btn btn-danger"
                      size="sm"
                      onClick={(event) => {
                        event.preventDefault();
                        dispatch(deleteCourse(c._id));
                      }}
                    >
                      Delete
                    </Button>
                  </div>

                  <Link
                    href={`/courses/${c._id}/home`}
                    className="text-decoration-none"
                  >
                    <Button variant="primary" className="mt-2">
                      Go
                    </Button>
                  </Link>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}