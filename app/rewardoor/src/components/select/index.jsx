import { Select } from "antd";
import { useState } from "react";

export default function ({ dropdownRender, children, ...props }) {
  const [selectOpen, setSelectOpen] = useState(false);

  return (
    <Select
      {...props}
      open={selectOpen}
      dropdownRender={dropdownRender(setSelectOpen)}
      onDropdownVisibleChange={(visible) => setSelectOpen(visible)}
    />
  );
}
