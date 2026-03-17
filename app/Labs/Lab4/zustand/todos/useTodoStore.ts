import { create } from "zustand";

type Todo = { id: string; title: string };
type TodoDraft = { id?: string; title: string };

type TodoState = {
  todos: Todo[];
  todo: TodoDraft;
  setTodo: (todo: TodoDraft) => void;
  addTodo: () => void;
  deleteTodo: (id: string) => void;
  updateTodo: () => void;
};

export const useTodoStore = create<TodoState>((set, get) => ({
  todos: [
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ],
  todo: { title: "Learn Mongo" },

  setTodo: (todo) => set({ todo }),

  addTodo: () => {
    const { todos, todo } = get();
    const newTodo: Todo = { id: Date.now().toString(), title: todo.title };
    set({ todos: [...todos, newTodo], todo: { title: "" } });
  },

  deleteTodo: (id) => {
    const { todos } = get();
    set({ todos: todos.filter((t) => t.id !== id) });
  },

  updateTodo: () => {
    const { todos, todo } = get();
    if (!todo.id) return; // only update after selecting Edit

    const updated: Todo = { id: todo.id, title: todo.title };
    set({
      todos: todos.map((t) => (t.id === todo.id ? updated : t)),
      todo: { title: "" },
    });
  },
}));