import Link from "next/link";
import FormControl from "react-bootstrap/FormControl";
import FormSelect from "react-bootstrap/FormSelect";

export default function Profile() {
  return (
    <div
      id="wd-profile-screen"
      className="mt-3"
      style={{ maxWidth: 320 }}
    >
      <h1>Profile</h1>

      <FormControl id="wd-profile-username" defaultValue="alice" className="mb-2" />
      <FormControl
        id="wd-profile-password"
        type="password"
        defaultValue="123"
        className="mb-2"
      />
      <FormControl id="wd-profile-firstname" defaultValue="Alice" className="mb-2" />
      <FormControl id="wd-profile-lastname" defaultValue="Wonderland" className="mb-2" />

      <FormControl
        id="wd-profile-dob"
        type="date"
        className="mb-2"
        defaultValue="2000-01-01"
      />

      <FormControl
        id="wd-profile-email"
        type="email"
        defaultValue="alice@wonderland.com"
        className="mb-2"
      />

      <FormSelect id="wd-profile-role" className="mb-3" defaultValue="USER">
        <option value="USER">User</option>
        <option value="STUDENT">Student</option>
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Admin</option>
      </FormSelect>

      <Link
        id="wd-signout-btn"
        href="/account/signin"
        className="btn btn-danger w-100"
      >
        Signout
      </Link>
    </div>
  );
}
