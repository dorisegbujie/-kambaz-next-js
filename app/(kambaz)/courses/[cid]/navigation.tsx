"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function CourseNavigation() {
  const { cid } = useParams();
  const pathname = usePathname();

  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const path =
          link === "Home"
            ? `/courses/${cid}/home`
            : link === "People"
            ? `/courses/${cid}/people/table`
            : `/courses/${cid}/${link.toLowerCase()}`;

        const active = pathname === path;

        const id =
          link === "Home"
            ? "wd-course-home-link"
            : link === "Modules"
            ? "wd-course-modules-link"
            : link === "Piazza"
            ? "wd-course-piazza-link"
            : link === "Zoom"
            ? "wd-course-zoom-link"
            : link === "Assignments"
            ? "wd-course-assignments-link"
            : link === "Quizzes"
            ? "wd-course-quizzes-link"
            : link === "Grades"
            ? "wd-course-grades-link"
            : "wd-course-people-link";

        return (
          <Link
            key={link}
            href={path}
            id={id}
            className={`list-group-item border-0 ${
              active ? "active" : "text-danger"
            }`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}