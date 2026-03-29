"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountNavigation() {
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const pathname = usePathname();
  const links = currentUser ? ["profile"] : ["signin", "signup"];

  const linkClass = (href: string) => {
    const active = pathname === `/account/${href}`;
    return `list-group-item border-0 ${active ? "active" : "text-danger"}`;
  };

  return (
    <div
      id="wd-account-navigation"
      className="list-group wd fs-5 rounded-0"
      style={{ width: 200 }}
    >
      {links.map((link) => (
        <Link
          key={link}
          href={`/account/${link}`}
          id={`wd-account-${link}-link`}
          className={linkClass(link)}
        >
          {link.charAt(0).toUpperCase() + link.slice(1)}
        </Link>
      ))}
    </div>
  );
}
