"use client";

import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { BsGripVertical } from "react-icons/bs";

import { RootState } from "../../../store";
import { setModules, editModule } from "./reducer";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import * as client from "../../../courses/client";

type Lesson = {
  _id: string;
  name: string;
};

type Module = {
  _id: string;
  name: string;
  course: string;
  editing?: boolean;
  lessons?: Lesson[];
};

export default function Modules() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { modules } = useSelector((state: RootState) => state.modulesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const [moduleName, setModuleName] = useState("");
  const isFaculty = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const fetchModules = async () => {
    const data = await client.findModulesForCourse(cid as string);
    dispatch(setModules(data));
  };

  useEffect(() => {
    fetchModules();
  }, [cid]);

  const handleAddModule = async () => {
    await client.createModuleForCourse(cid as string, { name: moduleName, course: cid });
    setModuleName("");
    fetchModules();
  };

  const handleDeleteModule = async (moduleId: string) => {
    await client.deleteModule(cid as string, moduleId);
    fetchModules();
  };

  const handleUpdateModule = async (module: Module) => {
    await client.updateModule(cid as string, { ...module, _id: module._id });
    fetchModules();
  };

  return (
    <div>
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        isFaculty={isFaculty}
        addModule={handleAddModule}
      />
      <br />
      <br />
      <br />

      <ListGroup className="rounded-0" id="wd-modules">
        {(modules as Module[]).map((module) => (
          <ListGroupItem
            key={module._id}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" />
              {!module.editing && module.name}
              {module.editing && (
                <FormControl
                  className="w-50 d-inline-block"
                  defaultValue={module.name}
                  onChange={(e) => {
                    const updated = { ...module, name: e.target.value };
                    dispatch(setModules(
                      (modules as Module[]).map((m) => m._id === module._id ? updated : m)
                    ));
                  }}
                  onKeyDown={async (e: React.KeyboardEvent) => {
                    if (e.key === "Enter") {
                      await handleUpdateModule({ ...module, editing: false });
                    }
                  }}
                />
              )}
              <ModuleControlButtons
                moduleId={module._id}
                isFaculty={isFaculty}
                deleteModule={handleDeleteModule}
                editModule={(moduleId) => dispatch(editModule(moduleId))}
              />
            </div>

            {module.lessons && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: Lesson) => (
                  <ListGroupItem
                    key={lesson._id}
                    className="wd-lesson p-3 ps-1"
                  >
                    <BsGripVertical className="me-2 fs-3" />
                    {lesson.name}
                    <LessonControlButtons />
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
