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

export const deleteModule = async (courseId: string, moduleId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${REMOTE_SERVER}/api/courses/${courseId}/modules/${moduleId}`
  );
  return data;
};

export const updateModule = async (courseId: string, module: { _id: string; [key: string]: unknown }) => {
  const { data } = await axiosWithCredentials.put(
    `${REMOTE_SERVER}/api/courses/${courseId}/modules/${module._id}`,
    module
  );
  return data;
};

export const findUsersForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${REMOTE_SERVER}/api/courses/${courseId}/users`
  );
  return data;
};

export const findAssignmentsForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${REMOTE_SERVER}/api/courses/${courseId}/assignments`
  );
  return data;
};

export const createAssignment = async (courseId: string, assignment: object) => {
  const { data } = await axiosWithCredentials.post(
    `${REMOTE_SERVER}/api/courses/${courseId}/assignments`,
    assignment
  );
  return data;
};

export const findAssignmentById = async (assignmentId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${REMOTE_SERVER}/api/assignments/${assignmentId}`
  );
  return data;
};

export const updateAssignment = async (assignment: { _id: string; [key: string]: unknown }) => {
  await axiosWithCredentials.put(
    `${REMOTE_SERVER}/api/assignments/${assignment._id}`,
    assignment
  );
};

export const deleteAssignment = async (assignmentId: string) => {
  await axiosWithCredentials.delete(
    `${REMOTE_SERVER}/api/assignments/${assignmentId}`
  );
};
