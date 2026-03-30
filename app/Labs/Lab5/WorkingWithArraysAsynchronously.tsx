"use client";
import { useEffect, useState } from "react";
import { FaTrash, FaPencil } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import {
  fetchTodos,
  removeTodo,
  createTodo,
  postTodo,
  deleteTodo,
  updateTodo,
} from "./client";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  description?: string;
};

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const fetchTodosHandler = async () => {
    const data = await fetchTodos();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodosHandler();
  }, []);

  const removeTodoHandler = async (id: number) => {
    const updatedTodos = await removeTodo(id);
    setTodos(updatedTodos);
  };

  const createTodoHandler = async () => {
    const updatedTodos = await createTodo();
    setTodos(updatedTodos);
  };

  const postTodoHandler = async () => {
    const newTodo = await postTodo({ title: newTodoTitle, completed: false });
    setTodos([...todos, newTodo]);
    setNewTodoTitle("");
  };

  const deleteTodoHandler = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((t) => t.id !== id));
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      setErrorMessage(axiosError?.response?.data?.message || "Error deleting todo");
    }
  };

  const updateTodoHandler = async () => {
    if (!editingTodo) return;
    try {
      await updateTodo(editingTodo);
      setTodos(todos.map((t) => (t.id === editingTodo.id ? editingTodo : t)));
      setEditingTodo(null);
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      setErrorMessage(axiosError?.response?.data?.message || "Error updating todo");
    }
  };

  return (
    <div id="wd-working-with-arrays-async">
      <h2>Working With Arrays Asynchronously</h2>
      {errorMessage && (
        <div id="wd-todo-error-message" className="alert alert-danger">
          <TiDelete className="me-2" />
          {errorMessage}
          <button
            className="btn-close float-end"
            onClick={() => setErrorMessage(null)}
          />
        </div>
      )}

      <div className="d-flex mb-2">
        <input
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          className="form-control me-2"
          placeholder="New Todo Title"
        />
        <button id="wd-post-todo" onClick={postTodoHandler} className="btn btn-primary me-2">
          <FaPlusCircle /> POST Todo
        </button>
        <button id="wd-create-todo" onClick={createTodoHandler} className="btn btn-success">
          <FaPlusCircle /> GET Create Todo
        </button>
      </div>

      <ul className="list-group mb-3">
        {todos.map((todo) => (
          <li key={todo.id} className="list-group-item d-flex align-items-center">
            <input
              type="checkbox"
              className="form-check-input me-2"
              checked={todo.completed}
              onChange={async () => {
                const updated = { ...todo, completed: !todo.completed };
                await updateTodo(updated);
                setTodos(todos.map((t) => (t.id === todo.id ? updated : t)));
              }}
            />
            {editingTodo?.id === todo.id ? (
              <input
                value={editingTodo.title}
                onChange={(e) =>
                  setEditingTodo({ ...editingTodo, title: e.target.value })
                }
                className="form-control me-2"
              />
            ) : (
              <span className={`me-auto ${todo.completed ? "text-decoration-line-through" : ""}`}>
                {todo.title}
              </span>
            )}
            {editingTodo?.id === todo.id ? (
              <button onClick={updateTodoHandler} className="btn btn-success btn-sm me-2">
                Save
              </button>
            ) : (
              <FaPencil
                id="wd-edit-todo"
                className="me-3 text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => setEditingTodo(todo)}
              />
            )}
            <FaTrash
              id="wd-remove-todo"
              className="text-danger me-2"
              style={{ cursor: "pointer" }}
              onClick={() => removeTodoHandler(todo.id)}
            />
            <TiDelete
              id="wd-delete-todo"
              className="text-warning fs-4"
              style={{ cursor: "pointer" }}
              onClick={() => deleteTodoHandler(todo.id)}
            />
          </li>
        ))}
      </ul>
      <hr />
    </div>
  );
}
