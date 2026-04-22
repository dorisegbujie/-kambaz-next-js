"use client";

import { ReactNode, useEffect, useState } from "react";
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
  const [showNav, setShowNav] = useState(true);

  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser, sessionLoading } = useSelector((state: RootState) => state.accountReducer);

  const course = courses.find((c) => c._id === cid);

  useEffect(() => {
    if (sessionLoading) return;
    if (!currentUser) {
      router.push("/account/signin");
    }
  }, [cid, currentUser, sessionLoading, router]);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          onClick={() => setShowNav((prev) => !prev)}
          style={{ cursor: "pointer" }}
        />
        {course?.name || `Course ${cid}`}
      </h2>
      <hr />

      <div className="d-flex">
        {showNav && (
          <div>
            <CourseNavigation />
          </div>
        )}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}