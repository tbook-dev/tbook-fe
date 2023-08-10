import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function useLoginRedirect(target = "/") {
  const authUser = useSelector((state) => state.user.authUser);
  const navigate = useNavigate();
  if (!authUser) {
    navigate(target);
  }
}
