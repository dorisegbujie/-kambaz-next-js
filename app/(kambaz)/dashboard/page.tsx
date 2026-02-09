import Link from "next/link";
import Image from "next/image";
import { Row, Col, Card, CardBody, CardImg, CardTitle, CardText, Button } from "react-bootstrap";

export default function Dashboard() {
   const courses = [
    {
      number: "CS1234 React JS",
      desc: "Full Stack software developer",
      img: "/images/reactjs.jpg",
    },
    {
      number: "CS2345 Web Dev",
      desc: "HTML, CSS, JS basics",
      img: "/images/course2.jpg",
    },
    {
      number: "CS3456 Databases",
      desc: "SQL + schema design",
      img: "/images/course3.jpg",
    },
    {
      number: "CS4567 Algorithms",
      desc: "Problem solving",
      img: "/images/course4.jpg",
    },
    {
      number: "CS5678 Systems",
      desc: "OS + networking intro",
      img: "/images/course5.jpg",
    },
    {
      number: "DS6789 Data Science",
      desc: "Python + analysis",
      img: "/images/course6.jpg",
    },
    {
      number: "UX7890 Product Design",
      desc: "Research + prototyping",
      img: "/images/course7.jpg",
    },
  ];

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course, idx) => (
            <Col key={idx} className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                {/* lab wants course links to go to course HOME for now */}
                <Link
                  href="/courses/1234/home"
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg variant="top" src={course.img} width="100%" height={160} />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.number}
                    </CardTitle>

                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.desc}
                    </CardText>

                    <Button variant="primary">Go</Button>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
);}
