"use client";

import { Button, FormControl, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { addTodo, setTodo, updateTodo } from "./todosReducer";

export default function TodoForm() {
  const { todo } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch();

  const canUpdate = Boolean(todo.id);

  return (
    <ListGroupItem>
      <Button
        onClick={() => dispatch(addTodo(todo))}
        id="wd-add-todo-click"
        className="me-2"
      >
        Add
      </Button>

      <Button
        onClick={() => {
          if (todo.id) {
            dispatch(updateTodo({ id: todo.id, title: todo.title }));
          }
        }}
        id="wd-update-todo-click"
        className="me-2"
        variant="secondary"
        disabled={!canUpdate}
      >
        Update
      </Button>

      <FormControl
        value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
        className="mt-2"
      />
    </ListGroupItem>
  );
}