"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { FormControl, Button } from "react-bootstrap";
import { setCurrentUser } from "../reducer";
import * as client from "../client";

export default function Signin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const router = useRouter();

  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      dispatch(setCurrentUser(user));
      router.push("/dashboard");
    } catch {
      alert("Invalid username or password");
    }
  };

  return (
    <div id="wd-signin-screen" className="mt-3" style={{ maxWidth: 320 }}>
      <h1>Signin</h1>
      <FormControl
        id="wd-username"
        placeholder="username"
        className="mb-2"
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
      />
      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <Button id="wd-signin-btn" className="w-100 mb-2" onClick={signin}>
        Signin
      </Button>
      <Link id="wd-signup-link" href="/account/signup">
        Signup
      </Link>
    </div>
  );
}
