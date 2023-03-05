import { Link } from "react-router-dom";
import backIcon from "@tbook/share/images/icon/h5-back.svg";
import { useSelector } from "react-redux";

// 56+12=68px
export default function ({ link = "/" }) {
  const userAuth = useSelector((state) => state.user.authUser);
  
  return (
    userAuth && (
      <Link to={link} className="fixed left-4 top-[68px] z-10">
        <button>
          <img src={backIcon} className="w-7 h-7" />
        </button>
      </Link>
    )
  );
}
