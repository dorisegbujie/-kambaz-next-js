import Link from "next/link";
export default function TOC() {
 return (
   <ul>
     <li>
       <Link href="/labs" id="wd-home-link">
         Home </Link>
     </li>
     <li>
       <Link href="/labs/lab1" id="wd-lab1-link">
         Lab 1 </Link>
     </li>
     <li>
       <Link href="/labs/lab2" id="wd-lab2-link">
         Lab 2 </Link>
     </li>
     <li>
       <Link href="/labs/lab3" id="wd-lab3-link">
         Lab 3 </Link>
     </li>
     <li>
       <Link href="/" id="wd-kambaz-link">
         Kambaz </Link> </li>
         <li>
        <a
          id="wd-github"
          href="https://github.com/dorisegbujie/-kambaz-next-js"
          target="_blank"
          rel="noreferrer"
        >
          GitHub Repository
        </a>
      </li>
   </ul>
   
);}
