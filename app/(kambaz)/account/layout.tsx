import { ReactNode } from "react";
import AccountNavigation from "./navigation";

export default function AccountLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div id="wd-account" className="d-flex">
      <div className="d-none d-md-block me-4">
        <AccountNavigation />
      </div>
      <div className="flex-fill">{children}</div>
    </div>
  );
}
