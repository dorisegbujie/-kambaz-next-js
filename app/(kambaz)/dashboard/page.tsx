"use client";

import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addNewCourse, deleteCourse, updateCourse, Course } from "../courses/reducer";
import { enroll, unenroll } from "../enrollments/reducer";

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

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);
  const dispatch = useDispatch();

  const [showAllCourses, setShowAllCourses] = useState(false);
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

  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const isEnrolled = (courseId: string) =>
    enrollments.some(
      (e) => e.user === currentUser?._id && e.course === courseId
    );

  const displayedCourses = showAllCourses
    ? courses
    : courses.filter((c) => isEnrolled(c._id));

  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        <Button
          className="float-end btn btn-primary"
          id="wd-course-enrollments-btn"
          onClick={() => setShowAllCourses((prev) => !prev)}
        >
          Enrollments
        </Button>
      </h1>
      <hr />

      {isFaculty && (
        <>
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
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({displayedCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((c: Course) => (
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
                  <Link
                    href={`/courses/${c._id}/home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <CardTitle
                      className="wd-dashboard-course-title overflow-hidden"
                      style={{
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {c.number} {c.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {c.description}
                    </CardText>
                  </Link>

                  <div className="d-flex flex-wrap gap-2 mt-2">
                    <Link
                      href={`/courses/${c._id}/home`}
                      className="text-decoration-none"
                    >
                      <Button variant="primary">Go</Button>
                    </Link>

                    {isFaculty && (
                      <>
                        <Button
                          id="wd-edit-course-click"
                          className="btn btn-warning"
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
                      </>
                    )}

                    {!isFaculty &&
                      (isEnrolled(c._id) ? (
                        <Button
                          variant="danger"
                          id="wd-unenroll-btn"
                          onClick={() =>
                            dispatch(
                              unenroll({
                                user: currentUser!._id,
                                course: c._id,
                              })
                            )
                          }
                        >
                          Unenroll
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          id="wd-enroll-btn"
                          onClick={() =>
                            dispatch(
                              enroll({
                                user: currentUser!._id,
                                course: c._id,
                              })
                            )
                          }
                        >
                          Enroll
                        </Button>
                      ))}
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
