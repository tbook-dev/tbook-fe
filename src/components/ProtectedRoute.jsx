import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const authUser = useSelector((state) => state.user.authUser);

  if (!authUser) {
    navigate("/logins");
    return null;
  }

  return children;
};

export default ProtectedRoute;
