import { Statistic } from "antd";

export default function ({ value, style = {}, ...props }) {
  return (
    <Statistic
      value={value}
      valueStyle={{
        margin: 0,
        ...style,
      }}
      {...props}
    />
  );
}
