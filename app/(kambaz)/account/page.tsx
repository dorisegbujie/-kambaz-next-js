"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "../store";

export default function AccountPage() {
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/account/signin");
    } else {
      router.push("/account/profile");
    }
  }, [currentUser, router]);

  return null;
}
