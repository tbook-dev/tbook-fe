import { Select } from "antd";
import ThemeProvider from "@/theme/ThemeProvider";

export default function ({ ...props }) {
  return (
    <ThemeProvider>
      <Select {...props} />
    </ThemeProvider>
  );
}
