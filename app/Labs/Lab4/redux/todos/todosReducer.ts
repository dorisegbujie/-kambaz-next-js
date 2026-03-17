import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Todo = { id: string; title: string };
type TodoDraft = { id?: string; title: string };

const initialState = {
  todos: [
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ] as Todo[],
  todo: { title: "Learn Mongo" } as TodoDraft,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
  addTodo: (state, action: PayloadAction<TodoDraft>) => {
  state.todos = [
    ...state.todos,
    { ...action.payload, id: new Date().getTime().toString() },
  ];
  state.todo = { title: "" };
},

updateTodo: (state, action: PayloadAction<Todo>) => {
  state.todos = state.todos.map((item) =>
    item.id === action.payload.id ? action.payload : item
  );
  state.todo = { title: "" };
},

setTodo: (state, action: PayloadAction<TodoDraft>) => {
  state.todo = action.payload;
},

    deleteTodo: (state, action: PayloadAction<string>) => {
      const newTodos = state.todos.filter((todo) => todo.id !== action.payload);
      state.todos = newTodos;
    },

  },
});

export const { addTodo, deleteTodo, updateTodo, setTodo } = todosSlice.actions;
export default todosSlice.reducer;