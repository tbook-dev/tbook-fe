import { ConfigProvider, theme } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
import darkToken from "./dark";
import { useSelector } from "react-redux";
import components from "./conf";

export default function ({ children }) {
  const userTheme = useSelector((state) => state.user.theme);
  // console.log(userTheme);
  return (
    <ConfigProvider
      // renderEmpty={Empty}
      theme={{
        algorithm:
          userTheme === "dark" ?  theme.defaultAlgorithm: theme.darkAlgorithm,
        components,
        token: userTheme === "dark" ? darkToken : {},
      }}
    >
      <StyleProvider hashPriority="high">{children}</StyleProvider>
    </ConfigProvider>
  );
}
