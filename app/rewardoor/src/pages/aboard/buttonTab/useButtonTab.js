import { useState } from "react";

export default function useButtonTab(list) {
  const buttonList = list.map((v) => ({ name: v.name, value: v.value }));
  const [selected, uodateSelected] = useState(buttonList?.[0].value);
  const filteredList = list.find((v) => v.value === selected)?.list ?? [];
  return {
    buttonList,
    selected,
    uodateSelected,
    filteredList,
  };
}
