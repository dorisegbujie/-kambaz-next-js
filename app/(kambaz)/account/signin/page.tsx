"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { FormControl, Button } from "react-bootstrap";
import { setCurrentUser, User } from "../reducer";
import * as db from "../../database";

type Credentials = { username: string; password: string };

export default function Signin() {
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();

  const signin = () => {
    const user = (db.users as User[]).find(
      (u) =>
        u.username === credentials.username &&
        u.password === credentials.password
    );
    if (!user) return;
    dispatch(setCurrentUser(user));
    router.push("/dashboard");
  };

  return (
    <div id="wd-signin-screen" className="mt-3" style={{ maxWidth: 320 }}>
      <h1>Signin</h1>

      <FormControl
        id="wd-username"
        placeholder="username"
        className="mb-2"
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />

      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
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
