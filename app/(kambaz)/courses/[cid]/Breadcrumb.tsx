"use client";

import { usePathname } from "next/navigation";

type Course = {
  name: string;
};

export default function Breadcrumb({ course }: { course: Course | undefined }) {
  const pathname = usePathname();
  const last = pathname.split("/").pop();

  const section = last ? last.charAt(0).toUpperCase() + last.slice(1) : "";

  return (
    <span>
      {course?.name} &gt; {section}
    </span>
  );
}