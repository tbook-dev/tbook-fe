import { Typography } from "antd";
const { Text } = Typography;

export default function ({ suffixCount = 4, children = '', ...props }) {
  const start = children.slice(0, children.length - suffixCount).trim();
  const suffix = children.slice(-suffixCount).trim();

  return (
    <Text
      ellipsis={{
        suffix,
      }}
      {...props}
    >
      {start}
    </Text>
  );
}
