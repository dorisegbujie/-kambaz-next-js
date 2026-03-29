"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { Button, FormControl, FormSelect } from "react-bootstrap";
import { setCurrentUser, User } from "../reducer";
import { RootState } from "../../store";

export default function Profile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  // Initialize profile from currentUser; no setState inside effect
  const [profile, setProfile] = useState<User | null>(currentUser);

  // Only redirect in the effect — no setState here
  useEffect(() => {
    if (!currentUser) {
      router.push("/account/signin");
    }
  }, [currentUser, router]);

  const signout = () => {
    dispatch(setCurrentUser(null));
    router.push("/account/signin");
  };

  return (
    <div id="wd-profile-screen" className="mt-3" style={{ maxWidth: 320 }}>
      <h3>Profile</h3>
      {profile && (
        <div>
          <FormControl
            id="wd-username"
            className="mb-2"
            defaultValue={profile.username}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          />
          <FormControl
            id="wd-password"
            className="mb-2"
            defaultValue={profile.password ?? ""}
            onChange={(e) =>
              setProfile({ ...profile, password: e.target.value })
            }
          />
          <FormControl
            id="wd-firstname"
            className="mb-2"
            defaultValue={profile.firstName ?? ""}
            onChange={(e) =>
              setProfile({ ...profile, firstName: e.target.value })
            }
          />
          <FormControl
            id="wd-lastname"
            className="mb-2"
            defaultValue={profile.lastName ?? ""}
            onChange={(e) =>
              setProfile({ ...profile, lastName: e.target.value })
            }
          />
          <FormControl
            id="wd-dob"
            className="mb-2"
            type="date"
            defaultValue={profile.dob ?? ""}
            onChange={(e) =>
              setProfile({ ...profile, dob: e.target.value })
            }
          />
          <FormControl
            id="wd-email"
            className="mb-2"
            defaultValue={profile.email ?? ""}
            onChange={(e) =>
              setProfile({ ...profile, email: e.target.value })
            }
          />
          <FormSelect
            id="wd-role"
            className="mb-3"
            defaultValue={profile.role}
            onChange={(e) =>
              setProfile({
                ...profile,
                role: e.target.value as User["role"],
              })
            }
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </FormSelect>
          <Button
            onClick={signout}
            className="w-100 mb-2"
            id="wd-signout-btn"
            variant="danger"
          >
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}
