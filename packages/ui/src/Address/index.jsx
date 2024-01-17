import { Tooltip, Typography } from "antd";
import { CopyOutlined, CheckOutlined } from "@ant-design/icons";
import { shortAddress } from "@tbook/utils/lib/conf";

const { Paragraph } = Typography;

export default function Address({
  address,
  placement = "top",
  className = "",
}) {
  return (
    <Paragraph
      copyable={{
        text: address,
        icon: [
          <CopyOutlined style={{ color: "#717374" }} />,
          <CheckOutlined style={{ color: "#717374" }} />,
        ],
      }}
      style={{ margin: 0 }}
    >
      <Tooltip title={address} placement={placement}>
        <span className={className}>{shortAddress(address)}</span>
      </Tooltip>
    </Paragraph>
  );
}
