import { Link } from "react-router-dom";
import backIcon from "@/images/icon/h5-back.svg";

// 56+12=68px
export default function ({ link = "/" }) {
  return (
    <Link to={link} className="fixed left-4 top-[68px] z-10">
      <button>
        <img src={backIcon} className="w-7 h-7"/>
      </button>
    </Link>
  );
}
