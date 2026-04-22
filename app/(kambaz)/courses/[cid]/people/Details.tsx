"use client";

import { useState } from "react";
import { Row, Col, FormControl } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { FaPencil, FaCheck, FaX } from "react-icons/fa6";
import * as client from "../../../account/client";

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

export default function PeopleDetails({
  selectedUser,
  setSelectedUser,
  reloadUsers,
}: {
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
  reloadUsers: () => void;
}) {
  const [editing, setEditing] = useState(false);

  if (!selectedUser) return null;

  const handleDelete = async () => {
    await client.deleteUser(selectedUser._id);
    setSelectedUser(null);
    reloadUsers();
  };

  const handleUpdate = async () => {
    await client.updateUser(selectedUser);
    setEditing(false);
    reloadUsers();
  };

  return (
    <div id="wd-people-details" className="p-3 border mb-3">
      <Row>
        <Col className="d-flex align-items-center">
          <FaUserCircle className="me-2 text-secondary" style={{ fontSize: 60 }} />
          {editing ? (
            <div className="d-flex gap-2 flex-wrap">
              <FormControl
                className="wd-edit-first-name"
                value={selectedUser.firstName || ""}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, firstName: e.target.value })
                }
                placeholder="First Name"
              />
              <FormControl
                className="wd-edit-last-name"
                value={selectedUser.lastName || ""}
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, lastName: e.target.value })
                }
                placeholder="Last Name"
              />
            </div>
          ) : (
            <span className="fs-4 fw-bold">
              {selectedUser.firstName} {selectedUser.lastName}
            </span>
          )}
        </Col>
        <Col className="d-flex justify-content-end gap-2 align-items-center">
          {editing ? (
            <FaCheck
              id="wd-people-details-save"
              className="text-success fs-4"
              style={{ cursor: "pointer" }}
              onClick={handleUpdate}
            />
          ) : (
            <FaPencil
              id="wd-people-details-edit"
              className="text-primary fs-4"
              style={{ cursor: "pointer" }}
              onClick={() => setEditing(true)}
            />
          )}
          <FaX
            id="wd-people-details-close"
            className="text-danger fs-5"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedUser(null);
              setEditing(false);
            }}
          />
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <table className="table table-borderless">
            <tbody>
              <tr>
                <td><b>Role</b></td>
                <td>
                  {editing ? (
                    <FormControl
                      as="select"
                      value={selectedUser.role || "USER"}
                      onChange={(e) =>
                        setSelectedUser({ ...selectedUser, role: e.target.value })
                      }
                    >
                      <option>USER</option>
                      <option>STUDENT</option>
                      <option>FACULTY</option>
                      <option>ADMIN</option>
                    </FormControl>
                  ) : (
                    selectedUser.role
                  )}
                </td>
              </tr>
              <tr>
                <td><b>Login ID</b></td>
                <td>{selectedUser.loginId}</td>
              </tr>
              <tr>
                <td><b>Section</b></td>
                <td>{selectedUser.section}</td>
              </tr>
              <tr>
                <td><b>Last Activity</b></td>
                <td>{selectedUser.lastActivity}</td>
              </tr>
              <tr>
                <td><b>Total Activity</b></td>
                <td>{selectedUser.totalActivity}</td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row>

      <Row>
        <Col className="d-flex gap-2">
          <button
            id="wd-people-details-delete"
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setSelectedUser(null);
              setEditing(false);
            }}
          >
            Cancel
          </button>
        </Col>
      </Row>
    </div>
  );
}
