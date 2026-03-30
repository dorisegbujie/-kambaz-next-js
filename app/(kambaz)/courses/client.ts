import axios from "axios";

const REMOTE_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

const axiosWithCredentials = axios.create({ withCredentials: true });

export const fetchAllCourses = async () => {
  const { data } = await axiosWithCredentials.get(`${REMOTE_SERVER}/api/courses`);
  return data;
};

export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(
    `${REMOTE_SERVER}/api/users/current/courses`
  );
  return data;
};

export const createCourse = async (course: object) => {
  const { data } = await axiosWithCredentials.post(
    `${REMOTE_SERVER}/api/users/current/courses`,
    course
  );
  return data;
};

export const deleteCourse = async (courseId: string) => {
  await axiosWithCredentials.delete(`${REMOTE_SERVER}/api/courses/${courseId}`);
};

export const updateCourse = async (course: { _id: string; [key: string]: unknown }) => {
  await axiosWithCredentials.put(
    `${REMOTE_SERVER}/api/courses/${course._id}`,
    course
  );
};

export const enrollUserInCourse = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.post(
    `${REMOTE_SERVER}/api/users/${userId}/courses/${courseId}`
  );
  return data;
};

export const unenrollUserFromCourse = async (userId: string, courseId: string) => {
  await axiosWithCredentials.delete(
    `${REMOTE_SERVER}/api/users/${userId}/courses/${courseId}`
  );
};

export const findModulesForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${REMOTE_SERVER}/api/courses/${courseId}/modules`
  );
  return data;
};

export const createModuleForCourse = async (courseId: string, module: object) => {
  const { data } = await axiosWithCredentials.post(
    `${REMOTE_SERVER}/api/courses/${courseId}/modules`,
    module
  );
  return data;
};

export const deleteModule = async (moduleId: string) => {
  await axiosWithCredentials.delete(`${REMOTE_SERVER}/api/modules/${moduleId}`);
};

export const updateModule = async (module: { _id: string; [key: string]: unknown }) => {
  await axiosWithCredentials.put(
    `${REMOTE_SERVER}/api/modules/${module._id}`,
    module
  );
};
