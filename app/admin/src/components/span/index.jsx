import { theme } from "antd";

const { useToken } = theme;

export default function (props) {
  const { token } = useToken();

  return <span style={{ color: token.colorIconHover }} {...props} />;
}
