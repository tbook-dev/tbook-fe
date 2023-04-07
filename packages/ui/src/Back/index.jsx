import React from "react";
import { Link } from "react-router-dom";
import backIcon from "@tbook/share/images/icon/h5-back.svg";
import back2 from "@tbook/share/images/icon/back2.svg";
import { useSelector } from "react-redux";
import { useTheme } from "@tbook/hooks";

// 56+12=68px
export default function ({ link = "/" }) {
  const userAuth = useSelector((state) => state.user.authUser);
  const theme = useTheme();

  return (
    userAuth && (
      <Link to={link} className="fixed left-4 top-[68px] z-10">
        <button>
          <img src={theme === "dark" ? backIcon : back2} className="w-7 h-7" />
        </button>
      </Link>
    )
  );
}
