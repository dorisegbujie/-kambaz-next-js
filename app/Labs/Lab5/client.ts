import axios from "axios";
const REMOTE_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export const fetchWelcomeMessage = async () => {
  const { data } = await axios.get(`${REMOTE_SERVER}/lab5/welcome`);
  return data;
};

export const fetchAssignment = async () => {
  const { data } = await axios.get(`${REMOTE_SERVER}/lab5/assignment`);
  return data;
};

export const updateTitle = async (title: string) => {
  const { data } = await axios.get(
    `${REMOTE_SERVER}/lab5/assignment/title/${title}`
  );
  return data;
};

export const fetchTodos = async () => {
  const { data } = await axios.get(`${REMOTE_SERVER}/lab5/todos`);
  return data;
};

export const removeTodo = async (id: number) => {
  const { data } = await axios.get(`${REMOTE_SERVER}/lab5/todos/${id}/delete`);
  return data;
};

export const createTodo = async () => {
  const { data } = await axios.get(`${REMOTE_SERVER}/lab5/todos/create`);
  return data;
};

export const postTodo = async (todo: object) => {
  const { data } = await axios.post(`${REMOTE_SERVER}/lab5/todos`, todo);
  return data;
};

export const deleteTodo = async (id: number) => {
  const { data } = await axios.delete(`${REMOTE_SERVER}/lab5/todos/${id}`);
  return data;
};

export const updateTodo = async (todo: { id: number; [key: string]: unknown }) => {
  const { data } = await axios.put(
    `${REMOTE_SERVER}/lab5/todos/${todo.id}`,
    todo
  );
  return data;
};
