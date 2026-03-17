"use client";

import { Button, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { useTodoStore } from "./useTodoStore";

export default function ZustandTodoList() {
  const todos = useTodoStore((state) => state.todos);
  const todo = useTodoStore((state) => state.todo);
  const setTodo = useTodoStore((state) => state.setTodo);
  const addTodo = useTodoStore((state) => state.addTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);

  return (
    <div id="wd-zustand-todo-list">
      <h2>Zustand Todo List</h2>

      <ListGroup>
        <ListGroupItem>
          <Button onClick={addTodo} className="me-2" id="wd-add-todo-click">
            Add
          </Button>

          <Button
            onClick={updateTodo}
            variant="secondary"
            className="me-2"
            id="wd-update-todo-click"
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
              variant="danger"
              className="me-2"
              id="wd-delete-todo-click"
            >
              Delete
            </Button>

            <Button
              onClick={() => setTodo(t)}
              variant="warning"
              className="me-2"
              id="wd-set-todo-click"
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