import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
 return (
  <div id="wd-dashboard">
   <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
   <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
   <div id="wd-dashboard-courses">
    <div className="wd-dashboard-course">
     <Link href="/courses/1234" className="wd-dashboard-course-link">
      <Image src="/images/reactjs.jpg" width={200} height={150} alt="reactjs" />
      <div>
       <h5> CS1234 React JS </h5>
       <p className="wd-dashboard-course-title">
        Full Stack software developer
       </p>
       <button> Go </button>
      </div>
     </Link>
    </div>
<div className="wd-dashboard-course">
          <Link href="/courses/2345" className="wd-dashboard-course-link">
            <Image
              src="/images/course2.jpg"
              width={200}
              height={150}
              alt="course"
            />
            <div>
              <h5>CS2345 Web Dev</h5>
              <p className="wd-dashboard-course-title">HTML, CSS, JS basics</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        
        <div className="wd-dashboard-course">
          <Link href="/courses/3456" className="wd-dashboard-course-link">
            <Image
              src="/images/course3.jpg"
              width={200}
              height={150}
              alt="course"
            />
            <div>
              <h5>CS3456 Databases</h5>
              <p className="wd-dashboard-course-title">SQL + schema design</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

    
        <div className="wd-dashboard-course">
          <Link href="/courses/4567" className="wd-dashboard-course-link">
            <Image
              src="/images/course4.jpg"
              width={200}
              height={150}
              alt="course"
            />
            <div>
              <h5>CS4567 Algorithms</h5>
              <p className="wd-dashboard-course-title">Problem solving</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        
        <div className="wd-dashboard-course">
          <Link href="/courses/5678" className="wd-dashboard-course-link">
            <Image
              src="/images/course5.jpg"
              width={200}
              height={150}
              alt="course"
            />
            <div>
              <h5>CS5678 Systems</h5>
              <p className="wd-dashboard-course-title">OS + networking intro</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        
        <div className="wd-dashboard-course">
          <Link href="/courses/6789" className="wd-dashboard-course-link">
            <Image
              src="/images/course6.jpg"
              width={200}
              height={150}
              alt="course"
            />
            <div>
              <h5>DS6789 Data Science</h5>
              <p className="wd-dashboard-course-title">Python + analysis</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        
        <div className="wd-dashboard-course">
          <Link href="/courses/7890" className="wd-dashboard-course-link">
            <Image
              src="/images/course7.jpg"
              width={200}
              height={150}
              alt="course"
            />
            <div>
              <h5>UX7890 Product Design</h5>
              <p className="wd-dashboard-course-title">Research + prototyping</p>
              <button>Go</button>
            </div>
          </Link>
        </div>
   </div>
  </div>
);}
