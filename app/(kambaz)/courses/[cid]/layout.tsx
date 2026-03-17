"use client";

import { ReactNode, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { useSelector } from "react-redux";
import { RootState } from "../../store";

import CourseNavigation from "./navigation";
import { FaAlignJustify } from "react-icons/fa";

export default function CoursesLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { cid } = useParams() as { cid: string };
  const router = useRouter();

  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);

  const course = courses.find((c) => c._id === cid);

  useEffect(() => {
    if (!currentUser) {
      router.push("/account/signin");
      return;
    }
    const enrolled = enrollments.some(
      (e) => e.user === currentUser._id && e.course === cid
    );
    if (!enrolled) router.push("/dashboard");
  }, [cid, currentUser, enrollments, router]);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course?.name || `Course ${cid}`}
      </h2>
      <hr />

      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}