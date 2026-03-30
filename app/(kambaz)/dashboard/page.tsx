"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setCourses, Course } from "../courses/reducer";
import * as client from "../courses/client";

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
  const dispatch = useDispatch();

  const [showAllCourses, setShowAllCourses] = useState(false);
  const [enrolledIds, setEnrolledIds] = useState<Set<string>>(new Set());
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

  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const fetchCourses = async () => {
    if (isFaculty || showAllCourses) {
      const all = await client.fetchAllCourses();
      dispatch(setCourses(all));
    } else {
      const mine = await client.findMyCourses();
      dispatch(setCourses(mine));
    }
  };

  const fetchEnrolled = async () => {
    if (!isFaculty) {
      const mine = await client.findMyCourses();
      setEnrolledIds(new Set(mine.map((c: Course) => c._id)));
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchEnrolled();
  }, [currentUser, showAllCourses]);

  const isEnrolled = (courseId: string) => enrolledIds.has(courseId);

  const addCourse = async () => {
    const created = await client.createCourse(course);
    dispatch(setCourses([...courses, created]));
  };

  const removeCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c) => c._id !== courseId)));
  };

  const saveCourse = async () => {
    await client.updateCourse(course);
    dispatch(setCourses(courses.map((c) => (c._id === course._id ? course : c))));
  };

  const handleEnroll = async (courseId: string) => {
    if (!currentUser) return;
    await client.enrollUserInCourse(currentUser._id, courseId);
    setEnrolledIds((prev) => new Set([...prev, courseId]));
    if (!showAllCourses) {
      const mine = await client.findMyCourses();
      dispatch(setCourses(mine));
    }
  };

  const handleUnenroll = async (courseId: string) => {
    if (!currentUser) return;
    await client.unenrollUserFromCourse(currentUser._id, courseId);
    setEnrolledIds((prev) => {
      const next = new Set(prev);
      next.delete(courseId);
      return next;
    });
    if (!showAllCourses) {
      const mine = await client.findMyCourses();
      dispatch(setCourses(mine));
    }
  };

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
              onClick={saveCourse}
            >
              Update
            </Button>
            <Button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addCourse}
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
        </>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
      </h2>
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
                  <Link
                    href={`/courses/${c._id}/home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <CardTitle
                      className="wd-dashboard-course-title overflow-hidden"
                      style={{ whiteSpace: "nowrap", textOverflow: "ellipsis" }}
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
                    <Link href={`/courses/${c._id}/home`} className="text-decoration-none">
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
                            removeCourse(c._id);
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
                          onClick={() => handleUnenroll(c._id)}
                        >
                          Unenroll
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          id="wd-enroll-btn"
                          onClick={() => handleEnroll(c._id)}
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
