import { Link } from "react-router-dom";
import logo from "@/images/icon/logo.svg";

export default function Logo({ className }) {
  return (
    <Link to="/" className={className}>
      <img src={logo} className="w-full h-full" />
    </Link>
  );
}
