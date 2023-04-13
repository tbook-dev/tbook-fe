// dark 模式下表单情况，紧紧包裹表单
import { Pagination } from "antd";
import ThemeProvider from "@/theme/ThemeProvider";

// 可能revise
export default function ({ ...props }) {
  return (
    <ThemeProvider>
      <Pagination {...props} />
    </ThemeProvider>
  );
}
