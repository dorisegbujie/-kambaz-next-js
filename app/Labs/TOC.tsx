"use client";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function TOC() {
 const pathname = usePathname();
 return (
   <Nav variant="pills">
     <NavItem>
       <NavLink href="/Labs" as={Link} className={`nav-link ${pathname.endsWith("Labs") ? "active" : ""}`}>
         Labs </NavLink> </NavItem>
     <NavItem>
       <NavLink href="/Labs/Lab1" as={Link} className={`nav-link ${pathname.endsWith("Lab1") ? "active" : ""}`}>
         Lab 1 </NavLink> </NavItem>
     <NavItem>
       <NavLink href="/Labs/Lab2" as={Link} className={`nav-link ${pathname.endsWith("Lab2") ? "active" : ""}`}>
         Lab 2 </NavLink> </NavItem>
     <NavItem>
       <NavLink href="/Labs/Lab3" as={Link} className={`nav-link ${pathname.endsWith("Lab3") ? "active" : ""}`}>
         Lab 3 </NavLink> </NavItem>
     <NavItem>
       <NavLink href="/" as={Link}>
         Kambaz </NavLink> </NavItem>
       <Nav.Item>
        <Nav.Link as={Link} href="/Labs/Lab4" id="wd-lab4-link">
          Lab 4
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} href="/Labs/Lab5" id="wd-lab5-link">
          Lab 5
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="https://github.com/dorisegbujie/kambaz-node-server-app.git" target="_blank" rel="noreferrer">
          Node Server App GitHub
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="RENDER_URL_PLACEHOLDER" target="_blank" rel="noreferrer" id="wd-server-link">
          Server
        </Nav.Link>
      </Nav.Item>
   </Nav>
 );}