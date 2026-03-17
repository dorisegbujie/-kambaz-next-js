"use client";

import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { todos } = useSelector((state: RootState) => state.todosReducer);

  return (
    <div id="wd-todo-list-redux">
      <h2>Todo List</h2>

      <ListGroup>
        <TodoForm />
        {todos.map((t) => (
          <TodoItem key={t.id} todo={t} />
        ))}
      </ListGroup>

      <hr />
    </div>
  );
}