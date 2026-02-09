"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
  const pathname = usePathname();

  const linkClass = (href: string) => {
    const active = pathname === href;
    return `list-group-item border-0 ${active ? "active" : "text-danger"}`;
  };

  return (
    <div
      id="wd-account-navigation"
      className="list-group wd fs-5 rounded-0"
      style={{ width: 200 }}
    >
      <Link
        href="/account/signin"
        id="wd-account-signin-link"
        className={linkClass("/account/signin")}
      >
        Signin
      </Link>
      <Link
        href="/account/signup"
        id="wd-account-signup-link"
        className={linkClass("/account/signup")}
      >
        Signup
      </Link>
      <Link
        href="/account/profile"
        id="wd-account-profile-link"
        className={linkClass("/account/profile")}
      >
        Profile
      </Link>
    </div>
  );
}
