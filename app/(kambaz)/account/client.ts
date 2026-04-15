import axios from "axios";

const REMOTE_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

const axiosWithCredentials = axios.create({ withCredentials: true });

export const signin = async (credentials: { username: string; password: string }) => {
  const { data } = await axiosWithCredentials.post(
    `${REMOTE_SERVER}/api/users/signin`,
    credentials
  );
  return data;
};

export const signup = async (user: object) => {
  const { data } = await axiosWithCredentials.post(
    `${REMOTE_SERVER}/api/users/signup`,
    user
  );
  return data;
};

export const signout = async () => {
  await axiosWithCredentials.post(`${REMOTE_SERVER}/api/users/signout`);
};

export const profile = async () => {
  const { data } = await axiosWithCredentials.get(
    `${REMOTE_SERVER}/api/users/profile`
  );
  return data;
};

export const updateUser = async (user: { _id: string; [key: string]: unknown }) => {
  const { data } = await axiosWithCredentials.put(
    `${REMOTE_SERVER}/api/users/${user._id}`,
    user
  );
  return data;
};

export const findAllUsers = async () => {
  const { data } = await axiosWithCredentials.get(`${REMOTE_SERVER}/api/users`);
  return data;
};

export const findUsersByRole = async (role: string) => {
  const { data } = await axiosWithCredentials.get(
    `${REMOTE_SERVER}/api/users?role=${role}`
  );
  return data;
};

export const findUsersByPartialName = async (name: string) => {
  const { data } = await axiosWithCredentials.get(
    `${REMOTE_SERVER}/api/users?name=${name}`
  );
  return data;
};

export const findUserById = async (userId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${REMOTE_SERVER}/api/users/${userId}`
  );
  return data;
};

export const createUser = async (user: object) => {
  const { data } = await axiosWithCredentials.post(
    `${REMOTE_SERVER}/api/users`,
    user
  );
  return data;
};

export const deleteUser = async (userId: string) => {
  await axiosWithCredentials.delete(`${REMOTE_SERVER}/api/users/${userId}`);
};
