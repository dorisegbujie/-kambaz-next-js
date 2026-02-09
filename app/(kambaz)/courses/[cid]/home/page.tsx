import Modules from "../modules/page";
import CourseStatus from "./status";

export default function Home() {
  return (
    <div id="wd-home" className="d-flex">
      <div className="flex-fill me-3">
        <Modules />
      </div>

      {/* Course Status hides on smaller screens */}
      <div className="d-none d-xl-block">
        <CourseStatus />
      </div>
    </div>
  );
}
