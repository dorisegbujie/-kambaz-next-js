import { ListGroup } from "react-bootstrap";
import TodoItem from "./TodoItem";
import todos from "./todos.json";

export default function TodoList() {
  return (
    <>
      <h3>Todo List</h3>
      <ListGroup>
        {todos.map((todo: unknown) => {
  const t = todo as { title: string; status: string; done: boolean };
  return <TodoItem key={t.title} todo={t} />;
})}
      </ListGroup>
      <hr />
    </>
  );
}