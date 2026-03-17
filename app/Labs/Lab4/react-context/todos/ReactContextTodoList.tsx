"use client";

import { Button, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { useTodos } from "./todosContext";

export default function ReactContextTodoList() {
  const ctx = useTodos()!;
  const { todos, todo, setTodo, addTodo, deleteTodo, updateTodo } = ctx;

  return (
    <div id="wd-react-context-todo-list">
      <h2>React Context Todo List</h2>

      <ListGroup>
        <ListGroupItem>
          <Button onClick={addTodo} id="wd-add-todo-click" className="me-2">
            Add
          </Button>

          <Button
            onClick={updateTodo}
            id="wd-update-todo-click"
            className="me-2"
            variant="secondary"
            disabled={!todo.id}
          >
            Update
          </Button>

          <FormControl
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
            className="mt-2"
          />
        </ListGroupItem>

        {todos.map((t) => (
          <ListGroupItem key={t.id} className="d-flex align-items-center">
            <Button
              onClick={() => deleteTodo(t.id)}
              id="wd-delete-todo-click"
              variant="danger"
              className="me-2"
            >
              Delete
            </Button>

            <Button
              onClick={() => setTodo(t)}
              id="wd-set-todo-click"
              variant="warning"
              className="me-2"
            >
              Edit
            </Button>

            {t.title}
          </ListGroupItem>
        ))}
      </ListGroup>

      <hr />
    </div>
  );
}