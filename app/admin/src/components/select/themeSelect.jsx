import { Select, ConfigProvider, theme } from "antd";
import { useTheme } from "@tbook/hooks";
import components from "@/theme/conf";

export default function ({ ...props }) {
  const userTheme = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm: userTheme === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
        // theme.defaultAlgorithm,
        components,
        token: {
          colorPrimary: userTheme === "dark" ? "#fff" : "#69D0E5",
        },
      }}
    >
      <Select {...props} />
    </ConfigProvider>
  );
}
