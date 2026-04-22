"use client";

import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import * as client from "../../../courses/client";
import PeopleDetails from "./Details";

type User = {
  _id: string;
  firstName?: string;
  lastName?: string;
  loginId?: string;
  section?: string;
  role?: string;
  lastActivity?: string;
  totalActivity?: string;
  [key: string]: unknown;
};

export default function PeopleTable() {
  const { cid } = useParams();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const loadUsers = async () => {
    const enrolled = await client.findUsersForCourse(cid as string);
    setUsers(enrolled);
  };

  useEffect(() => {
    loadUsers();
  }, [cid]);

  return (
    <div id="wd-people-table">
      <PeopleDetails
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        reloadUsers={loadUsers}
      />
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              onClick={() => setSelectedUser(user)}
              style={{ cursor: "pointer" }}
            >
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{user.firstName}</span>{" "}
                <span className="wd-last-name">{user.lastName}</span>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
