import Link from "next/link";
import FormControl from "react-bootstrap/FormControl";

export default function Signup() {
  return (
    <div
      id="wd-signup-screen"
      className="mt-3"
      style={{ maxWidth: 320 }}
    >
      <h1>Signup</h1>

      <FormControl
        id="wd-signup-username"
        placeholder="username"
        className="mb-2"
      />

      <FormControl
        id="wd-signup-password"
        placeholder="password"
        type="password"
        className="mb-2"
      />

      <Link
        id="wd-signup-btn"
        href="/account/profile"
        className="btn btn-primary w-100 mb-2"
      >
        Signup
      </Link>

      <Link id="wd-signin-link" href="/account/signin">
        Signin
      </Link>
    </div>
  );
}
