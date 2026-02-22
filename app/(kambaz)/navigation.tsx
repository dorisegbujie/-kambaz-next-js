"use client";

import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function KambazNavigation() {
  const pathname = usePathname();

  const links = [
    { label: "Dashboard", path: "/dashboard", icon: AiOutlineDashboard },
    { label: "Courses", path: "/courses", icon: LiaBookSolid },
    { label: "Calendar", path: "/calendar", icon: IoCalendarOutline },
    { label: "Inbox", path: "/inbox", icon: FaInbox },
    { label: "Labs", path: "/Labs", icon: LiaCogSolid },
  ];

  const accountActive = pathname === "/account" || pathname.startsWith("/account/");

  return (
    <ListGroup
      id="wd-kambaz-navigation"
      style={{ width: 120 }}
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      <ListGroupItem
        id="wd-neu-link"
        target="_blank"
        href="https://www.northeastern.edu/"
        action
        className="bg-black border-0 text-center"
      >
        <img src="/images/NEU.png" width="75px" />
      </ListGroupItem>

      <ListGroupItem
        as={Link}
        href="/account"
        className={`text-center border-0 ${
          accountActive ? "bg-white text-danger" : "bg-black text-white"
        }`}
      >
        <FaRegCircleUser className={`fs-1 ${accountActive ? "text-danger" : "text-white"}`} />
        <br />
        Account
      </ListGroupItem>

      {links.map((link) => {
        const active = pathname === link.path || pathname.startsWith(link.path + "/");

        return (
          <ListGroupItem
            key={link.label}
            as={Link}
            href={link.path}
            className={`bg-black text-center border-0 ${
              active ? "text-danger bg-white" : "text-white bg-black"
            }`}
          >
            {link.icon({ className: `fs-1 ${active ? "text-danger" : "text-white"}` })}
            <br />
            {link.label}
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}