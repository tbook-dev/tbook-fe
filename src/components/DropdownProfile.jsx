import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Transition from "../utils/Transition";
import { useSelector } from "react-redux";
import Eth from "./local/Eth";
import { Typography } from "antd";

const { Text } = Typography;

function DropdownProfile({ align }) {
  const userStore = useSelector((state) => state.user.user);
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
          src={userStore?.avatar}
          width="32"
          height="32"
          alt="User"
        />
        <div className="flex items-center truncate">
          <span className="ml-2 text-sm font-medium truncate group-hover:text-slate-800">
            {userStore?.name}
          </span>
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
          <div className="flex flex-col items-center pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200">
            <div className="flex items-center justify-center w-[50px] h-[50px] mb-3	border rounded-full border-[#6366F1]">
              <img
                width="30"
                height="30"
                className=""
                src={userStore?.avatar}
              />
            </div>
            <div className="text-center">
              <p className="text-base font-semibold ">{userStore?.name}</p>
              <Text
                ellipsis={{ tooltip: userStore?.email }}
                style={{
                  width: 170,
                  fontSize: 12,
                  marginBottom: 5,
                  color: "#94A3B8",
                }}
              >
                {userStore?.email}
              </Text>
              <Eth
                style={{
                  width: 115,
                  fontSize: 14,
                  marginBottom: 10,
                  color: "#94A3B8",
                }}
              >
                {userStore?.mainWallet}
              </Eth>
            </div>
          </div>
          <ul>
            <li>
              <Link
                className="flex items-center px-3 py-1 text-sm font-medium text-indigo-500 hover:text-indigo-600"
                to="/settings"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                MY GRANTS
              </Link>
            </li>
            {/* <li>
              <Link
                className="flex items-center px-3 py-1 text-sm font-medium text-indigo-500 hover:text-indigo-600"
                to="/signin"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Sign Out
              </Link>
            </li> */}
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default DropdownProfile;
