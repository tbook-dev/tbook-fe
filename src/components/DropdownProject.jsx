import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Transition from "../utils/Transition";
import { useSelector } from "react-redux";
import { emptyProjectPrompt } from "@/utils/const";
import clsx from "clsx";
import Selected from "./icon/Selected";
import { useDispatch } from "react-redux";
import { setCurrentProjectId } from "@/store/user";

import defaultProjectAvatar from "../images/user-avatar-80.png";

function DropdownProfile({ align }) {
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state.user);
  const currentProjectId = userStore.currentProjectId;
  const userProjects = userStore.projects || [];
  const currentProject =
    userProjects?.find((project) => project.projectId === currentProjectId) ||
    {};
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const hanldeChangeProject = function (project) {
    if (currentProjectId === project.projectId) return;
    dispatch(setCurrentProjectId(project.projectId));
  };

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex items-center justify-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <img
          className="w-8 h-8 rounded-full"
          src={defaultProjectAvatar}
          width="32"
          height="32"
          alt="User"
        />
        <div className="flex items-center truncate">
          <span className="ml-2 text-sm font-medium truncate group-hover:text-slate-800">
            {currentProject?.projectName || emptyProjectPrompt}
          </span>
          <svg
            className="w-3 h-3 ml-1 fill-current shrink-0 text-slate-400"
            viewBox="0 0 12 12"
          >
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className={`origin-top-right z-10 absolute top-full min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1 ${
          align === "right" ? "right-0" : "left-0"
        }`}
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="text-center">
            {Array.isArray(userProjects) && userProjects.length > 0 ? (
              userProjects.map((project) => {
                const isSelected = project.projectId === currentProjectId;
                return (
                  <div
                    key={project.projectId}
                    onClick={() => hanldeChangeProject(project)}
                    className={clsx(
                      "flex items-center justify-between px-3 py-2 text-sm border-b-[1px]",
                      isSelected
                        ? "text-indigo-500"
                        : "blueGray-600 cursor-pointer"
                    )}
                  >
                    <div className="flex items-center">
                      <img
                        src={defaultProjectAvatar}
                        className="mr-2 rounded-full w-7 h-7"
                      />
                      {project.projectName}
                    </div>
                    {isSelected && <Selected />}
                  </div>
                );
              })
            ) : (
              <div>加入一个项目</div>
            )}
          </div>
          <ul className="text-center">
            <li>
              <Link
                className="flex items-center justify-center px-3 py-1 text-sm font-medium text-indigo-500 hover:text-indigo-600"
                to="/new-project"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                New Project
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default DropdownProfile;
