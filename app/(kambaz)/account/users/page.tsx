"use client";

import { useEffect, useState } from "react";
import { FaUserCircle, FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import * as client from "../client";
import PeopleDetails from "../../courses/[cid]/people/Details";

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: string;
  loginId?: string;
  section?: string;
  lastActivity?: string;
  totalActivity?: string;
  [key: string]: unknown;
};

export default function UsersScreen() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [users, setUsers] = useState<User[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<Partial<User>>({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "USER",
  });

  const loadUsers = async () => {
    if (role) {
      setUsers(await client.findUsersByRole(role));
    } else if (name) {
      setUsers(await client.findUsersByPartialName(name));
    } else {
      setUsers(await client.findAllUsers());
    }
  };

  useEffect(() => {
    loadUsers();
  }, [role]);

  const handleSearch = async () => {
    await loadUsers();
  };

  const handleCreateUser = async () => {
    const created = await client.createUser(newUser);
    setUsers([...users, created]);
    setNewUser({ username: "", password: "", firstName: "", lastName: "", role: "USER" });
  };

  const handleDeleteUser = async (userId: string) => {
    await client.deleteUser(userId);
    setUsers(users.filter((u) => u._id !== userId));
  };

  if (!currentUser || currentUser.role !== "ADMIN") {
    return <div className="p-3">Access denied. Admin only.</div>;
  }

  return (
    <div id="wd-users-screen" className="p-3">
      <h2>Users</h2>

      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <PeopleDetails
        selectedUser={selectedUser as any}
        setSelectedUser={setSelectedUser as any}
        reloadUsers={loadUsers}
      />

      <div className="d-flex gap-2 mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          className="form-select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ maxWidth: 160 }}
        >
          <option value="">All Roles</option>
          <option value="USER">USER</option>
          <option value="STUDENT">STUDENT</option>
          <option value="FACULTY">FACULTY</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="d-flex gap-2 mb-3 border p-3">
        <input
          type="text"
          className="form-control"
          placeholder="First Name"
          value={newUser.firstName || ""}
          onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Last Name"
          value={newUser.lastName || ""}
          onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          value={newUser.username || ""}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
        />
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={newUser.password || ""}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <select
          className="form-select"
          value={newUser.role || "USER"}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          style={{ maxWidth: 130 }}
        >
          <option value="USER">USER</option>
          <option value="STUDENT">STUDENT</option>
          <option value="FACULTY">FACULTY</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <button
          id="wd-add-new-user-btn"
          className="btn btn-success text-nowrap"
          onClick={handleCreateUser}
        >
          <FaPlus className="me-1" />
          Add User
        </button>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Username</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              onClick={() => setSelectedUser(user)}
              style={{ cursor: "pointer" }}
            >
              <td>
                <FaUserCircle className="text-secondary fs-3" />
              </td>
              <td>
                {user.firstName} {user.lastName}
              </td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={(e) => { e.stopPropagation(); handleDeleteUser(user._id); }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
