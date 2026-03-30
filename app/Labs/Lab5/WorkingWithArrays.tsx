"use client";
import { useState } from "react";
import { FormControl } from "react-bootstrap";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function WorkingWithArrays() {
  const [todo, setTodo] = useState({
    id: "1",
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });
  return (
    <div id="wd-working-with-arrays">
      <h2>Working With Arrays</h2>
      <a href={`${HTTP_SERVER}/lab5/todos`} target="_blank">
        Get Todos
      </a>
      <br />
      <a href={`${HTTP_SERVER}/lab5/todos?completed=true`} target="_blank">
        Get Completed Todos
      </a>
      <br />
      <hr />
      <FormControl
        className="mb-2"
        id="wd-todo-id"
        defaultValue={todo.id}
        onChange={(e) => setTodo({ ...todo, id: e.target.value })}
      />
      <a
        id="wd-retrieve-todo-by-id"
        className="btn btn-primary me-2"
        href={`${HTTP_SERVER}/lab5/todos/${todo.id}`}
        target="_blank"
      >
        Get Todo by ID
      </a>
      <a
        id="wd-remove-todo"
        className="btn btn-primary me-2"
        href={`${HTTP_SERVER}/lab5/todos/${todo.id}/delete`}
        target="_blank"
      >
        Remove Todo with ID = {todo.id}
      </a>
      <hr />
      <a
        id="wd-create-todo"
        className="btn btn-primary me-2"
        href={`${HTTP_SERVER}/lab5/todos/create`}
        target="_blank"
      >
        Create Todo
      </a>
      <hr />
      <FormControl
        className="mb-2"
        id="wd-todo-title"
        defaultValue={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <a
        id="wd-update-todo-title"
        className="btn btn-primary me-2"
        href={`${HTTP_SERVER}/lab5/todos/${todo.id}/title/${todo.title}`}
        target="_blank"
      >
        Update Title for Todo with ID = {todo.id}
      </a>
      <hr />
      <a
        id="wd-update-todo-completed"
        className="btn btn-primary me-2"
        href={`${HTTP_SERVER}/lab5/todos/${todo.id}/completed/true`}
        target="_blank"
      >
        Update Completed for Todo ID = {todo.id}
      </a>
      <hr />
      <a
        id="wd-update-todo-description"
        className="btn btn-primary me-2"
        href={`${HTTP_SERVER}/lab5/todos/${todo.id}/description/New Description`}
        target="_blank"
      >
        Update Description for Todo ID = {todo.id}
      </a>
      <hr />
    </div>
  );
}
