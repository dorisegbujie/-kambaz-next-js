import Link from "next/link";
export default function labs() {
 return (
   <div id="wd-labs">
     <p id="wd-full-name">Doris Egbujie</p>
     <p>
        <a
          id="wd-github"
          href="https://github.com/dorisegbujie/-kambaz-next-js"
          target="_blank"
        >
          GitHub Repository
        </a>
      </p>
     <h1>Labs</h1>
     <ul>
       <li>
         <Link href="/Labs/Lab1" id="wd-lab1-link">
           Lab 1: HTML Examples </Link>
       </li>
       <li>
         <Link href="/Labs/Lab2" id="wd-lab2-link">
           Lab 2: CSS Basics </Link>
       </li>
       <li>
         <Link href="/Labs/Lab3" id="wd-lab3-link">
           Lab 3: JavaScript Fundamentals </Link>
       </li>
       <li>
         <Link href="/Labs/Lab4" id="wd-lab4-link">
           Lab 4: Maintaining State in React Applications </Link>
       </li>
     </ul>
   </div>
);}
