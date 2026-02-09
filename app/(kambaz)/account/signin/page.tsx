import Link from "next/link";
import FormControl from "react-bootstrap/FormControl";

export default function Signin() {
  return (
    <div
      id="wd-signin-screen"
      className="mt-3"
      style={{ maxWidth: 320 }}
    >
      <h1>Signin</h1>

      <FormControl
        id="wd-username"
        placeholder="username"
        className="mb-2"
      />

      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
      />

      <Link
        id="wd-signin-btn"
        href="/account/profile"
        className="btn btn-primary w-100 mb-2"
      >
        Signin
      </Link>

      <Link id="wd-signup-link" href="/account/signup">
        Signup
      </Link>
    </div>
  );
}
