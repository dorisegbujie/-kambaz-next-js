"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { FormControl, Button } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import * as client from "../client";

export default function Signup() {
  const [user, setUser] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const router = useRouter();

  const signup = async () => {
    try {
      const newUser = await client.signup(user);
      dispatch(setCurrentUser(newUser));
      router.push("/account/profile");
    } catch {
      alert("Username already taken");
    }
  };

  return (
    <div id="wd-signup-screen" className="mt-3" style={{ maxWidth: 320 }}>
      <h1>Signup</h1>
      <FormControl
        id="wd-signup-username"
        placeholder="username"
        className="mb-2"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <FormControl
        id="wd-signup-password"
        placeholder="password"
        type="password"
        className="mb-2"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <Button id="wd-signup-btn" className="w-100 mb-2" onClick={signup}>
        Signup
      </Button>
      <Link id="wd-signin-link" href="/account/signin">
        Signin
      </Link>
    </div>
  );
}
