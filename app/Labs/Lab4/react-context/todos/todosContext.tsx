"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Todo = { id: string; title: string };
type TodoDraft = { id?: string; title: string };

type TodosContextState = {
  todos: Todo[];
  todo: TodoDraft;
  setTodo: (todo: TodoDraft) => void;
  addTodo: () => void;
  deleteTodo: (id: string) => void;
  updateTodo: () => void;
};

const TodosContext = createContext<TodosContextState | undefined>(undefined);

export function TodosProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ]);

  const [todo, setTodo] = useState<TodoDraft>({ title: "Learn Mongo" });

  const addTodo = () => {
    const newTodo: Todo = { id: Date.now().toString(), title: todo.title };
    setTodos([...todos, newTodo]);
    setTodo({ title: "" });
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const updateTodo = () => {
    if (!todo.id) return; // only update after you click Edit
    setTodos(todos.map((t) => (t.id === todo.id ? { id: todo.id, title: todo.title } : t)));
    setTodo({ title: "" });
  };

  const value: TodosContextState = {
    todos,
    todo,
    setTodo,
    addTodo,
    deleteTodo,
    updateTodo,
  };

  return <TodosContext.Provider value={value}>{children}</TodosContext.Provider>;
}

export function useTodos() {
  return useContext(TodosContext);
}