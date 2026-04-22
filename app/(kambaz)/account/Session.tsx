"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser, setSessionLoaded } from "./reducer";
import * as client from "./client";

export default function Session({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      const user = await client.profile();
      dispatch(setCurrentUser(user));
    } catch {
      // not logged in — that's fine
    } finally {
      dispatch(setSessionLoaded());
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return <>{children}</>;
}
